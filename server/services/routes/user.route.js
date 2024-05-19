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
        res.status(500);
        next();
    }
});


// Get the logged spesific employee
userRoute.get("/me", async (req, res, next) => {
    try {
        const findUser = await Employee.findById(req.user._id);
        if (findUser) {
            let userObject = findUser.toObject();
            delete userObject.password;
            res.send(userObject);
        } else {
            res.state(404).send("User not found!")
        }
    } catch (err) {
        console.error(err);
        res.status(500);
        next();
    }
});


// Modify the data of user
userRoute.put("/modify", async (req, res, next) => {
    try {
        const userId = req.user._id;
        const updates = req.body;

        const findUser = await Employee.findById(userId);

        if (findUser) {
            const updateUser = await Employee.findByIdAndUpdate(userId, updates, { new: true });

            if (!updateUser) {
                return res.status(400).send("Bad Request");
            }

            res.status(200).json(updateUser);
        } else {
            res.status(404).send("User not found!");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
        next(err);
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