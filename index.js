const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port =  9000
const schemas = require('./schemas.js')
const confidential = require('./confidential.js')
const queries = require('./queries.js')
const { json } = require('body-parser');
const cors = require('cors')
const jwt = require('jsonwebtoken')




//MIDDLEWARES
app.use(express.json())
app.use(cors({
    origin:'http://localhost:4200'
}
))

app.use('/verify',(req,res,next)=>{
    try{
        
        let token=req.headers.authorization 
        
        if(token!=null){
            console.log(token)
            token=token.split(" ")[1]
            let student = jwt.verify(token,confidential.SECRET_KEY)
            console.log(student.rollno)
            req.studentRollNo=student.rollno
        }
        else{
            res.sendStatus(401).json({message:"unauthorised user"})
        }
        next()
    }
    catch(error){
        console.log(error)
        res.sendStatus(201).json({message:"Unauthorized user"})
    }
})






//GET Methods
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get("/getStudentByRollNo/:rollno",(req,res)=>{
    rollno = req.params.rollno 
    queries.getStudentByRollNo(rollno).then(response=>{
        if(response.message=="Student Found"){
            res.status(200).send(response)
        }
        else if(response.message=="Student doesn't exist"){
            res.status(404).send(response)
        }
    }).catch(err=>{
        console.log(err)
    })
})

app.get('/getCommentsOnPost/:postID',(req,res)=>{
    postID=req.params.postID 
    queries.getCommentsOnPost(postID).then(response=>{
        res.status(response.status).send(response)
    })
})

app.get("/getPostById/:postID",(req,res)=>{
    postID=req.params.postID 
    queries.getPostById(postID).then(response=>{
        res.status(response.status).send(response)
    })
})

app.get("/getFaculty",(req, res)=>{
    queries.getFaculty().then(response=>{
        res.status(200).send(response)
    })
})

app.get("/getFacultyById/:facultyID",(req,res)=>{
    facultyID=req.params.facultyID
    queries.getFacultyById(facultyID).then(response=>{
        res.status(200).send(response)
    })
})


app.get("/verify",(req,res)=>{
    res.send({"Student Roll Number":req.studentRollNo})
})

app.get("/getAllPosts",(req,res)=>{
    queries.getAllPosts().then(response=>{
        res.status(response.status).send(response)
    })
})


//POST Methods
app.post('/addStudent',(req,res)=>{
    studentData = req.body
    //console.log(studentData)
    queries.addStudent(studentData).then(response=>{
        console.log(response)
        res.send({"message":response})
    }).catch(err=>{
        res.send(err)
    })
})

app.post('/addFaculty',(req,res)=>{
    facultyData=req.body 

    queries.addFaculty(facultyData).then(response=>{
        console.log(response)
        res.send({"message":response})
    }).catch(err=>{
        res.send(err)
    })
})

app.post('/addPost',(req,res)=>{
    postData=req.body 

    queries.addPost(postData).then(response=>{
        res.status(response.status).send(response)
    })
})

app.post('/login',(req,res)=>{
    const loginForm=req.body

    queries.login(loginForm).then(resp=>{
        res.status(resp.status).send(resp)
    })
})


//PUT Methods
app.put('/addComment/:postID', (req, res) => {
    postID = req.params.postID;
    comment = req.body;

    queries.addComment(postID, comment).then(response => {
        if (response.status) {
            res.status(response.status).send(response);
        } else {
            res.status(500).send({ error: 'Internal Server Error' });
        }
    }).catch(error => {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    });
});

app.listen(port,()=>{
    console.log('listening at port '+port)
})

mongoose.connect(confidential.MONGOURI).then(()=>{
    console.log("connected to database")
}).catch((e)=>console.log(e))