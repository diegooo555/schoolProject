import mongoose, { trusted }  from "mongoose";

const computerSquema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    placeDetail: {
        type: String,
        required: true,
    },
    hall: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    lastModification: {
        type: String,
        required: true,
    },
    mandated: {
        type: String,
        required: true,
    }
});

export default mongoose.model('Computer', computerSquema);