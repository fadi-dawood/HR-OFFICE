import { Router } from "express";
import Employee from "../models/employee.model.js";
import Permission from "../models/permission.model.js";
import bcrypt from "bcryptjs";
import { verifyJWT } from "../middleware/authMiddleware.js";
import { setPasswordMail } from "../mail/setPassword.mail.js";
import Overtime from "../models/overtime.mode.js";
import Refund from "../models/refund.model.js";
import Client from "../models/client.model.js";
import TimeRegister from "../models/TimeRegister.js";

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



// get all new permission requests for all users:
adminRoute.get("/permission", async (req, res, next) => {
    try {
        const requestedPermissions = await Permission.find({
            state: "Requested"
        }).populate('employee'); // also sent all the data of the employee;

        res.send(requestedPermissions);

    } catch (err) {
        console.log(err);
    }
});



// approve/reject a permission:
adminRoute.put("/permission/:id", async (req, res, next) => {
    const permissionId = req.params.id;
    if (permissionId) {
        const { state } = req.body;
        if (state) {

            try {
                const permission = await Permission.findById(permissionId)
                if (permission) {

                    const permissionToUpdate = await Permission.findByIdAndUpdate(permissionId,
                        { state: state },
                        { new: true }
                    )

                    res.send(permissionToUpdate);

                } else {
                    res.status(404).send("permission request is not found");
                }
            } catch (err) {
                console.log(err);
            }

        } else {
            res.status(400).send("satte is requiered");
        }
    } else {
        res.status(404).send("permission request is not found");
    }
});


// get all new overtime requests for all users:
adminRoute.get("/overtime", async (req, res, next) => {
    try {
        const requestedOvertime = await Overtime.find({
            state: "Requested"
        }).populate('employee'); // also sent all the data of the employee;

        res.send(requestedOvertime);

    } catch (err) {
        console.log(err);
    }
});


// approve/reject a overtime request:
adminRoute.put("/overtime/:id", async (req, res, next) => {
    const overtimeId = req.params.id;
    if (overtimeId) {
        const { state } = req.body;
        if (state) {

            try {
                const overtime = await Overtime.findById(overtimeId)
                if (overtime) {

                    const overtimeToUpdate = await Overtime.findByIdAndUpdate(overtimeId,
                        { state: state },
                        { new: true }
                    )

                    res.send(overtimeToUpdate);

                } else {
                    res.status(404).send("overtime request is not found");
                }
            } catch (err) {
                console.log(err);
            }

        } else {
            res.status(400).send("state is requiered");
        }
    } else {
        res.status(404).send("overtime request is not found");
    }
});



// get all new refund requests for all users:
adminRoute.get("/refund", async (req, res, next) => {
    try {
        const requestedRefund = await Refund.find({
            state: "Requested"
        }).populate('employee'); // also sent all the data of the employee;

        res.send(requestedRefund);

    } catch (err) {
        console.log(err);
    }
});


// approve/reject a refund request:
adminRoute.put("/refund/:id", async (req, res, next) => {
    const refundId = req.params.id;
    if (refundId) {
        const { state } = req.body;
        if (state) {

            try {
                const refund = await Refund.findById(refundId)
                if (refund) {

                    const refundToUpdate = await Refund.findByIdAndUpdate(refundId,
                        { state: state },
                        { new: true }
                    )

                    res.send(refundToUpdate);

                } else {
                    res.status(404).send("overtime request is not found");
                }
            } catch (err) {
                console.log(err);
            }

        } else {
            res.status(400).send("state is requiered");
        }
    } else {
        res.status(404).send("overtime request is not found");
    }
});
export default adminRoute;