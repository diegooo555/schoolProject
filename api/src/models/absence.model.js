import mongoose from "mongoose";

const absenceSquema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    curse: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    }
});

export default mongoose.model('Absence', absenceSquema);