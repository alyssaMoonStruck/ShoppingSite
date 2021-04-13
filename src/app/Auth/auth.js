const express = require('express');
const { request } = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')

// Item Model
const User = require('./User');

// Login
router.post('/', (req, res) => {
    const { email, password } = req.body

    //Simple validation
    if( !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' })
    }
    console.log(request.body)
    //Check for exsisting user
    User.findOne({ email })
    .then(user => {
        if(!user) 
            return res.status(400).json({ msg: 'User does not exsist' })
    
            // Validate Password
            bcrypt.compare(password, user.password)
            .then(isMatch => {
                if(!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' })

                jwt.sign(
                    { id: user.id },
                    process.env.JWT_SECRET, 
                    { expiresIn: 3600 },
                    (err, token) => {
                        if(err) throw err
                        res.json({
                            token,
                            user: {
                                id: user.id,
                                name: user.name,
                                email: user.email
                            }
                        })
                })
            })


    })
})

// Register
router.post('/register', (req, res) => {
    const { name, email, password } = req.body

    //Simple validation
    if(!name || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' })
    }

    //Check for exsisting user
    User.findOne({ email })
    .then(user => {
        if(user) 
            return res.status(400).json({ msg: 'User already exsists' })
        
        
        const newUser = new User({
            name, 
            email, 
            password
        })

        //Create salt and hash
        bcrypt.genSalt(10, (_err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err
                newUser.password = hash
                newUser.save()
                    .then(user => {

                        jwt.sign(
                            { id: user.id },
                            process.env.JWT_SECRET,
                            { expiresIn: 3600 },
                            (err, token) => {
                                if(err) throw err
                                res.json({
                                    token,
                                    user: {
                                        id: user.id,
                                        name: user.name,
                                        email: user.email
                                    }
                                })
                        })
                    })
            })
        })
    })
})

// Test 
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user))
})


module.exports = router;