module.exports = function(req,res,next){

    if(!req.files){
        return res.send("No image uploaded");
    }

    const file = req.files.image;

    if(!file.mimetype.startsWith("image")){
        return res.send("Only images allowed");
    }

    next();
};const {body} = require("express-validator");

exports.registerValidation = [
body("email").isEmail(),
body("password").isLength({min:6})
];