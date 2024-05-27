// import { model, Schema } from "mongoose";

// const TrainingSchema = new Schema(
//     {
//         type: {
//             type: String,
//             required: true,
//             enum: ["Course", "Seminary", "Master"]
//         },
//         level: {
//             type: String,
//             required: true,
//             enum: ["Beginner", "Intermediate", "Advanced"]
//         },
//         duration: {
//             type: String,
//             required: true,
//         },
//         method: {
//             type: String,
//             required: true,
//             enum: ["Videos", "Lessons"]
//         },
//         subject: {
//             type: String,
//             required: true,
//             enum: ["Business", "Project Manager", "Civil Engineering", "Structure Engineering", "Information Technology"]
//         },
//         language: {
//             type: String,
//             required: true,
//             enum: ["IT", "EN"]
//         },
//         title: {
//             type: String,
//             required: true,
//         },
//         postedFrom: {
//             type: Schema.Types.ObjectId,
//             ref: "Employee",
//             required: true
//         }
//     },
//     {
//         timestamps: true
//     }
// );


// export default model("Training", TrainingSchema);
