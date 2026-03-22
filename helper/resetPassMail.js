import nodeMailer from 'nodemailer'
export const resetPassMail=async(options)=>{
    const transporter=nodeMailer.createTransport({
        service:process.env.NODE_MAIL_SERVICE,
        auth:{
            user:process.env.NODE_MAIL_EMAIL,
            pass:process.env.NODE_MAIL_PASSWORD
        },

    })

    const mailOptions={
        from:process.env.NODE_MAIL_EMAIL,
        to:options.user,
        subject:options.subject,
        html:options.html
    }

    await transporter.sendMail(mailOptions)
}
