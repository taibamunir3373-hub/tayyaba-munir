const express = require("express");
const session = require("express-session");
const fileUpload = require("express-fileupload");
const path = require("path");
const mongoose = require("mongoose");
const postController = require("./controllers/postController"); // Controller import lazmi hai

// Database Connection
mongoose.connect("mongodb://127.0.0.1:27017/blogDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("DB Connection Error:", err));

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(fileUpload());

app.use(session({
    secret: "sp23-bse-025-secret-key",
    resave: false,
    saveUninitialized: true
}));

app.set("view engine", "ejs");

// Routes
app.use("/", require("./routes/authRoutes"));
app.use("/", require("./routes/postRoutes"));

app.get("/", (req, res) => {
    res.redirect("/login");
});
// Create & Read
app.get("/dashboard", postController.getPosts);
app.post("/create", postController.createPost);

// Update (Edit) - New Routes
app.get("/post/edit/:id", postController.editPostPage);
app.post("/post/update/:id", postController.updatePost);
// Delete route jisme post ki ID pass ho rahi hai
app.get("/post/delete/:id", postController.deletePost);

// Port Setup
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});