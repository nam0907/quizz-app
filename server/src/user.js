const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
    {
        userInfor: Object,
        name: String,
        email:  String,
        password: String,
        userContent: Object,
        notifications: Array,
        question: Array,
        class:Array,
        userQuestion: Array,
        userClass: Array,
        userLibrary: Array,
    },{
        collection: "userInfo"
    }
);
mongoose.model("userInfo", userSchema)