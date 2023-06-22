const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
app.use(cors())
app.use(express.json())
require('./user.js')
require('./data.js')
var question = require('../src/Router/question.js')
const mongoUrl = "mongodb+srv://phamnhatnam0907:ngay09072003@cluster0.iusd2fj.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(mongoUrl,{
    useNewUrlParser: true
}).then(() => {
    console.log("connected to database");
}).catch((e)=>console.log(e)) 

const user = mongoose.model("userInfo");
const data = mongoose.model("dataQuestions");

app.post("/register",async(req,res)=>{
   const {name,email,password}=req.body; 
    try {
        const oldUser = await user.findOne({email})
        if(oldUser){
            console.log(oldUser)
             return res.json("account used")
        }
        await user.create({
            name: name,
            email: email,
            password: password,
            userContent:{
            notifications: [],
            question:[],
            class:[],
            userQuestion: [],
            userClass: [],
            userLibrary: [],
        }
        });
        res.json("tao tai khoan thanh cong")
    } catch (error) {
       res.send({"status":"error"}) 
    }

})
app.post("/login",async(req,res)=>{
    const{email,password}=req.body;
    try {
        const userIn4 = await user.findOne({email})
        if(!userIn4){
              return res.json("user not found")
        }
       const userPassword = await userIn4.password
       if(password===userPassword){
        return res.json({
            status:"success",
            id:userIn4._id,
    })
       }
    } catch (error) {
        res.status(500).json("co loi tu phia server")
    }
})

app.use('/question', question)

app.get('/account/:id',async(req,res)=>{
    const userInfor = await user.findById(req.params.id);    
    try {
        if(userInfor){
            res.json({
                name: userInfor.name,
                email: userInfor.email,
                password: userInfor.password
            })
        }
    } catch (error) {
        res.json(error);
    }
})

app.post("/:id/question/creat",async(req,res)=>{
    const {title, questions}= req.body;
    try {
         const doc= await data.create({
            title: title,
            questions: questions,
        })
        res.json(doc);
    } catch (error) {
        res.json("error")
    }
})
app.post("/:id/question/add",async(req,res)=>{
    try {
            const {data}= req.body;
        await user.findByIdAndUpdate(req.params.id,{
            $push:{
                userQuestion: data,
            }
        })
        res.json("created success")
    } catch (error) {
        res.json("created error")
    }
}) 
app.get("/:id",async(req,res)=>{
    try {
        const userId = await user.findById(req.params.id);
        res.json(userId.userContent)
    } catch (error) {
        res.status(500).json("co loi phia server")
    }
})
app.post("/:id/question/find",async(req,res)=>{
    const {ques} = req.body;
    try {
        const question = await data.findById(ques);
        if(!question){
            res.json("not found question")
        }
        res.json(question)
    } catch (error) {
        res.status(500).json("co loi phia server")
    }
})
app.post("/:id/add",async(req,res)=>{
    try {
        const {data}=req.body
        await user.findByIdAndUpdate(req.params.id,{
            $push:{
                question: data,
            }
         })
         res.json("add success")
    } catch (error) {
        res.status(500).json("co loi phia server")
    }
})
app.get('/:id/question',async(req,res)=>{
    try {
        const datas= await data.find({})
        res.json(datas)
    } catch (error) {
        res.status(500).json("sever error")
    }
})


app.listen(3030, ()=>{
    console.log("listening on http://localhost:3030")
})