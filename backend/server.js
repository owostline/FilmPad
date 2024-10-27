import express from "express";
import dotenv from "dotenv";
import {connectDB} from './config/db.js';
import Log from './models/logs.model.js';
import mongoose from "mongoose";

dotenv.config();

const app = express();

app.use(express.json()); //allows to accept JSON data in the req.body

app.get("/api/logs", async (req, res) => {
    try {
        const logs = await Log.find({});
        res.status(200).json({success: true, data: logs});
    } catch (error) {
        console.log("Error in fetching products: ", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
})

app.post("/api/logs", async (req, res) => {
    const log = req.body; // data from user

    if (!log.name || !log.year || !log.image) {
        return res.status(400).json({success:false, message: "Please provide all fields."})
    }

    const newLog = new Log(log);

    try {
        await newLog.save();
        res.status(201).json({success: true, data: newLog});
    } catch (error) {
        console.error("Error in create log: ", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
});

app.put("/api/logs/:id", async (req,res) => {
    const {id} = req.params;
    const log = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Invalid Log ID ." });
    }
    try {
        const updatedLog = await Log.findByIdAndUpdate(id, log,{new: true});
        res.status(200).json({success: true, data: updatedLog});
    } catch (error) {
        res.status(500).json({success: false, message: "Server error."});
    }
});

app.delete("/api/logs/:id", async (req,res) => {
    const {id} = req.params;
    try {
        await Log.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Log deleted."});
    } catch (error) {
        res.status(404).json({success: false, message: "Product not found."});
        console.log("Error in deleting product: ", error.message);
    }
});

app.listen(5000, () => {
    connectDB();
    console.log("Server started at http://localhost:5000");
});

