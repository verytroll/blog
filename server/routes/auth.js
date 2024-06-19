
const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

// CREATE
router.post("/register", async (req, res) => {
    try {
        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(req.body.password, salt);
        let user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });
        await user.save();
        res.status(200).json(user);
    } catch(err) {
        res.status(500).json(err);
    }
});

// GET
router.post("/login", async (req, res) => {
    let user = null;
    try {
        user = await User.findOne({username: req.body.username});
        let validPassword = await bcrypt.compare(req.body.password, user.password);
        if(validPassword) {
            let {password, ...output} = user._doc;
            res.status(200).json(output);
        }
        else {
            res.status(403).json("Wrong username or password");
        }
    } catch(err) {
        if(!user) {res.status(403).json("Wrong username or password");}
        else {res.status(500).json(err);}
    }
});

module.exports = router;
