import mongoose from 'mongoose';
const { Schema, model } = mongoose;



const CommentSchema = new Schema(
    {
      commentAuthor: {
        type: String,
        required: true,
      },
      commentContent: {
        type: String,
        required: true,
      },
    },
    /*{
      timestamps: true,
    }*/
  );



const NewsSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        content : {
            type: String,
            required: true
        },
        author : {
            type: String,
            required: true
        },
        iduser: {
            type: String,
        },
        imageUrl: {
            type: String,
            required: true
        },
        comment: [CommentSchema],
    },
    {
        timestamps: true   
    }
);

const News= mongoose.model("News",NewsSchema);
export{News};