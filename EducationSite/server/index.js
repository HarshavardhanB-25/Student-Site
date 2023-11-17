//required packages
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

//Database models
const studentModel = require('./Models/student')
const teacherModel = require('./Models/teacher')

//Main app
const app = express()

app.use(express.json())

//this returns all the available routes
app.get('/', async(req,res)=>{
    const appRoutes = {
        'student routes' : {
            '/createStudent' : '(post)name,studentid,marks(array),year,dob,department,college',
            '/getAllStudent' : '(get)returns all student data',
            '/getStudentById' : '(post)returns student based on objectID',
            '/updateStudentById' : '(put)pass data to be updated as body',
            '/deleteStudentById' : '(post)deletes the student with matching ID',
            '/getResults' : '(post)pass studentid and dob',
            '/getTopRanks' : '(get)returns top 3 ranked students'
        },
        'teacher routes' : {
            '/createTeacher' : '(post)teacherid,name,password,department,designation',
            '/authTeacher' : '(post)teacherid,password',
            '/getAllTeacher' : '(get)returns all teacher data'
        }
    }
    res.status(200).json(appRoutes)
})


//to create new student data in database
app.post('/createStudent', async(req,res)=>{
    try {
        const data = await studentModel.find({studentid : req.body.studentid})
        if(data.length != 0){
           return res.status(404).json({message: 'Existing student ID'})
        }
        const numbers = req.body.marks
        const sum = numbers.reduce((acc, current) => acc + current, 0);
        req.body.total = sum
        const student = await studentModel.create(req.body)
        res.status(200).json(student)
    } catch (error) {
        res.status(500).json({message: error})
    }
})


//get all student data from the database
app.get('/getAllStudent', async(req,res)=>{
    try {
        const students = await studentModel.find({})
        res.status(200).json(students)
    } catch (error) {
        res.status(500).json({message: error.body})
    }
})


//get students by matching ID
app.post('/getStudentById', async(req,res)=>{
    try {
        const student = await studentModel.find({studentid : req.body.studentid})
        if(student.length == 0){
           return res.status(404).json({message: 'cannot find student with ID'})
        }
        res.status(200).json(student)
    } catch (error) {
        res.status(500).json({message: error.body})
    }
})


//updates student data by matching ID
app.put('/updateStudentById', async(req,res)=>{
    try {
        const student = await studentModel.find({studentid : req.body.studentid})
        if(student.length == 0){
           return res.status(404).json({message: 'cannot find student with ID'})
        }
        if(req.body.marks){
            const numbers = req.body.marks
            const sum = numbers.reduce((acc, current) => acc + current, 0);
            req.body.total = sum
        }
        const updatedStudent = await studentModel.findOneAndUpdate({studentid : req.body.studentid},req.body,{strict : false, returnDocument : "after"})
        res.status(200).json({"Old Data":student,"New Data":updatedStudent})
    } catch (error) {
        res.status(500).json({message: error.body})
    }
})


//verify id and dob and returns marks & total
app.post('/getResult', async(req,res)=>{
    try {
        const student = await studentModel.find({studentid : req.body.studentid})
        if(student.length == 0){
           return res.status(404).json({message: 'cannot find student with ID'})
        }
        const dob = new Date(req.body.dob)
        if(dob.getTime() == student[0].dob.getTime()){
            return res.status(200).json({marks : student[0].marks, total : student[0].total})
        }
        res.status(500).json({message: "Invalid Credentials"})
    } catch (error) {
        res.status(500).json({message: error.body})
    }
})


//delete student by matching ID
app.post('/deleteStudentById', async(req,res)=>{
    try {
        const student = await studentModel.find({studentid : req.body.studentid})
        if(student.length == 0){
            return res.status(404).json({message: 'cannot find student with ID'})
        }
        await studentModel.deleteOne({studentid : req.body.studentid})
        res.status(200).json('deleted successfully')
    } catch (error) {
        res.status(500).json({message: error.body})
    }
})


//returns the top 3 ranks
app.get('/getTopRanks', async(req,res)=>{
    try {
        const student = await studentModel.find().sort({total : -1}).limit(3)
        res.status(200).json(student)
    } catch (error) {
        res.status(500).json({message: error.body})
    }
})


//to create a new teacher in database
app.post('/createTeacher', async(req,res)=>{
    try {
        const data = await teacherModel.find({teacherid : req.body.teacherid})
        if(data.length != 0){
           return res.status(404).json({message: 'Existing teacher ID'})
        }
        const teacher = await teacherModel.create(req.body)
        res.status(200).json(teacher)
    } catch (error) {
        res.status(500).json({message: error})
    }
})


//authenticate teacher using id and password
app.post('/authTeacher', async(req,res)=>{
    try {
        const teacher = await teacherModel.find({teacherid : req.body.teacherid})
        if(teacher.length == 0){
           return res.status(404).json({message: 'cannot find teacher with ID'})
        }
        if(teacher[0].password == req.body.password){
            return res.status(200).json({message : "Valid credentials"})
        }
        res.status(500).json({message: "Invalid Credentials"})
    } catch (error) {
        res.status(500).json({message: error.body})
    }
})


//get all teacher data from the database
app.get('/getAllTeacher', async(req,res)=>{
    try {
        const teachers = await teacherModel.find({})
        res.status(200).json(teachers)
    } catch (error) {
        res.status(500).json({message: error.body})
    }
})


//updates teacher data by matching ID
app.put('/updateTeacherById', async(req,res)=>{
    try {
        const teacher = await teacherModel.find({teacherid : req.body.teacherid})
        if(teacher.length == 0){
           return res.status(404).json({message: 'cannot find teacher with ID'})
        }
        const updatedTeacher = await teacherModel.findOneAndUpdate({teacherid : req.body.teacherid},req.body,{strict : false, returnDocument : "after"})
        res.status(200).json({"Old Data":teacher,"New Data":updatedTeacher})
    } catch (error) {
        res.status(500).json({message: error.body})
    }
})


//mongoDB connection & Main app config
mongoose.set("strictQuery", false)
mongoose.connect(process.env.URL)
.then(()=>{
    console.log("connected to mongoDB")
    app.listen(8080,()=>{
        console.log("App listening at port 8080")
    })
})
.catch((err)=>{
    console.log(err)
})