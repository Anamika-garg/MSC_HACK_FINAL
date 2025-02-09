const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const userRoutes = require('./router/userRoutes');
const jobsRoutes = require('./router/jobsRoutes');
const postRoutes = require('./router/postRoutes');
const app = express();
app.use(express.json())
app.use(cors());
app.use('/api/user', userRoutes)
app.use('/api/job', jobsRoutes)
app.use('/api/post', postRoutes)

app.get('/' , (req,res)=>{
    res.send("Hello,world")
})

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Database connected Successful!")
})

app.listen(process.env.PORT || 3000 , ()=>{
    console.log("Port listening on port 3000")
})