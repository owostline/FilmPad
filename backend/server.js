import express from "express";
import dotenv from "dotenv";
import {connectDB} from './config/db.js';
import logsRoutes from "./routes/logs.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json()); //allows to accept JSON data in the req.body

app.use("/api/logs", logsRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT);
});

