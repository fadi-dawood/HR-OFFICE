import { model, Schema } from "mongoose";

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        employee: {
            type: Schema.Types.ObjectId,
            ref: "Employee",
            required: true
        }
    },
    {
        timestamps: true 
    }
);


export default model("Post", postSchema);
