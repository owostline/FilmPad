import express from "express";
import dotenv from "dotenv";
import {connectDB} from './config/db.js';
import Log from './models/logs.model.js';

dotenv.config();

const app = express();

app.use(express.json()); //allows to accept JSON data in the req.body

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

console.log(process.env.MONGO_URI);

app.listen(5000, () => {
    connectDB();
    console.log("Server started at http://localhost:5000");
});

