const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const bcrypt=require("bcryptjs");
const jwt = require('jsonwebtoken');


router.post("/register", async (req, res) => {
    const salt= await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password,salt);
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(200).json({ message: "User already exists" });
    }

    const newUser = new User({
      email: req.body.email,
      username: req.body.username,
      password: secPassword
    });

    await newUser.save();
    res.status(200).json({ message: "User created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


router.post("/loginuser",async(req,res)=>{
    let email = req.body.email;
    try {
      let userData = await User.findOne({ email });
      if (!userData) {
         res.status(200).json({ message: "Try logging in with correct credentials" });
      }

      // Use bcrypt to compare the password with the hashed password
      const pwdCompare = await bcrypt.compare(req.body.password, userData.password);
      if (!pwdCompare) {
         res.status(200).json({ message: "Try logging in with correct credentials" });
      }

      const {password,...others}=userData._doc;
      res.status(200).json({others});
    } catch (error) {
      console.log(error);
      res.status(200).json({ message: "user already exists" });
  }
});
     
  

module.exports = router;
 