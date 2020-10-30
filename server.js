const express = require("express");
const cors = require("cors");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const app = express();
const dotenv = require("dotenv").config()
const mongoose = require("./database/mongoose")
const { ObjectID } = require("mongodb");

const { User } = require("./models/user")
const auth = require("./middleware/auth")

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000

app.post('/register', async (req, res) => {
    console.log(req.body)
    try {
        const { firstName, lastName, email, password, city } = req.body;

        // validatation 
        if (!firstName || !lastName || !email || !password || !city) {
            return res.status(400).json({msg: 'Required fields have not been entered.'})
        }
        if (password.length < 5) {
            return res.status(400).json({msg: "Password must be at least 5 characters."})
        }
        const existingUser = await User.findOne({email: email}) // find is a async obj

        if(existingUser) {
            res.status(400).json({msg: "Account with this email already exists."})
        }
        const user = new User({
            firstName,
            lastName, 
            email, 
            password, 
            city
        })
        console.log(user)
        const savedUser = await user.save()
        res.json(user)
    }
    catch(err) {
        console.error(err)
        //internal server error
        return res.status(500).json({error: err.message})
    }
    
})

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body

        if(!email || !password) {
            return res.status(400).json({msg:"Not all fields have been entered."})
        }
        const user = await User.findOne({email: email})
        if(!user) {
            // no given user found
            return res.status(400).json({msg: "No account with this given email has been registered."})
        }
        const isMatched = await bcrypt.compare(password, user.password)
        if(!isMatched) {
            res.status(500).json({msg: "Invalid Cred."})
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
        console.log(token)
        res.json({
            token, 
            user : {
                id: user.id, 
                email: user.email
            }
        })
    }
    catch(err) {

    }
})

app.delete('/delete', auth, async (req, res) => {
    try {
        console.log(req.user)
        const deletedUser = await User.findByIdAndDelete(req.user)
        res.json(deletedUser)
    } catch(err) {
        console.log(err.message)
        res.status(500)

    }
})

app.post('/validToken', async (req, res) => {
    try {
        const token = req.header('x-auth-token')
        if(!token) {
            return res.json(false)
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        if(!verified) {
            res.json(false)
        }

        const user = await User.findById(verified.id)

        if(!user) {
            console.log('Unable to find user')
        }
        res.json({msg:"valid token"})
    }catch(err){
        console.log('Invalid token')
        res.json(false)
    }
})

app.get("/users", auth,  async (req, res) => {
    // able to get user because of auth middleware 
    const user = await User.findById(req.user);
    res.json({
        id: user._id,
        firstName: user.firstName, 
        lastName: user.lastName, 
        email: user.email
    })
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})