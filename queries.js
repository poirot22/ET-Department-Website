const schemas = require('./schemas.js')
const mongoose = require('mongoose')
const confidential = require('./confidential.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

mongoose.set("strictQuery", false);

const Student = mongoose.model("Student", schemas.student)
const Post = mongoose.model("Post", schemas.post)
const Faculty = mongoose.model("Faculty", schemas.faculty)
const Comment=mongoose.model("Comment",schemas.comment)

async function addStudent(body) {
    const studentExists = await Student.findOne({ "rollno": body.rollno })


    console.log(studentExists)
    if (studentExists == null) {
        body.password = await bcrypt.hash(body.password, 10)
        const newStudent = new Student(body)
        await newStudent.save()
        return "Student Added"
    }
    else {
        return "Student already exists"
    }
}

async function addFaculty(body) {
    const facultyExists = await Faculty.findOne({ "id": body.id })


    console.log(facultyExists)
    if (facultyExists == null) {
        body.password = await bcrypt.hash(body.password, 10)
        const newFaculty = new Faculty(body)
        await newFaculty.save()
        return "Faculty Added"
    }
    else {
        return "Faculty already exists"
    }
}


async function getStudentByRollNo(rollno) {
    const student = await Student.findOne({ "rollno": rollno })
    if (student == null) {
        return { "message": "Student doesn't exist" }
    }
    else {
        return { "message": "Student Found", "Student Data": student }
    }
}



async function addPost(body) {
    const studentExists = await Student.findOne({ "rollno": body.postedBy })
    if (studentExists == null) {
        return { "message": "Student doesn't exist", "status": 400 }
    }
    const newPost = new Post(body)
    studentExists.posts.push(newPost._id)
    await newPost.save()
    studentExists.save()
    return { "message": "Post created", "status": 201, "post added": newPost }

}

async function addComment(postID, commentBody) {
    const post = await Post.findById(postID)
    const student = await Student.findOne({ "rollno": commentBody.postedBy })
    if (post == null) {
        return { "message": "Post doesn't exist", "Status": 400 }
    }
    else if (student == null) {
        return { "message": "Student doesn't exist", "Status": 400 }
    }
    else {
        //console.log("c:" +commentBody)
        body={"content":commentBody.comment,"commentedBy":commentBody.postedBy,"commentedOn":postID}
        const comment=new Comment(body)
        post.comments.push(comment._id)
        student.comments.push(comment._id)
        //console.log(body)
        await post.save()
        await student.save()
        await comment.save()
        return { "message": "Comment added", "status": 201, "Comment ID":comment._id, "Post updated": post, "Student updated": student }
    }
}

async function getPostById(postID) {
    const post = await Post.findById(postID)
    console.log(post)
    if (post == null) {
        return { "message": "Post doesn't exist", "status": 404 }
    }
    else {
        return { "message": "Post found", "status": 201, "post": post }
    }
}

async function getCommentsOnPost(postID) {
    const post = await Post.findById(postID)

    if (post == null) {
        return { "message": "Post doesn't exist", "status": 404 }
    }
    else {
        return { "message": "Post found", "status": 201, "comments": post.comments }
    }
}

async function loginStudent(loginForm) {
    const student = await Student.findOne({ "rollno": loginForm.rollno.toUpperCase() })

    if (student == null) {
        return { "message": "Student doesn't exist", "status": 404 }
    }
    const matchPassword = await bcrypt.compare(loginForm.password, student.password)

    if (matchPassword) {
        const token = await jwt.sign({ rollno: student.rollno, password: student.password }, confidential.SECRET_KEY)
        return { "message": "User Logged In", "token": token, "status": 200 }
    }
    else {
        return { "message": "Wrong password", "status": 401 }
    }
}

async function getAllPosts() {
    const posts = await Post.find()

    return { "message": "Posts returned", "status": 201, "posts": posts }
}

async function getFaculty() {
    const facultyDetails = await Faculty.find();
    console.log(facultyDetails)
    return { "message": "Details returned", "status": 201, "details": facultyDetails }
}

async function deleteComment(commentID){
    
    const comment = await Comment.findById(commentID)
    if(comment==null){
        return {"message":"Comment doesn't exist","status":404}
    }

    const student=await Student.findOne({"rollno":comment.commentedBy})
    const post=await Post.findById(comment.commentedOn)

    index=student.comments.indexOf(commentID)
    await student.comments.splice(index,1)
    index=post.comments.indexOf(commentID)
    await post.comments.splice(index,1)

    await student.save()
    await post.save()
    await Comment.deleteOne({"_id":commentID})
        
    return {"message":"Comment deleted","status":201}
    
}

async function deletePost(postID) {
    try {
        //console.log("Deleting post "+postID)
        const post = await Post.findById(postID);
        if (!post) {
            return { "message": "Post doesn't exist", "status": 404 };
        }
        const rollno = post.postedBy;        
        const user = await Student.findOne({ "rollno": rollno });
        if (!user) {
            return { "message": "User doesn't exist", "status": 404 };
        }
        const index = user.posts.indexOf(postID);
        user.posts.splice(index, 1);
        await user.save()
        
        for(let i=0;i<post.comments.length;i++){
            await deleteComment(post.comments[i])
        }

       
        await Post.deleteOne({"_id":postID});

        return { "message": "Post deleted", "status": 201 };
    } catch (error) {
        console.error(error);
        return { "message": "An error occurred", "status": 500 };
    }
}


async function getFacultyById(facultyID) {
    const faculty = await Faculty.findById(facultyID)

    if (faculty != null) {
        return { "message": "Faculty found", "Faculty Data": faculty }
    }
    else {
        return { "message": "Faculty not found", "status": 404 }
    }
}

async function getCommentByID(commentID){
    const commentExists = await Comment.findById(commentID)
    if(commentExists==null){
        return {"message":"Comment doesn't exist","status":404}
    }
    else{
        return {"message":"Comment found","status":201,"comment":commentExists}
    }
}

async function addProject(studentID,projectInfo){
    const student = await Student.findOne({ "rollno": studentID })
    if(student == null){
        return {"message":"Student doesn't exist","status":404}
    }
    else{
        student.projects.push(projectInfo)
        await student.save()
        return {"message":"Project added","status":201,"student":student}
    }
}
module.exports.addStudent = addStudent
module.exports.getStudentByRollNo = getStudentByRollNo
module.exports.addPost = addPost
module.exports.getPostById = getPostById
module.exports.getCommentsOnPost = getCommentsOnPost
module.exports.addComment = addComment
module.exports.getAllPosts = getAllPosts
module.exports.loginStudent = loginStudent
module.exports.addFaculty = addFaculty
module.exports.getFaculty = getFaculty
module.exports.getFacultyById = getFacultyById
module.exports.deletePost = deletePost
module.exports.getCommentByID=getCommentByID
module.exports.deleteComment=deleteComment
module.exports.addProject=addProject