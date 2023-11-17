const mongoose = require('mongoose')

const teacherschema = mongoose.Schema({
    "teacherid" : 
    {
        type : String,
        unique:true
    },
    "name" : String,
    "password" : String,
    "department" : String,
    "designation" : String
})

const teacher = mongoose.model("teacher",teacherschema)

module.exports = teacher