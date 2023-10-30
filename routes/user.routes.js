import express from "express"

const router=express.Router();

import {createUser,getAllUsers,getSingleUser,updateSingleUser,deleteSingleUser} from "../controller/user.controller.js"

router.post("/user", createUser)
router.get("/user",getAllUsers)
router.get("/user/:id",getSingleUser)
//Method used to find by name
//router.get("/user/:name",getSingleUser)
router.put("/user/:id",updateSingleUser)
router.delete("/user/:id",deleteSingleUser)


export default (router)