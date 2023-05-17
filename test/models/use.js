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
        },
        
    otp: {

        type: Number,
        default: 0
      }
    },
    {
        timestamps: true
    }
);

export default model('User', userSchema);