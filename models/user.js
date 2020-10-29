const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String, 
        required: true, 
        minlength: 1, 
    },
    lastName: {
        type: String, 
        required: true, 
        minlength: 1, 
    }, 
    email: {
        type: String, 
        required: true, 
        minlength: 1, 
        validate : {
            validator: validator.isEmail, 
            message: 'Not valid email'
        }
    }, 
    password: {
        type: String, 
        required: true, 
        minlength: 5
    }, 
    city: {
        type: String, 
        required: true
    }

})

// bcrypt hash password  before saving user 
UserSchema.pre('save', function(next) {
	const user = this; // binds this to User document instance

	// checks to ensure we don't hash password more than once
	if (user.isModified('password')) {
		// generate salt and hash the password
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash
				next()
			})
		})
	} else {
		next()
	}
})

const User = mongoose.model('User', UserSchema)
module.exports = { User }