const schemas = require('./schemas.js')
const mongoose = require('mongoose')
const confidential= require('./confidential.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

mongoose.set("strictQuery", false);

const Student = mongoose.model("Student",schemas.student)
const Post = mongoose.model("Post",schemas.post)

async function addStudent(body){
    const studentExists = await Student.findOne({"rollno":body.rollno})
    
    
    console.log(studentExists)
    if(studentExists==null){
        body.password = await bcrypt.hash(body.password,10)
        const newStudent = new Student(body)
        await newStudent.save()
        return "Student Added"
    }
    else{
        return "Student already exists"
    }
}

async function getStudentByRollNo(rollno){
    const student = await Student.findOne({"rollno":rollno})
    if(student==null){
        return {"message":"Student doesn't exist"}
    }
    else{
        return {"message":"Student Found","Student Data":student}
    }
}

async function addPost(body){
    const studentExists = await Student.findOne({"rollno":body.postedBy})
    if(studentExists==null){
        return {"message":"Student doesn't exist","status":400}
    }
    const newPost = new Post(body)
    await newPost.save()
    return {"message":"Post created","status":201,"post added":newPost}

}

async function addComment(postID,commentBody){
    const post = await Post.findById(postID)
    const student = await Student.findOne({"rollno":commentBody.postedBy})
    if(post==null){
        return {"message":"Post doesn't exist","Status":400}
    }
    else if(student==null){
        return {"message":"Student doesn't exist","Status":400}
    }
    else{
        post.comments.push(comment)
        student.comments.push({"postID":post._id,"comment":commentBody.comment})
        await post.save()
        await student.save()
        return {"message":"Comment added","status":201,"Post updated":post,"Student updated":student}
    }
}

async function getPostById(postID){
    const post = await Post.findById(postID)
    console.log(post)
    if(post==null){
        return {"message":"Post doesn't exist","status":404}
    }
    else{
        return {"message":"Post found","status":201,"post":post}
    }
}

async function getCommentsOnPost(postID){
    const post = await Post.findById(postID)

    if(post==null){
        return {"message":"Post doesn't exist","status":404}
    }
    else{
        return {"message":"Post found","status":201,"comments":post.comments}
    }
}

async function login(loginForm){
    const student = await Student.findOne({"rollno":loginForm.rollno})

    if(student==null){
        return {"message":"Student doesn't exist","status":404}
    }
    const matchPassword = await bcrypt.compare(loginForm.password,student.password)

    if(matchPassword){
        const token = await jwt.sign({rollo:student.rollno,password:student.password},confidential.SECRET_KEY)
        return {"message":"User Logged In","token":token,"status":200}
    }
    else{
        return {"message":"Wrong password","status":401}
    }
}

module.exports.addStudent = addStudent
module.exports.getStudentByRollNo = getStudentByRollNo
module.exports.addPost = addPost
module.exports.getPostById = getPostById
module.exports.getCommentsOnPost = getCommentsOnPost