import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

// Login user

const loginUser = async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success:false,msg:"User Doesn't exist"})
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.json({success:false,msg:"Invalid credentials"})
        }

        const token =createToke(user._id);
        res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({success:false,msg:"Error"})
    }
}

const createToke=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//register user

const registeruser = async(req,res)=>{
    const {name,email,password} = req.body;
    try {
        const exists = await userModel.findOne({email})
        if(exists) return res.status(400).json({success:false,msg:"User already exists"})

        //validating email format and strong password

        if(!validator.isEmail(email)){
            return res.status(400).json({success:false,msg:"Enter Valid Email"})
        }

        if(password.length<8){
            return res.json({success:false,msg:"Please enter strong password"});
        }

        //hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const newUser = new userModel({
            name,
            email,
            password:hashedPassword
            });
            const user = await newUser.save();
            const token = createToke(user._id);
            res.json({success:true,token})

    } catch (error) {
        console.log("ERROR");
        res.json({success:false,msg:"error"})
    }
}

export {loginUser,registeruser};