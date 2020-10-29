const mongoose = require("mongoose");

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27271/311App'
console.log(mongoURI)
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
console.log('connected')
module.exports = { mongoose }