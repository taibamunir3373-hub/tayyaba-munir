const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authMiddleware = require("../middleware/authMiddleware");

// 1. Show dashboard
router.get("/dashboard", authMiddleware, postController.getPosts);

// 2. Show Create Post form
router.get("/create", authMiddleware, (req, res) => {
    res.render("createPost");
});

// 3. Handle Create Post form submission
router.post("/create", authMiddleware, postController.createPost);

module.exports = router;