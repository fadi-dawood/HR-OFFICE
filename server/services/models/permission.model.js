import { model, Schema } from "mongoose";

const permissionSchema = new Schema(
    {
        type: {
            type: String,
            require: true,
            enum: ["Day off", "Permission", "Sikness", "Maternity", "Widding", "Son's sikness"]
        },
        duration: {
            start: {
                type: Date,
                require: true
            },
            End: {
                type: Date,
                require: true
            }
        },
        note: {
            type: String,
            require: false,
        },
        state: {
            type: String,
            require: true,
            enum: ["Approved", "requested", "Cancelled", "Not approved"]
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