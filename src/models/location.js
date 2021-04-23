import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    project : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});
const Location = mongoose.model('Location', locationSchema);

export default Location;