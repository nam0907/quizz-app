const express = require('express');
const idRouter = express.Router();
const mongoose = require('mongoose')

const user = mongoose.model("userInfo");
const data = mongoose.model("dataQuestions");

idRouter.post("/question/creat",async(req,res)=>{
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
idRouter.post("/question/add",async(req,res)=>{
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
idRouter.get("/",async(req,res)=>{
    try {
        const userId = await user.findById(req.params.id);
        res.json(userId)
    } catch (error) {
        res.status(500).json("co loi phia server")
    }
})
idRouter.post("/question/find",async(req,res)=>{
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
idRouter.post("/add",async(req,res)=>{
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
idRouter.get('/question',async(req,res)=>{
    try {
        const datas= await data.find({})
        res.json(datas)
    } catch (error) {
        res.status(500).json("sever error")
    }
})


module.exports = idRouter