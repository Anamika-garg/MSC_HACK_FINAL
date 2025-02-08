const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    title: { type: String, required: true },   
    company: { type: String, required: true },      
    location: { type: String },                     
    startDate: { type: Date, required: true },      
    endDate: { type: Date },                         
    description: { type: String },                  
    currentlyWorking: { type: Boolean, default: false } 
});

const educationSchema = new mongoose.Schema({
    course: { type: String, required: true },   
    college: { type: String, required: true },      
    startDate: { type: Date, required: true },      
    endDate: { type: Date },
});

const locationSchema = new mongoose.Schema({
    city: { type: String, required: true },   
    country: { type: String, required: true },
})

const userDetailsSchema = new mongoose.Schema({
    userID : {
        type : mongoose.Types.ObjectId,
        required :  true,
    },
    photoURL : {
        type : String,
        required : true,
    },
    Skills : {
        type : Array,
        required : true,
    },
    Experience : [experienceSchema],
    Education : [educationSchema],

    Bio : {
        type : String,
        required : true
    },
    Phone : {
        type : Number,
        required : true,
    },
    location : [locationSchema],
    profession : {
        type : String,
    },
    internshipsCompleted : {
        type  : Number,
        default : 0,
    },
    scholarshipAcquired : {
        type  : Number,
        default : 0,
    },
    coursesCompleted : {
        type  : Number,
        default : 0,
    }
})

const userSchema = mongoose.Schema({
    fullName : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
    },
    providerId : {
        type : String,
    },
    details : userDetailsSchema
})


const User = new mongoose.model('User' , userSchema);
module.exports = {
    User
}