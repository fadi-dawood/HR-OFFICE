import { Router } from "express";
import Employee from "../models/employee.model.js";
import Permission from "../models/permission.model.js";
import bcrypt from "bcryptjs";
import { verifyJWT } from "../middleware/authMiddleware.js";
import { setPasswordMail } from "../mail/setPassword.mail.js";
import Overtime from "../models/overtime.mode.js";
import Refund from "../models/refund.model.js";
import Client from "../models/client.model.js";

const adminRoute = Router();


// Post a new Employee profile
adminRoute.post("/newemployee", async (req, res, next) => {
    try {
        const chosenMail = req.body.mail;

        const isEmailAviable = await Employee.findOne({
            company_mail: chosenMail
        });

        if (isEmailAviable) {
            res.status(400).send("user name is not aviable");
            return;
        } else {
            const employee = await Employee.create({
                ...req.body
            });

            await setPasswordMail(employee);

            res.status(200).send("Employee created successfully");
        }
    } catch (err) {
        console.error(err);
        next();
    }
});

// add new client
adminRoute.post("/clients", async (req, res, next) => {
    const { company_name, email, phone_number, address, country } = req.body;
    try {
        if (!company_name || !email || !phone_number) {
            res.status(400).send("Name, Email and phone number are requiered fields to be filled");
        }
        else {
            if (Client.findOne({ "company_name": company_name })) {
                const client = new Client({
                    company_name,
                    email,
                    phone_number,
                    address,
                    country
                })
                await client.save();
                res.status(201).send(client);
            } else {
                res.status(400).send("customer already present in the DataBase");
            }
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
});

export default adminRoute;