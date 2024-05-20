import { model, Schema } from "mongoose";

const overtimeSchema = new Schema(
    [
        {
            state: {
                type: String,
                require: true,
                enum: ["Approved", "Requested", "Cancelled", "Not approved"]
            },
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
            note: {
                type: String,
                require: true
            }
        }
    ],
    {
        timestamps: true
    }
);


export default model("Overtime", overtimeSchema);