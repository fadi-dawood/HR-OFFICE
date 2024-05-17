import { Router } from "express";
import Employee from "../models/employee.model.js";
import bcrypt from "bcryptjs";
import { verifyJWT } from "../middleware/authMiddleware.js";
import { setPasswordMail } from "../mail/setPassword.mail.js";

const userRoute = Router();

// Get all the employees
userRoute.get("/", async (req, res, next) => {
    try {
        const employees = await Employee.find();
        res.send(employees);
    } catch (err) {
        console.error(err);
        res.state(500);
        next();
    }
});


// Get the logged spesific employee
userRoute.get("/me", async (req, res, next) => {
    try {
        let employee = await Employee.findById(req.user._id);
        if (employee) {
            delete employee.password;
            res.send(employee);
        } else {
            res.state(404).send("User not found!")
        }
    } catch (err) {
        console.error(err);
        res.state(500);
        next();
    }
});


// Post a new Employee profile
userRoute.post("/newemployee", async (req, res, next) => {
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


export default userRoute;