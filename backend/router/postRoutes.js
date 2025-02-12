const express = require('express');
const { getPosts , createPost , addComment , likePost , myPosts} = require('../controllers/postControllers');
const { verifyToken } = require('../middlewares/verify');
const router = express.Router();




router.get('/posts' , getPosts);
router.post('/create' , verifyToken , createPost);
router.post('/addComment' , verifyToken , addComment);
router.post('/likePost' , verifyToken , likePost);
router.get('/myPosts' , verifyToken , myPosts);

module.exports = router;