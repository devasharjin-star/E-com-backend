import crypto from 'crypto'
import User from '../../../models/userModel.js'
import { resetPassMail } from '../../../helper/resetPassMail.js'

export const forgotPassController = async (req, res) => {
  try {
    const email = req.body.email
    console.log(email)

    const user = await User.findOne({ email: email })


    const bytes = crypto.randomBytes(20).toString("hex")
    const resetToken = crypto.createHash('sha256').update(bytes).digest('hex')
    const expiryTime = new Date(Date.now() + 30 * 60 * 1000)
    const resetLink = `${req.protocol}://${req.host}/resetpass/${bytes}`
    user.resetPasswordExpires = expiryTime
    user.resetPasswordToken = resetToken
    await user.save()


    res.status(200).json({ resetLink })

    console.log(resetLink)

    const subject = `reset password confirmation mail`
    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Password Reset</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">
        <table width="500" style="background: #ffffff; padding: 20px; border-radius: 8px;">
          
          <tr>
            <td align="center">
              <h2 style="color: #333;">Reset Your Password</h2>
            </td>
          </tr>

          <tr>
            <td>
              <p style="color: #555;">
                We received a request to reset your password. Click the button below to proceed.
              </p>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding: 20px;">
              <a href="${resetLink}" 
                 style="background-color: #007BFF; color: #ffffff; padding: 12px 20px; 
                        text-decoration: none; border-radius: 5px; display: inline-block;">
                Reset Password
              </a>
            </td>
          </tr>

          <tr>
            <td>
              <p style="color: #777; font-size: 14px;">
                If you did not request a password reset, please ignore this email.
              </p>
            </td>
          </tr>

          <tr>
            <td>
              <p style="color: #999; font-size: 12px;">
                This link will expire shortly for security reasons.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

    resetPassMail({ user: user.email, subject: subject, html: html })

  } catch (e) {
    console.log(e)
    user.resetPasswordExpires = undefined
    user.resetPasswordToken = undefined
    await user.save()
  }


}
