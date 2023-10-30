import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "../NodeLearning/routes/user.routes.js"


const app= express(); // express constructor

app.use(bodyParser.json())
dotenv.config();

app.use("/api",router)



mongoose.connect(process.env.MONGO_URL)
mongoose.connection.on("connected",()=>{
    console.log("Database connected") 
})


app.listen(process.env.PORT, ()=>{
    console.log(`Server is listening on: ${process.env.PORT}`)
})
