import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    name:{
        type: String
    },
    age:{
        type: Number
    },
    gender:{
        type: String
    }
})

const schema=mongoose.model("User", userSchema);
export default schema;