const User = require("../models/User");
const bcrypt = require("bcrypt");

// 1. Register Page dikhane ke liye
exports.getRegister = (req, res) => {
    res.render("register");
};

// 2. Login Page dikhane ke liye
exports.getLogin = (req, res) => {
    res.render("login");
};

// 3. User Register karne ki logic
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hash = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password: hash
        });
        await user.save();
        res.redirect("/login");
    } catch (err) {
        console.log(err);
        res.status(500).send("Registration mein masla aya hai.");
    }
};

// 4. User Login karne ki logic
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.send("User nahi mila.");

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.send("Ghalat Password!");

        req.session.userId = user._id;
        res.redirect("/dashboard");
    } catch (err) {
        console.log(err);
        res.status(500).send("Login mein masla aya hai.");
    }
};

// 5. Logout karne ki logic
exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    });
};