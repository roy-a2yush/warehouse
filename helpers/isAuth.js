module.exports = () => {
    return (req, res, next) => {
        if (req.session.isAuth) {
            next()
        } else {
            res.status(501).send("Not logged in")
        }
    }
}