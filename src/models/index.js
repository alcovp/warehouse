import mongoose from 'mongoose';

export const connectDb = () => {
    return mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost:27017/warehouse', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
        .catch(error => console.error(error));
};