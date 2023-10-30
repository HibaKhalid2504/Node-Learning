import User from "../models/user.model.js"

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