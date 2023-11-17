const mongoose = require('mongoose')

const studentschema = mongoose.Schema({
    "studentid" : 
    {
        type : String,
        unique:true
    },
    "name" : String,
    "dob" : Date,
    "department" : String,
    "year" : Number,
    "marks" : Array,
    "total" : Number,
})

const student = mongoose.model("student",studentschema)

module.exports = student