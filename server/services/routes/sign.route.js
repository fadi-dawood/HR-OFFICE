import { Router } from "express";
import Employee from "../models/employee.model.js";
import bcrypt from "bcryptjs";
import { generateJWT, verifyJWT } from "../middleware/authMiddleware.js";

const signRoute = Router();


// setting the user password
signRoute.post("/setpassword", async (req, res) => {
    const { token, password } = req.body;
    if (!token || !password) {
        return res.status(400).send('Invalid request');
    }
    try {
        const decoded = await verifyJWT(token);
        const userId = decoded.id;
        if (userId) {
            const hashedPassword = await bcrypt.hash(password, 10);
            await Employee.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true });
        } else {
            return res.status(404).send('User not found');
        }

        res.send('Password updated successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});


// login
signRoute.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (email && password) {
            const foundUser = await Employee.findOne({ company_mail: email });
            if (foundUser) {
                const isPasswordMatching = await bcrypt.compare(password, foundUser.password);
                if (isPasswordMatching) {
                    const token = await generateJWT({ _id: foundUser._id });
                    res.status(200).send({ user: foundUser, token: token });
                } else {
                    res.status(400).send("Password is not correct!")
                }
            } else {
                res.status(404).send("User not found!")
            }
        } else {
            res.status(400).send("Bad request, you should send email and password")
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
});
export default signRoute;