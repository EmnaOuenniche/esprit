import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        iduser : {
            type: String,
        },
        status: {
            type: Boolean,
        }
    },
    {
        timestamps: true
    }
);

export default model('User', userSchema);