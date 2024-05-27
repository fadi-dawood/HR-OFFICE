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
import Post from "../models/posts.model.js";
import { Parser } from 'json2csv';

const adminRoute = Router();

// Post a new Employee profile
adminRoute.post("/newemployee", async (req, res, next) => {
    try {
        const chosenMail = req.body.mail;

        const isEmailAviable = await Employee.findOne({
            company_mail: chosenMail
        });

        if (isEmailAviable) {
            res.status(400).send("company mail is not aviable");
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
        res.status(500);
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


// add new client
adminRoute.post("/post", async (req, res, next) => {
    const { title, content } = req.body;
    try {
        if (!title || !content) {
            res.status(400).send("title and content are requiered fields to be filled");
        }
        else {
            const post = new Post({
                title,
                content,
                employee: req.user._id
            })
            await post.save();
            res.status(201).send(post);
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
});


adminRoute.get('/employees/csv', async (req, res) => {
    console.log("employees");
    try {
        const employees = await Employee.find({});
        const fields = [
            { label: 'Name', value: 'name' },
            { label: 'Family name', value: 'last_name' },
            { label: 'Personal Email', value: 'personal_mail' },
            { label: 'Date of birth', value: 'date_of_birth' },
            { label: 'Phone Number', value: 'phone_number' },
            { label: 'Gender', value: 'gender' },
            { label: 'Birth Place', value: 'birth_place' },
            { label: 'Nationality', value: 'nationality' },
            { label: 'Residency permit number', value: 'residency_permit_number' },
            { label: 'ID Number', value: 'identity_card_number' },
            { label: 'Tax ID', value: 'tax_id' },
            { label: 'State of Residence', value: 'residence.state' },
            { label: 'Region of Residence', value: 'residence.region' },
            { label: 'City of residence', value: 'residence.city' },
            { label: 'Residence Street', value: 'residence.street' },
            { label: 'House number', value: 'residence.house_number' },
            { label: 'CAP', value: 'residence.cap_number' },
            { label: 'Hire date', value: 'hire_date' },
            { label: 'Department', value: 'department' },
            { label: 'Salary', value: 'salary' },
            { label: 'Contractual Level', value: 'contract_level' },
            { label: 'Role', value: 'role' },
            { label: 'Working hours', value: 'working_hours' },
            { label: 'Type of Contract', value: 'contract_type' },
            { label: 'Expiration of the Contract', value: 'contract_expiry' },
            { label: 'Company Email', value: 'company_mail' },
            { label: 'Is Admin', value: 'isAdmin' }
        ];

        const json2csvParser = new Parser({ fields, delimiter: '|' });
        const csv = json2csvParser.parse(employees);
        console.log(fields);
        res.header('Content-Type', 'text/csv');
        res.attachment('employees.csv');
        res.send(csv);
    } catch (err) {
        console.error('Error fetching employees', err);
        res.status(500).send('Internal Server Error');
    }
});


export default adminRoute;