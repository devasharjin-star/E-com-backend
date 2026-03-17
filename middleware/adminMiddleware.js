export const adminMiddleware = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            res.status(401).json({
                message: `${roles} canot acces the page`
            })
        }
        next()
    }
}