const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    
    position: { type: String },   
    company: { type: String },          
    startDate: { type: Date},      
    endDate: { type: Date },                         
    description: { type: String },                  
    currentlyWorking: { type: Boolean, default: false } 
});

const educationSchema = new mongoose.Schema({
    course: { type: String, required: true },   
    college: { type: String, required: true },      
    startDate: { type: Date },      
    endDate: { type: Date },
});

const locationSchema = new mongoose.Schema({
    city: { type: String, required: true },   
    country: { type: String, required: true },
})

const userDetailsSchema = new mongoose.Schema({
    userID : {
        type : mongoose.Types.ObjectId,
    },
    photoURL : {
        type : String,
    },
    Skills : {
        type : Array,
    },
    Experience : [experienceSchema],
    Education : [educationSchema],

    Bio : {
        type : String,
    },
    Phone : {
        type : Number,
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



const userJournalSchema = new mongoose.Schema({
    authorId : {
        type : mongoose.Types.ObjectId,
        required : true,
    },
    moodText : {
        type : String,
        required : true,
    },
    moodEmoji : {
        type : String,
        required : true,
    },
    affirmations : [{
        type : String
    }],
    createdAt : {
        type: Date,
        default : Date.now()
    }
})


const User = new mongoose.model('User' , userSchema);
module.exports = {
    User
}