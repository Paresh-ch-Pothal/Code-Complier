const express=require("express");
const User = require("../models/user");
const router=express.Router();
const bcrypt=require("bcryptjs");
const JWT=require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const JWT_SECRET="^@12@34#%^&8@1%6$5^&#code#!Compiler##)";


// ::: SignUp Routes


router.post("/signup",async(req,res)=>{
    const {name,email,password}=req.body;
    if(!name || !email || !password){
        return res.status(400).json({success: false,error: "Please Provide All the Details"});
    }
    try {
        let user=await User.findOne({email});
        if(user){
            return res.status(400).json({success: false,error: "Already a user exist with the same email"});
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        user=await User.create({
            name: name,
            email: email,
            password: hashedPassword
        })

        const payload={
            user:{
                _id: user._id,
                name: user.name
            }
        }
        const authtoken=JWT.sign(payload,JWT_SECRET);

        return res.json({success: true,user,authtoken});
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some Internal issue is there")
    }
})

router.post("/signin",async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(404).json({success: false,error: "Invalid Credentials"});
        }
        const compaarePassword=await bcrypt.compare(password,user.password);
        if(!compaarePassword){
            return res.status(400).json({success: false,error: "Please try with correct information"})
        }

        const payload={
            user:{
                id: user._id,
                name: user.name
            }
        }

        const authtoken=JWT.sign(payload,JWT_SECRET);
        return res.json({success: true,authtoken})
    } catch (error) {
        return res.status(500).send("Some internal issue is there")
    }
})

module.exports=router;