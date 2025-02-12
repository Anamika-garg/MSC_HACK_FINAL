const { Post, Comment } = require("../models/Post");
const { User } = require("../models/User");

async function getPosts(req, res, next) {
  try {
    const Posts = await Post.find().sort({createdAt : -1});

    return res.status(201).json({
      success: "Post fetched Successful",
      Posts,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Some Error Occured",
      err,
    });
  }
}

async function createPost(req, res, next) {
  try {
    const user = req.user;
    const { content } = req.body;
    // console.log(content)
    const author = await User.findById(user.id);
    // console.log(user)

    const newPost = new Post({
      authorId: user.id,
      authorName: author.fullName,
      content,
    });
    await newPost.save();

    return res.status(201).json({
      success: "Post created Successful",
      post: newPost,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Some Error Occured",
      err,
    });
  }
}

async function addComment(req, res, next) {
  try {
    const user = req.user;
    const getAuthor = await User.findById(user.id);
    const { comment, postId } = req.body;

    const newComment = new Comment({
      comment,
      authorId: user.id,
      postId,
      authorName : getAuthor.fullName,
      authorPfp : getAuthor.details.photoURL
    });

    const post = await Post.findByIdAndUpdate(
      postId,
      { $push: { comments: newComment } },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    await newComment.save();

    return res.status(201).json({
      success: "Comment added successfully",
      post: post,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Some Error Occured",
      err,
    });
  }
}

async function likePost(req, res, next) {
  try {
    const { postId } = req.body;
    const user = req.user;
    const post = await Post.findById(postId);

    if(post.likedBy.includes(user.id)){
        console.log('cant like');
        return res.status(422).json({
            error : "You have already Liked this post"
        });
    }
    post.likedBy.push(user.id);
    post.likes += 1;
    await post.save();

    return res.status(200).json({
            success : "Successfully Liked this Post",
            post
        });

  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Some Error Occured!",
      err,
    });
  }
}

async function myPosts(req,res,next) {
    const user = req.user;
    try{
        const posts = await Post.find({authorId : user.id});
        if(posts.length>0){
            return res.status(200).json({
                success : 'Your Posts Fetched Successfully',
                posts
            })
        }
        return res.status(404).json({
            success : "You don't have any Posts",
        })

    }catch (err) {
        console.log(err);
        return res.status(400).json({
          error: "Some Error Occured!",
          err,
        });
      }

}

module.exports = {
  getPosts,
  createPost,
  addComment,
  likePost,
  myPosts,
};
