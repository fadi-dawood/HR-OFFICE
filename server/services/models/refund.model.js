import { model, Schema } from "mongoose";

const refundSchema = new Schema(
    [
        {
            type: {
                type: String,
                require: true,
                enum: ["Transport", "Hotel", "Dinner", "Lunch", "Car rent", "KM", "Taxi", "Other"]
            },
            expense_date: {
                type: Date,
                require: true
            },
            state: {
                type: String,
                require: true,
                enum: ["Approved", "Requested", "Cancelled", "Not approved"]
            },
            amount: {
                type: Number,
                require: true
            },
            employeeId: {
                type: Schema.Types.ObjectId,
                ref: "Employee",
                required: true
            },
            kilometers: {
                type: Number,
                require: () => {
                    return this.type === "KM" ? true : false;
                }
            },
            payment_type: {
                type: String,
                require: true,
                enum: ["Cash", "Electronic"]
            },
            note: {
                type: String,
                require: false,
            }
        }
    ],
    {
        timestamps: true
    }
);


export default model("Refund", refundSchema);