
const router = require("express").Router();
const Category = require("../models/Category");

// CREATE
router.post("/", async (req, res) => {
    try {
        let category = new Category(req.body);
        await category.save();
        res.status(200).json(category);
    } catch(err) {
        res.status(500).json(err);
    }
})

// GET
router.get("/", async (req, res) => {
    try {
        let categories = await Category.find();
        res.status(200).json(categories);
    } catch(err) {
        res.status(500).json(err);
    }
})

module.exports = router;
