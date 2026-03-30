const Post = require("../models/Post");

// Read: Dashboard par posts dikhana
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("user");
        res.render("dashboard", { posts });
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
};

// Create: Naya post mehfooz karna
exports.createPost = async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('Image upload karna lazmi hai.');
        }

        const image = req.files.image;
        const uploadPath = './public/uploads/' + image.name;
        await image.mv(uploadPath);

        const newPost = new Post({
            title: req.body.title,
            content: req.body.content,
            image: image.name,
            user: req.session.userId
        });

        await newPost.save();
        res.redirect("/dashboard");
    } catch (err) {
        console.log(err);
        res.status(500).send("Post banane mein masla aya.");
    }
};

// Update Step 1: Edit Page par purana data bhejna
exports.editPostPage = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.render("editPost", { post });
    } catch (err) {
        res.status(500).send("Edit page load nahi ho saka.");
    }
};

// Update Step 2: Database mein tabdeeli save karna
exports.updatePost = async (req, res) => {
    try {
        const { title, content } = req.body;
        await Post.findByIdAndUpdate(req.params.id, { title, content });
        res.redirect("/dashboard");
    } catch (err) {
        res.status(500).send("Update fail ho gaya.");
    }
};

// Delete: Post khatam karna
exports.deletePost = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.redirect("/dashboard");
    } catch (err) {
        res.status(500).send("Post delete nahi ho saki.");
    }
};