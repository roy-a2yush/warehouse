const md5 = require('md5')

const User = require('../models/User')

//-------------------------------------REGISTER A NEW USER
exports.register = async (req, res, next) => {

    console.log(req.body)
    firstName = req.body.firstName
    lastName = req.body.lastName
    username = req.body.username
    email = req.body.email
    password = req.body.password
    password2 = req.body.password2
    password = md5(password)
    password2 = md5(password2)
    organisationName = req.body.organisationName
    role = req.body.role

    var errors = new Array()

    if (firstName == '') {
        errors.push('First name should not be blank');
    }
    if (username == '') {
        errors.push('Username should not be blank');
    }
    if (email == '') {
        errors.push('Email Id should not be blank');
    }
    if (password == '') {
        errors.push('Password should not be blank');
    }
    if (password2.trim() != password.trim()) {
        errors.push('Passwords not matching')
    }
    if (organisationName == '') {
        errors.push('Organisation Name should not be blank');
    }
    if (role == '') {
        errors.push('role should not be blank');
    }

    if (errors.length > 0) {
        res.status(400).send(JSON.stringify(errors))
    }

    user = {
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: password,
        organisationName: organisationName,
        role: role
    }

    let newUser = new User(user)

    try {
        const a1 = await newUser.save()
        res.status(200).send(a1)
    } catch (err) {
        res.status(400).send(err)
    }

}

//--------------------------------------EXISTING USER LOGIN
exports.login = async (req, res, next) => {
    username = req.body.username
    password = md5(req.body.password)

    console.log(req.body)

    User.find({
        username: username
    }).exec((err, doc) => {
        if (err) {
            res.status(404).send("Not found")
        } else {
            if (doc.length) {
                if (doc.password = password) {
                    doc = doc[0]
                    req.session.isAuth = true
                    req.session.username = doc.username
                    req.session.firstName = doc.firstName
                    req.session.lastName = doc.lastName
                    req.session.email = doc.email
                    req.session.organisationName = doc.organisationName
                    res.status(200).render("dashboard.ejs", {page: 'Dashboard', organisationName: `${doc.organisationName}`})
                } else {
                    res.status(401).send("Password incorrect")
                }
            } else {
                res.status(404).send("Not found")
            }
        }
    })
}

//---------------------------------------LOGOUT
exports.logout = async (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            res.status(400).send("Could not logout")
        } else {
            res.status(200).send("Logged out")
        }
    })
}