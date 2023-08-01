const mongoose = require('mongoose')

const student = new mongoose.Schema({
    rollno:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    section:{
        type:String,
        required:true
    },
    posts:{
        type:Array,
        default:[]
    },
    comments:{
        type:Array,
        default:[]
    }
})

const post = new mongoose.Schema({
    title:{
        type:String,
        default:"Untitled"
    },
    content:{
        type:String,
        required:true
    },
    postedBy:{
        type:String,
        required:true
    },
    postedOn:{
        type:Date,
        default:new Date().toISOString()
    },
    comments:{
        type:Array,
        default:[]
    },

})

const faculty = new mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    designation:{
        type:String,
        required:true
    },
    picture:{
        type:String,
        default:"E:\\Projects\\ET Website\\et-website\\src\\assets\\img\\default-faculty.png"
    },
    email:{
        type:String
    },
    specialization:{
        type:String
    },
    publications:{
        type:Array,
        default:[]
    }
})

module.exports = mongoose.model('Student', student);
module.exports = mongoose.model('Post', post);
module.exports = mongoose.model('Faculty', faculty);