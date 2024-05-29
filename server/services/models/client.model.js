import { model, Schema } from "mongoose";

const clientSchema = new Schema(
    {
        company_name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            match: [/.+\@.+\..+/, "Please enter a valid email address"]
        },
        phone_number: {
            type: String,
            required: true
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
