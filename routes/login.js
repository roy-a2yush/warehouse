//node modules
const express = require('express')

//files
const Login = require('../managers/login')
const isAuth = require('../helpers/isAuth')

//cconfigure
const router = express.Router()

router.get('/', (req, res) => {
    if (req.session.isAuth) {
        res.render("dashboard.ejs", {page: 'Dashboard', organisationName: `${req.session.organisationName}`, firstName: `${req.session.firstName}`})
    } else {
        res.render('login.ejs', {page: 'Login'})
    }
})

// @route create login  POST /
router.post('/', Login.login)

router.get('/register', isAuth(), (req, res) => {
    res.render('register.ejs', {page: 'Register'})
})

//@route create register  POST /register
router.post('/register', isAuth(), Login.register)

//@route create logout POST /logout
router.get('/logout', Login.logout)
router.post('/logout', Login.logout)

module.exports = router