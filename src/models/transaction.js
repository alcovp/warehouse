import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    },
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    },
    quantity: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
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
const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;