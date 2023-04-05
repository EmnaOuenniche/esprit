import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const EventSchema = new Schema(
    {
        date: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        iduser : {
            type: String,
        },
    },
    {
        timestamps: true
    }
);

const Evenement= mongoose.model("Evenement",EventSchema);
export{Evenement};