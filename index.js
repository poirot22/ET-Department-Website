const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port,()=>{
    console.log('listening at port '+port)
})

mongoose.connect('mongodb+srv://saitejas222:emtechcvr23@cluster0.99kfizq.mongodb.net/ET').then(()=>{
    console.log("connected to database")
}).catch((e)=>console.log(e))