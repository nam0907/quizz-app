const express=require('express');
const question = express.Router();
const mongoose = require('mongoose')
const data = mongoose.model("dataQuestions");

question.get("/:id",async(req,res)=>{
    try {
        const dataId= await data.findById(req.params.id)
        res.json(dataId)
    } catch (error) {
        res.status(500).json("server error")
    }
})
 
module.exports = question