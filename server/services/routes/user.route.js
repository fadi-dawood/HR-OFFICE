import { Router } from "express";
import Employee from "../models/employee.model.js";
import Permission from "../models/permission.model.js";
import Overtime from "../models/overtime.mode.js";
import Refund from "../models/refund.model.js";
import Client from "../models/client.model.js";
import TimeRegister from "../models/TimeRegister.js";
import Post from "../models/posts.model.js";
import Event from "../models/event.model.js";



const userRoute = Router();


//^--------------------------------------------------Get General Data------------------------------------------------//

// Get all the employees
userRoute.get("/employees", async (req, res, next) => {
    try {
        const employees = await Employee.find();
        res.send(employees);
    } catch (err) {
        console.error(err);
        res.status(500);
        next();
    }
});

// Get all the admins
userRoute.get("/admins", async (req, res, next) => {
    try {
        const admins = await Employee.find({ isAdmin: true });
        res.send(admins);
    } catch (err) {
        console.error(err);
        res.status(500);
        next();
    }
});


// get all clients 
userRoute.get("/clients", async (req, res, next) => {
    try {
        let clientsList = [];
        clientsList = await Client.find();
        res.status(201).send(clientsList);
    } catch (err) {
        console.error(err);
        next(err);
    }
});


// get all the posts
userRoute.get('/post', async (req, res, next) => {
    try {
        const posts = await Post.find().populate('employee');

        if (!posts || posts.length === 0) {
            res.status(404).send("No posts are found!");
            return;
        }
        res.status(201).send(posts);
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred while fetching posts.");
    }
});


// get all the events
userRoute.get('/event', async (req, res, next) => {
    try {
        const events = await Event.find();
        if (!events || events.length === 0) {
            res.status(404).send("No posts are found!");
            return;
        }
        res.status(201).send(events);
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred while fetching events.");
    }
});




//^--------------------------------------------------Logged User Data------------------------------------------------//

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




//^--------------------------------------------------Get All Requests------------------------------------------------//

// get alla permissin
userRoute.get("/permission", async (req, res, next) => {
    try {
        const employeeId = req.user.id;
        let permissionList = [];
        if (employeeId) {
            permissionList = await Permission.find({ 'employee': employeeId });
        }
        res.status(201).send(permissionList);
    } catch (err) {
        console.error(err);
        next(err);
    }
});


// get all overtime requests
userRoute.get("/overtime", async (req, res, next) => {
    try {
        const employeeId = req.user.id;
        let overTimeList = [];
        if (employeeId) {
            overTimeList = await Overtime.find({ 'employee': employeeId });
        }
        res.status(201).send(overTimeList);
    } catch (err) {
        console.error(err);
        next(err);
    }
});


// get all Refund requests
userRoute.get("/refund", async (req, res, next) => {
    try {
        const employeeId = req.user.id;
        let refundList = [];
        if (employeeId) {
            refundList = await Refund.find({ 'employee': employeeId });
            res.status(201).send(refundList);
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
});


// get all registered hours
userRoute.get("/hours", async (req, res, next) => {
    try {
        const employeeId = req.user.id;
        const { date } = req.query;
        let timeregisterList = [];
        if (employeeId) {
            if (date) {
                timeregisterList = await TimeRegister.find(
                    {
                        employee: employeeId,
                        date: date
                    }
                ).populate('client'); // also sent all the data of the client
            } else {
                return res.status(400).json({ message: "Date is required." });
            }
            res.status(201).send(timeregisterList);
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
});




//^--------------------------------------------------New Request------------------------------------------------//

// New Permission request
userRoute.post("/permission", async (req, res, next) => {
    try {
        const employeeId = req.user.id;
        const { type, startDate, endDate, startHour, endHour, note } = req.body;

        if (!type || !startDate || !endDate || !startHour || !endHour) {
            return res.status(400).json({ message: "All fields except note are required." });
        }

        const newPermission = new Permission({
            type,
            startDate,
            endDate,
            startHour,
            endHour,
            note,
            state: "Requested",
            employee: employeeId
        });
        await newPermission.save();

        res.status(201).json({ message: "Permission request created successfully.", permission: newPermission });
    } catch (err) {
        console.error(err);
        next(err);
    }
});


// New Overtime request
userRoute.post("/overtime", async (req, res, next) => {
    try {
        const employeeId = req.user.id;
        const { date, hours_number, note } = req.body;

        if (!date || !hours_number) {
            return res.status(400).json({ message: "All fields except note are required." });
        }

        const newovertime = new Overtime({
            date,
            hours_number,
            note,
            state: "Requested",
            employee: employeeId
        });
        await newovertime.save();

        res.status(201).json({ message: "Overtime request created successfully.", overtime: newovertime });
    } catch (err) {
        console.error(err);
        next(err);
    }
});


// New Refund request
userRoute.post("/refund", async (req, res, next) => {
    try {
        const employeeId = req.user.id;
        const { type, expense_date, payment_type, kilometers, note, amount } = req.body;

        if ((!type || !expense_date || !payment_type || !amount) || (type === "KM" && !kilometers) || (type === "Other" && !note)) {
            return res.status(400).json({ message: "All fields except note are required." });
        }

        const newRefund = new Refund({
            type,
            expense_date,
            payment_type,
            kilometers,
            amount,
            note,
            state: "Requested",
            employee: employeeId
        });
        await newRefund.save();

        res.status(201).json({ message: "Overtime request created successfully.", Refund: newRefund });
    } catch (err) {
        console.error(err);
        next(err);
    }
});


// register new hour
userRoute.post("/hours", async (req, res, next) => {
    try {
        const { date, hours_number, client } = req.body;
        if (!date || !hours_number || !client) {
            return res.status(400).json({ message: "Date, hours_number and client are required." });
        }

        const newTimeRegister = new TimeRegister({
            employee: req.user.id,
            date: date,
            hours_number: hours_number,
            client: client
        });

        await newTimeRegister.save();

        res.status(201).send(newTimeRegister);

    } catch (err) {
        console.error(err);
        next(err);
    }
});


// delete a registered hour
userRoute.delete('/hours/:id', async (req, res, next) => {
    try {
        const hourId = req.params.id;

        // Check if the hour exists
        const existingHour = await TimeRegister.findById(hourId);
        if (!existingHour) {
            return res.status(404).json({ message: "Hour not found." });
        }

        // Delete the hour
        await TimeRegister.findByIdAndDelete(hourId);

        res.status(200).json({ message: "Hour deleted successfully." });
    } catch (err) {
        console.error(err);

    }
});


export default userRoute;