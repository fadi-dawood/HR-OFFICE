import { Router } from "express";
import Employee from "../models/employee.model.js";
import bcrypt from "bcryptjs";
import { verifyJWT } from "../middleware/authMiddleware.js";

const signRoute = Router();


// setting the user password
signRoute.post("/setpassword", async (req, res) => {
    const { token, password } = req.body;
    if (!token || !password) {
        return res.status(400).send('Invalid request');
    }
    try {
        const decoded = verifyJWT(token);
        const userId = decoded.id;

        const hashedPassword = await bcrypt.hash(password, 10);

        if (userId) {
            await Employee.findByIdAndUpdate(userId, { password: hashedPassword });
        } else {
            return res.status(404).send('User not found');
        }

        res.send('Password updated successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});


export default signRoute;