
const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Post = require("../models/Post");

// UPDATE
router.put("/:userId", async (req, res) => {
    if(req.body.userId === req.params.userId) {
        if(req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }

        try {
            let user = await User.findById(req.body.userId);
            if(req.body.username) {
                await Post.updateMany(
                    {username: user.username},
                    {$set: {username: req.body.username}}
                );
            }

            let updatedUser = await User.findByIdAndUpdate(
                req.body.userId,
                {$set: req.body},
                {new: true}
            );
            let {password, ...output} = updatedUser._doc;
            res.status(200).json(output);
        } catch(err) {
            res.status(500).json(err);
        }
    }
    else {
        res.status(401).json("You can update only your account");
    }
});

// DELETE
router.delete("/:userId", async (req, res) => {
    if(req.body.userId === req.params.userId) {
        let user = null;
        try {
            user = await User.findById(req.body.userId);
            await Post.deleteMany({username: user.username});
            await User.findByIdAndDelete(req.body.userId);
            res.status(200).json("User has been deleted");
        } catch(err) {
            if(!user) {res.status(404).json("User not found")}
            else {res.status(500).json(err);}
        }
    }
    else {
        res.status(401).json("You can delete only your account");
    }
});

// GET
router.get("/:userId", async (req, res) => {
    let user = null;
    try {
        user = await User.findById(req.params.userId);
        let {password, ...output} = user._doc;
        res.status(200).json(output);
    } catch(err) {
        if(!user) {res.status(404).json("User not found")}
        else {res.status(500).json(err);}
    }
});

module.exports = router;
