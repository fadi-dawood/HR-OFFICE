import { model, Schema } from "mongoose";

const clientSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+\@.+\..+/, "Please enter a valid email address"]
        },
        phone_number: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: false
        },
        country: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true 
    }
);


export default model("Client", clientSchema);
