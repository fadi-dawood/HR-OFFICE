import { model, Schema } from "mongoose";


const resourceSchem = new Schema(
    {
        name: {
            type: String,
            require: true
        },
        type: {
            type: String,
            require: true,
            enum: ["Car", "Meeting room"]
        }
    },
    {
        timestamps: true 
    }
);


export default model("Resource", resourceSchem);