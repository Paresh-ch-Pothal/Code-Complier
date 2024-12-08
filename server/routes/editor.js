const express=require("express");
const fetchuser = require("../middleware/fetchuser");
const Editor = require("../models/editor");
const router=express.Router();

// create a file name
router.post('/create',fetchuser,async(req,res)=>{
    try {
        const {name,language}=req.body
        const editor=new Editor({
            name: name,
            language,
            user: req.user._id
        })
        const saveEditor=await editor.save();
        return res.status(200).json({success: true,saveEditor})
    } catch (error) {
        console.error(error);
        return res.status(500).json({success: false,message: "Some internal issue is there"})
    }
})


module.exports=router