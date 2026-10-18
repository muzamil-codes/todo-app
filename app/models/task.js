import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: String,
    desc: String,
    prior: String
}, {timestamps:true})

export const Task =  mongoose.models.Task || mongoose.model("Task", taskSchema)