import express from "express"

const router=express.Router();

import {createUser,getAllUsers,getSingleUser,updateSingleUser,deleteSingleUser} from "../controller/user.controller.js"

// We can have multiple middlewares.
const middleware=(req,res,next)=>{
    console.log("Middleware calling......")
    next()
}

const middleware2=(req,res,next)=>{
    console.log("Middleware2 calling......")
    next()
}

router.post("/user", createUser)
router.get("/user",middleware,getAllUsers)
//router.get("/user",[middleware,middleware2],getAllUsers)


router.get("/user/:id",getSingleUser)
//Method used to find by name
//router.get("/user/:name",getSingleUser)
router.put("/user/:id",updateSingleUser)
router.delete("/user/:id",deleteSingleUser)


export default (router)