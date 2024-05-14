import { model, Schema } from "mongoose";

const resourceBookingSchema = new Schema(
    {
        resource_ID: {
            type: String,
            require: true
        },
        duration: {
            start: {
                type: Date,
                require: true
            },
            end: {
                type: Date,
                require: true
            }
        },
        state: {
            type: String,
            require: true,
            enum: ["Approved", "requested", "Cancelled","Not approved"]
        },
        reason:{
            type: String,
            require: true
        },
        booked_by:{
            type: Schema.Types.ObjectId,
            ref: "Employee",
            required: true
        },
        note:{
            type: String,
            require: true
        }
    },
    {
        timestamps: true 
    }
);


export default model("Resource_Booking", resourceBookingSchema);