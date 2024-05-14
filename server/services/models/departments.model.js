import { model, Schema } from "mongoose";

const departmentsSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true // Nome del dipartimento deve essere unico
        },
        manager: {
            type: Schema.Types.ObjectId,
            ref: "Employee",
            required: true // ID del manager del dipartimento
        },
        employees: [{
            type: Schema.Types.ObjectId,
            ref: "Employee"
        }],
        budget: {
            type: Number,
            required: true,
            min: 0 // Il budget non può essere negativo
        },
    },
    {
        timestamps: true 
    }
);


export default model("Departments", departmentsSchema);