// import { model, Schema } from "mongoose";


// const resourceSchem = new Schema(
//     {
//         name: {
//             type: String,
//             require: true
//         },
//         type: {
//             type: String,
//             require: true,
//             enum: ["Car", "Meeting room"]
//         },
//         date_of_buying: {
//             type: Date,
//             require: () => {
//               return  this.typy === "Car" ? true : false;
//             }
//         },
//         matriculation: {
//             type: Date,
//             require: () => {
//               return  this.typy === "Car" ? true : false;
//             }
//         },
//     },
//     {
//         timestamps: true 
//     }
// );


// export default model("Resource", resourceSchem);