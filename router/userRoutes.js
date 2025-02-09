const express = require('express');
const router = express.Router();
const { registerUser , userDetails, login, continueWithGoogle , profile ,moodJournal, resumereview , getJournals , getAuthor, personalisedCourses , getCourses} = require('../controllers/userControllers');
const { verifyToken } = require('../middlewares/verify');
const { uploadToCloudinary, upload } = require('../middlewares/fileUpload');


router.post('/register' , registerUser);
router.post('/userDetails' ,  verifyToken, upload.single('Avatar'), uploadToCloudinary,  userDetails);
router.post('/login', login);
router.post('/continueWithGoogle', continueWithGoogle);
router.get('/profile', verifyToken, profile);
router.post('/moodJournal', verifyToken, moodJournal);
router.post('/resumereview', verifyToken, resumereview);
router.post('/resumereview', verifyToken, resumereview);
router.get('/getJournals', verifyToken, getJournals);
router.get('/author/:id', getAuthor);
router.get('/personalisedCourses', verifyToken, personalisedCourses);
router.post('/getCourses',  getCourses);


module.exports = router;