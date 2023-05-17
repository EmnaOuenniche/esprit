import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const EventSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        image: {
            type: String,
            //required: true
        },
        date: {
            type: String,
            required: true
        },
        organizer: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
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
