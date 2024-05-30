// import { model, Schema } from "mongoose";

// const projectSchema = new Schema(
//     {
//         name: {
//             type: String,
//             required: true,
//             unique: true
//         },
//         description: {
//             type: String,
//             required: true
//         },
//         start_date: {
//             type: Date,
//             required: true
//         },
//         end_date: {
//             type: Date,
//             required: false
//         },
//         budget: {
//             type: Number,
//             required: true,
//             min: 0
//         },
//         status: {
//             type: String,
//             required: true,
//             enum: ["Planned", "In Progress", "Completed", "On Hold", "Cancelled"]
//         },
//         team_members: [{
//             type: Schema.Types.ObjectId,
//             ref: "Employee",
//             required: false
//         }],
//         manager: {
//             type: Schema.Types.ObjectId,
//             ref: "Employee",
//             required: true
//         },
//         client: {
//             type: Schema.Types.ObjectId,
//             ref: "Client",
//             required: true
//         }
//     },
//     {
//         timestamps: true
//     }
// );


// export default model("Project", projectSchema);