const mongoose = require('mongoose');
const { User } = require('./User');

const journalSchema = new mongoose.Schema({
    userID : {
        type : mongoose.Types.ObjectId,
        required : true,
        ref : User
    },
    moodText : {
        type : String,
        required : true,
    },
    moodEmoji : {
        type : String,
        required : true,
    },
    affirmations : {
        type : Array,
        required : true,
    },
    createdAt : {
        type : Date,
        default : new Date()
    }
     
})


const Journal = new mongoose.model('Journal' , journalSchema);
module.exports = Journal