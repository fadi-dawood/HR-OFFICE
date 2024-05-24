import { model, Schema } from "mongoose";

const permissionSchema = new Schema(
    {
        
        type: {
            type: String,
            required: true,
            enum: ["Day Off", "Permission", "Sickness", "Maternity", "Wedding", "Child's Sickness"]
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        },
        startHour: {
            type: String,
            required: true
        },
        endHour: {
            type: String,
            required: true
        },
        note: {
            type: String,
            required: false
        },
        state: {
            type: String,
            required: true,
            enum: ["Approved", "Requested", "Cancelled", "Rejected"]
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


export default model("Permission", permissionSchema);