const router = require("express").Router();
const cryptoJS = require("crypto-js");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const md5 = require("md5");
const fs = require("fs");

// const jwtPrivateKey = fs.readFileSync('./rsa.pem', 'utf8');
const jwtPrivateKey = process.env.JWTKEY;

dotenv.config();

const User = require("../models/User");
const { verifyTokenAndAuthorization, verifyToken } = require("./verifyToken");

// Register
router.post("/signup", async(req, res, next) => {
    if (!req.body.username ||
        !req.body.password
    ) {
        res.status(200).json({ message: "Please fill the required inputs!" });
    } else {
        // Check if user user exists
        const existingUser = await User.findOne({
            username: req.body.username,
        });

        if (!!existingUser) {
            return res.status(200).json({ message: "Username already taken!" });
        }

        const newUser = new User({
            username: req.body.username,
            password: md5(req.body.password),
            userType: "admin",
        });
        try {
            const savedUser = await newUser.save();

            const { password, ...otherUserInfo } = savedUser._doc;
            res
                .status(201)
                .json({ message: "Account Created Successfully!", otherUserInfo });
        } catch (err) {
            return next(err);
        }
    }
});

// Login
router.post("/login", async(req, res, next) => {
    if (!req.body.username || !req.body.password) {
        res.status(400).json("Please fill the required inputs!");
    } else {
        try {
            const user = await User.findOne({ username: req.body.username });

            // !user && res.status(401).json("Wrong Credientials!");
            if (!user) {
                return res.status(401).json({ message: "Wrong Credientials!" });
            }

            const hashedPassword = md5(req.body.password);
            const userPassword = user.password;

            // userPassword !== req.body.password && res.status(401).json("Wrong Credientials!");
            if (userPassword !== hashedPassword) {
                return res.status(401).json({ message: "Wrong Credientials!" });
            }

            const accessToken = jwt.sign({
                    _id: user._id,
                    isAdmin: user.userType === "admin",
                    email: user.email,
                    username: user.username,
                    userType: user.userType,
                    isLoggedIn: true,
                },
                jwtPrivateKey, {
                    expiresIn: "7d",
                }
            );

            const { password, ...userDetails } = user._doc;

            res.status(200).json({ message: "Log In Successful!", accessToken });
        } catch (err) {
            return next(err);
        }
    }
});



module.exports = router;