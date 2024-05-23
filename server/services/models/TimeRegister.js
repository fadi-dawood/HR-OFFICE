import { model, Schema } from "mongoose";

const timeRegisterSchema = new Schema(
    {
        employeeId: {
            type: Schema.Types.ObjectId,
            ref: "Employee",
            required: true
        },
        date: {
            type: Date,
            require: true
        },
        hours_number: {
            type: Number,
            require: true
        },
        client: {
            type: Schema.Types.ObjectId,
            ref: "Client",
            required: true
        }
    },
    {
        timestamps: true
    }
);


export default model("TimeRegister", timeRegisterSchema);