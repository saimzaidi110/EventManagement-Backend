const {Schema, default: mongoose} = require("mongoose");
const UserSchema = new Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },

    //role
    role:{
        type:String,
        default:"user",
        enum:["user","admin"]
    }
})
module.exports=mongoose.model("user",UserSchema)