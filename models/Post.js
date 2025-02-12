const mongoose = require('mongoose');
const { User } = require('./User');

const commentSchema = new mongoose.Schema({
    authorId : {
        type : mongoose.Types.ObjectId,
        required : true,
        ref : User
    },
    authorName : {
        type : String,
        required : true,
    },
    authorPfp : {
        type : String,
        required : true,
    },
    comment : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        default : new Date()
    },
    postId : {
        type : mongoose.Types.ObjectId,
        required : true,
    },
})

const postSchema = new mongoose.Schema({
    authorId : {
        type : mongoose.Types.ObjectId,
        required : true,
        ref : User
    },
    authorName : {
        type : String,
        required: true,
    },
    content : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        default : new Date()
    },
    comments : [commentSchema],
    likes : {
        type : Number,
        default: 0
    },
    likedBy : [{ type: mongoose.Schema.Types.ObjectId, ref: User }],
})

const Post = new mongoose.model('Post' , postSchema);
const Comment = new mongoose.model('Comment' , commentSchema);
module.exports = {
    Post,
    Comment
}