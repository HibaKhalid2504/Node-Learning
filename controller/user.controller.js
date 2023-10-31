import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


//Create user function
export const register=async(req,res)=>{
    try{
        const {email,password,name,age,gender}=req.body;
        //Check if username s already taken
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(401).json({message:"Username already existed.."})
        }

        //Hash the password
        const hashedPassword=await bcrypt.hash(password,10);


        //Create a new user
        const newUser= new User({email,passsword: hashedPassword,name,age,gender});
        await newUser.save();

        res.status(201).json({message:"Registration successful.."})
    }
    catch(error){
        res.status(500).json({message:"Registration failed",error: error.message});
    }
};



//Login controller
export const login=async(req,res)=>{

    try{
        const {email,password}=req.body;

        //Find the user by username
        const user=await User.findOne({email});

        //Check if user exists
        if(!user){
            return res.status(401).json({message:"Invalid credentials.."})
        }

        //Compare password
        const passwordMatch=await bcrypt.compare(password,user.password);

        if (!password){
            return res.status(401).json({message:"Invalid credentials.."})
        }


        //Generate a JWT token
        const token=jwt.sign({userid:user._id, email: user.email},process.env.JWT_SECRET,{expiresIn: "1h"});


        res.status(200).json({message:"Login successful",token});
    }
    catch(error){
        res.status(500).json({message:"Login failed",error: error.message});
    }
 };



 //Create user function
export const createUser= async(req, res)=>{
    try{
        const{name,age,gender}=req.body;
        if(!name || !age || !gender)
        {
            res.status(400).json({message:"All fields are mandTORY"})
        }

        const newUser= new User({
            name:name,
            gender:gender,
            age:age
        })
        await newUser.save()
        res.status(200).json(newUser)
    }
    catch(error){
        res.status(400).json({message:"ERROR"})
    }
}


//Get all data
export const getAllUsers=async(req,res)=>{
    try{
        const users=await User.find()
        if(users)
        {
            res.status(200).json(users)
        }
    }
    catch(error){
        res.status(500).json({message: "Error"})
    }
}


// Api to Get record of specific user
export const getSingleUser= async(req,res)=>{
    try{
        const {id}=req.params;
        const user= await User.findById(id);
        //Method used to find by name
        //const {name}=req.params;
        //const user= await User.findOne(name:name); 
        if(user){
            res.status(200).json(user)
        }
    }
    catch(error){
        res.status(400).json({message: "Error"})
    }
}


//Update record of specific user
export const updateSingleUser=async(req,res)=>{
    try{
        const {id}=req.params;
        const user=await User.findByIdAndUpdate(id,req.body,{
            new:true
        })
        if(user){
            res.status(200).json(user)
        }
    }
    catch(error){
        res.status(400).json({message: "Got an Error"})
    }
}

//Delete record of specific user
export const deleteSingleUser=async(req,res)=>{
    try{
        const {id}=req.params;
        const user=await User.findByIdAndDelete(id)
        if(user){
            res.status(200).json({message: "User is successfully deleted."})
        }
    }
    catch(error){
        res.status(400).json({message: "Got an Error while deleting"})
    }
}