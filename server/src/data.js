const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
    {
        title: String,
        questions: Array,
    },{
        collection: "dataQuestions"
    }
);
mongoose.model("dataQuestions", userSchema)