
const router = require("express").Router();
const Post = require("../models/Post");

// CREATE
router.post("/", async (req, res) => {
    try {
        let post = new Post(req.body);
        await post.save();
        res.status(200).json(post);
    } catch(err) {
        res.status(500).json(err);
    }
})

// UPDATE
router.put("/:postId", async (req, res) => {
    let post = null;
    try {
        post = await Post.findById(req.params.postId);
        if(post.username == req.body.username) {
            let updatedPost = await Post.findByIdAndUpdate(
                req.params.postId,
                {$set: req.body},
                {new: true}
            );
            res.status(200).json(updatedPost);
        }
        else {
            res.status(401).json("You can update only your post");
        }
    } catch(err) {
        if(!post)  {res.status(404).json("Post not found")}
        else {res.status(500).json(err)}
    }
})

// DELETE
router.delete("/:postId", async (req, res) => {
    let post = null;
    try {
        post = await Post.findById(req.params.postId);
        if(post.username == req.body.username) {
            await Post.findByIdAndDelete(req.params.postId);
            res.status(200).json("Post has been deleted...");
        }
        else {
            res.status(401).json("You can delete only your post");
        }
    } catch(err) {
        if(!post)  {res.status(404).json("Post not found")}
        else {res.status(500).json(err)}
    }
})

// GET
router.get("/:postId", async (req, res) => {
    let post = null;
    try {
        post = await Post.findById(req.params.postId);
        if(post) {res.status(200).json(post);}
        else {res.status(404).json("Post not found")}
    } catch(err) {
        if(!post)  {res.status(404).json("Post not found")}
        else {res.status(500).json(err)}
    }
})

// GET all
router.get("/", async (req, res) => {
    let username = req.query.user;
    let category = req.query.cat;
    try {
        let filter = {};
        if(username) {filter.username = username;}
        if(category) {filter.categories = {$in: [category]};}
        
        let posts = await Post.find(filter);
        res.status(200).json(posts);
    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router;
