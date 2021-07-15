const express = require('express');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();
const authenticate = require('../authentication/authenticate');

require('../db/conn');

const User = require("../models/userSchema");

router.post('/server/register',async (req,res)=>{
    const {name,email,phone,pass} = req.body;
    if(!(name && email && phone && pass)){
        return res.status(422).json({error:"please fill all fields"});
    }
    try{

        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(422).json({error:"user already exists!"});
        }
        const user = new User({ name: name, email: email, phone: phone, pass:pass});
        await user.save();
        return res.status(201).json({message:"user registered!"});

    }catch(err){
        console.log(err);
    }
})

router.post("/server/login",async (req,res)=>{
    try{
        const {email,pass} = req.body;
        if(!email || !pass) return res.status(400).json({error: "fill all the required fields!"});
        
        const user = await User.findOne({email:email});
        if(!user){
            return res.status(400).json({error:"invalid credentials!"});
        }
        const isMatch = await bcrypt.compare(pass, user.pass);
        if(!isMatch) return res.status(400).json({error:"invalid credentials!"})
        else {
            const token = await user.generateAuthToken();
            res.cookie("jwtoken",token,{
                expires: new Date(Date.now()+2592000000),
                httpOnly:true
            });
            return res.json({message: "sign in successfull!"});
        }

    }catch(err){
        console.log(err);
    }
})

router.get("/server/about",authenticate,(req,res)=>{
    res.send(req.rootUser);
});

router.get("/server/logout",(req,res)=>{
    res.clearCookie("jwtoken",{path:"/"});
    res.status(200).send("user logged out");

});


module.exports = router;