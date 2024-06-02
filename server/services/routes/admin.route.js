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
import Event  from "../models/event.model.js";

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
adminRoute.post("/client", async (req, res, next) => {
    const { company_name, email, phone_number, country } = req.body;
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

// add new event
adminRoute.post("/event", async (req, res, next) => {
    const { event_name, date, start_at, end_at, organizer, summary } = req.body;
    try {
        if (!event_name || !date || !start_at || !end_at || !organizer || !summary) {
            res.status(400).send("all fields are requiered");
        }
        else {
            const event = new Event({
                event_name,
                date,
                start_at,
                end_at,
                organizer,
                summary
            })
            await event.save();
            res.status(201).send(event);
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// Data extraction - Employee
adminRoute.get('/employee/csv', async (req, res) => {
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


// Data extraction - client
adminRoute.get('/client/csv', async (req, res) => {
    try {
        const clients = await Client.find({});
        const fields = [
            { label: 'Company Name', value: 'company_name' },
            { label: 'Email', value: 'email' },
            { label: 'Phone Number', value: 'phone_number' },
            { label: 'Address', value: 'address' },
            { label: 'Country', value: 'country' }
        ];

        const json2csvParser = new Parser({ fields, delimiter: '|' });
        const csv = json2csvParser.parse(clients);
        console.log(fields);
        res.header('Content-Type', 'text/csv');
        res.attachment('clients.csv');
        res.send(csv);
    } catch (err) {
        console.error('Error fetching clients', err);
        res.status(500).send('Internal Server Error');
    }
});



// Data extraction - overtime
adminRoute.get('/overtime/csv', async (req, res) => {
    try {
        const overtimes = await Overtime.find({}).populate('employee');

        // Flatten the data structure for CSV export
        const flatData = overtimes.map(overtime => ({
            state: overtime.state,
            date: overtime.date,
            hours_number: overtime.hours_number,
            note: overtime.note,

            employee_name: overtime.employee.name,
            employee_last_name: overtime.employee.last_name,
            employee_phone_number: overtime.employee.phone_number,
            employee_department: overtime.employee.department,
            employee_role: overtime.employee.role,
            employee_working_hours: overtime.employee.working_hours,
            employee_contract_type: overtime.employee.contract_type,
            employee_company_mail: overtime.employee.company_mail,
        }));


        const fields = [
            { label: 'State', value: 'state' },
            { label: 'Date', value: 'date' },
            { label: 'Hours Number', value: 'hours_number' },
            { label: 'Note', value: 'note' },

            { label: 'Employee Name', value: 'employee_name' },
            { label: 'Employee Last Name', value: 'employee_last_name' },
            { label: 'Employee Phone Number', value: 'employee_phone_number' },
            { label: 'Employee Department', value: 'employee_department' },
            { label: 'Employee Role', value: 'employee_role' },
            { label: 'Employee Working Hours', value: 'employee_working_hours' },
            { label: 'Employee Contract Type', value: 'employee_contract_type' },
            { label: 'Employee Company Mail', value: 'employee_company_mail' },
        ];

        const json2csvParser = new Parser({ fields, delimiter: '|' });
        const csv = json2csvParser.parse(flatData);
        res.header('Content-Type', 'text/csv');
        res.attachment('overtimes.csv');
        res.send(csv);
    } catch (err) {
        console.error('Error fetching overtimes', err);
        res.status(500).send('Internal Server Error');
    }
});


// Data extraction - permission
adminRoute.get('/permission/csv', async (req, res) => {
    try {
        const permissions = await Permission.find({}).populate('employee');

        // Flatten the data structure for CSV export
        const flatData = permissions.map(permission => ({
            type: permission.type,
            startDate: permission.startDate.getDate() + "-" + permission.startDate.getMonth() + "-" + permission.startDate.getFullYear(),
            endDate: permission.endDate.getDate() + "-" + permission.endDate.getMonth() + "-" + permission.endDate.getFullYear(),
            startHour: permission.startHour,
            endHour: permission.endHour,
            state: permission.state,
            note: permission.note,

            employee_name: permission.employee.name,
            employee_last_name: permission.employee.last_name,
            employee_phone_number: permission.employee.phone_number,
            employee_department: permission.employee.department,
            employee_role: permission.employee.role,
            employee_working_hours: permission.employee.working_hours,
            employee_contract_type: permission.employee.contract_type,
            employee_company_mail: permission.employee.company_mail,
        }));


        const fields = [
            { label: 'Type', value: 'type' },
            { label: 'Start Date', value: 'startDate' },
            { label: 'End Date', value: 'endDate' },
            { label: 'Start Hour', value: 'startHour' },
            { label: 'End Hour', value: 'endHour' },
            { label: 'State', value: 'state' },
            { label: 'Note', value: 'note' },

            { label: 'Employee Name', value: 'employee_name' },
            { label: 'Employee Last Name', value: 'employee_last_name' },
            { label: 'Employee Phone Number', value: 'employee_phone_number' },
            { label: 'Employee Department', value: 'employee_department' },
            { label: 'Employee Role', value: 'employee_role' },
            { label: 'Employee Working Hours', value: 'employee_working_hours' },
            { label: 'Employee Contract Type', value: 'employee_contract_type' },
            { label: 'Employee Company Mail', value: 'employee_company_mail' },
        ];

        const json2csvParser = new Parser({ fields, delimiter: '|' });
        const csv = json2csvParser.parse(flatData);
        res.header('Content-Type', 'text/csv');
        res.attachment('permissions.csv');
        res.send(csv);
    } catch (err) {
        console.error('Error fetching permissions', err);
        res.status(500).send('Internal Server Error');
    }
});



// Data extraction - refund
adminRoute.get('/refund/csv', async (req, res) => {
    try {
        const refunds = await Refund.find({}).populate('employee');

        // Flatten the data structure for CSV export
        const flatData = refunds.map(refund => ({
            type: refund.type,
            expense_date: refund.expense_date.getDate() + "-" + refund.expense_date.getMonth() + "-" + refund.expense_date.getFullYear(),
            state: refund.state,
            amount: refund.amount,
            kilometers: refund.kilometers,
            payment_type: refund.payment_type,
            note: refund.note,

            employee_name: refund.employee.name,
            employee_last_name: refund.employee.last_name,
            employee_phone_number: refund.employee.phone_number,
            employee_department: refund.employee.department,
            employee_role: refund.employee.role,
            employee_working_hours: refund.employee.working_hours,
            employee_contract_type: refund.employee.contract_type,
            employee_company_mail: refund.employee.company_mail,
        }));


        const fields = [
            { label: 'Type', value: 'type' },
            { label: 'Expense Date', value: 'expense_date' },
            { label: 'State', value: 'state' },
            { label: 'Amount', value: 'amount' },
            { label: 'Kilometers', value: 'kilometers' },
            { label: 'Payment Type', value: 'payment_type' },
            { label: 'Note', value: 'note' },

            { label: 'Employee Name', value: 'employee_name' },
            { label: 'Employee Last Name', value: 'employee_last_name' },
            { label: 'Employee Phone Number', value: 'employee_phone_number' },
            { label: 'Employee Department', value: 'employee_department' },
            { label: 'Employee Role', value: 'employee_role' },
            { label: 'Employee Working Hours', value: 'employee_working_hours' },
            { label: 'Employee Contract Type', value: 'employee_contract_type' },
            { label: 'Employee Company Mail', value: 'employee_company_mail' },
        ];

        const json2csvParser = new Parser({ fields, delimiter: '|' });
        const csv = json2csvParser.parse(flatData);
        res.header('Content-Type', 'text/csv');
        res.attachment('refund.csv');
        res.send(csv);
    } catch (err) {
        console.error('Error fetching refund', err);
        res.status(500).send('Internal Server Error');
    }
});



// Data extraction - timeregister
adminRoute.get('/timeregister/csv', async (req, res) => {
    try {
        const timeregisters = await TimeRegister.find({}).populate('employee').populate('client');

        // Flatten the data structure for CSV export
        const flatData = timeregisters.map(timeregister => ({
            date: timeregister.date.getDate() + "-" + timeregister.date.getMonth() + "-" + timeregister.date.getFullYear(),
            hours_number: timeregister.hours_number,

            client_company_name: timeregister.client.company_name,
            client_email: timeregister.client.email,

            employee_name: timeregister.employee.name,
            employee_last_name: timeregister.employee.last_name,
            employee_phone_number: timeregister.employee.phone_number,
            employee_department: timeregister.employee.department,
            employee_role: timeregister.employee.role,
            employee_working_hours: timeregister.employee.working_hours,
            employee_contract_type: timeregister.employee.contract_type,
            employee_company_mail: timeregister.employee.company_mail,
        }));


        const fields = [
            { label: 'Date', value: 'date' },
            { label: 'Hours Numbe', value: 'hours_number' },

            { label: 'Client', value: 'client_company_name' },
            { label: 'Client Email', value: 'client_email' },

            { label: 'Employee Name', value: 'employee_name' },
            { label: 'Employee Last Name', value: 'employee_last_name' },
            { label: 'Employee Phone Number', value: 'employee_phone_number' },
            { label: 'Employee Department', value: 'employee_department' },
            { label: 'Employee Role', value: 'employee_role' },
            { label: 'Employee Working Hours', value: 'employee_working_hours' },
            { label: 'Employee Contract Type', value: 'employee_contract_type' },
            { label: 'Employee Company Mail', value: 'employee_company_mail' },
        ];

        const json2csvParser = new Parser({ fields, delimiter: '|' });
        const csv = json2csvParser.parse(flatData);
        res.header('Content-Type', 'text/csv');
        res.attachment('refund.csv');
        res.send(csv);
    } catch (err) {
        console.error('Error fetching refund', err);
        res.status(500).send('Internal Server Error');
    }
});



export default adminRoute;