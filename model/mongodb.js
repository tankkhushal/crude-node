const mongoose = require("mongoose")

const studentSchema = mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    naphoneme:{
        type:String
    },
})

const student = mongoose.model("student",studentSchema)

module.exports = student