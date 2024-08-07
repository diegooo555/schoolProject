import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    curse: {
        type: String,
        required: true,
    },
    document: {
        type: Number,
        required: true,
        unique: true,
    },
    cel: {
        type: Number,
        required: true,
        unique: true,
    }
});

export default mongoose.model('Student', studentSchema);