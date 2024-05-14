import { Schema, model } from "mongoose";

const personalInfoSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    last_name: {
        type: String,
        require: true
    },
    personal_mail: {
        type: String,
        require: true,
        match: [/.+\@.+\..+/, "Please enter a valid email address"]
    },
    date_of_birth: {
        type: Date,
        require: true
    },
    phone_number: {
        type: String,
        require: true
    },
    residence: {
        state: {
            type: String,
            require: true
        },
        region: {
            type: String,
            require: true
        },
        city: {
            type: String,
            require: true
        },
        street: {
            type: String,
            require: true
        },
        house_number: {
            type: Number,
            require: true
        },
        cap_number: {
            type: Number,
            require: true
        }
    },
    gender: {
        type: String,
        require: true,
        enum: ["Male", "Female", "Other"]
    },
    birth_place: {
        type: String,
        require: true
    },
    nationality: {
        type: String,
        require: true
    },
    residency_permit_number: {
        type: String,
        require: function () {
            return this.nationality !== "Italy";
        }
    },
    identity_card_number: {
        type: String,
        require: true
    },
    tax_id: {
        type: String,
        require: true
    }
});

const contractInfoSchema = new Schema({
    hire_date: {
        type: Date,
        require: true
    },
    department: {
        type: String,
        require: true
    },
    salary: {
        type: Number,
        require: true
    },
    contract_level: {
        type: String,
        require: true
    },
    role: {
        type: String,
        require: true
    },
    working_hours: {
        type: String,
        require: true
    },
    contract_type: {
        type: String,
        require: true,

    },
    contract_expiry: {
        type: Date,
        require: true
    }
});

const employeeSchema = new Schema(
    {
        personal_info: {
            type: personalInfoSchema,
            require: true
        },
        contract_info: {
            type: contractInfoSchema,
            required: true
        }
    },
    {
        timestamps: true 
    }
);

export default model("Employee", employeeSchema);