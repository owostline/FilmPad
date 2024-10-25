import mongoose from "mongoose";

const logsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true //createdAt, updatedAt
});

const Log = mongoose.model('Log', logsSchema);

export default Log;