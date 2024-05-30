import { model, Schema } from "mongoose";

const EventsSchema = new Schema(
    {
        event_name: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        start_at: {
            type: String,
            required: true,
        },
        end_at: {
            type: String,
            required: true,
        },
        organizer: {
            type: String,
            required: true
        },
        summary: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);


export default model("Event", EventsSchema);
