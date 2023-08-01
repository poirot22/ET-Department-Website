const schemas = require('./schemas.js')
const mongoose = require('mongoose')
const confidential= require('./confidential.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

mongoose.set("strictQuery", false);

const Student = mongoose.model("Student",schemas.student)
const Post = mongoose.model("Post",schemas.post)
const Faculty = mongoose.model("Faculty",schemas.faculty)

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

async function addFaculty(body){
    const facultyExists = await Faculty.findOne({"id":body.id})
    
    
    console.log(facultyExists)
    if(facultyExists==null){
        const newFaculty = new Faculty(body)
        await newFaculty.save()
        return "Faculty Added"
    }
    else{
        return "Faculty already exists"
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
    studentExists.posts.push(newPost._id)
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
    const student = await Student.findOne({"rollno":loginForm.rollno.toUpperCase()})

    if(student==null){
        return {"message":"Student doesn't exist","status":404}
    }
    const matchPassword = await bcrypt.compare(loginForm.password,student.password)

    if(matchPassword){
        const token = await jwt.sign({rollno:student.rollno,password:student.password},confidential.SECRET_KEY)
        return {"message":"User Logged In","token":token,"status":200}
    }
    else{
        return {"message":"Wrong password","status":401}
    }
}

async function getAllPosts(){
    const posts = await Post.find()

    return {"message":"Posts returned","status":201,"posts":posts}
}

module.exports.addStudent = addStudent
module.exports.getStudentByRollNo = getStudentByRollNo
module.exports.addPost = addPost
module.exports.getPostById = getPostById
module.exports.getCommentsOnPost = getCommentsOnPost
module.exports.addComment =addComment
module.exports.getAllPosts =getAllPosts
module.exports.login =login
module.exports.addFaculty =addFaculty