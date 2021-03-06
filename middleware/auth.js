const jwt = require('jsonwebtoken')

// Middleware to verify if a user is logged in.
const auth = async (req, res, next) => {
    try {
        // remove token out of header, expect a jwt header
        console.log(req.header("x-auth-token"))
        const token = req.header('x-auth-token')
        console.log(token)
        if(!token) {
            // access denied response
            return res.status(401).json({msg: "No auth token. Authorization Denied."})
        }

        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET)
        if(!verifiedToken) {
            return res.status(401).json({msg: "Token authorization failed."})
        }
        req.user = verifiedToken.id
        console.log(req.user)
        next()
    } catch(err) {
        res.status(500).json({error: err.message})
    }
}

module.exports = auth;