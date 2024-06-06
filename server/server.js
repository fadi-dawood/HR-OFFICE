import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { authAdminMiddleware, authMiddleware } from "./services/middleware/authMiddleware.js";
import userRoute from "./services/routes/user.route.js";
import signRoute from "./services/routes/sign.route.js";
import adminRoute from "./services/routes/admin.route.js";



// load variables from .env
config();

// create an express application called app (server creation)
const app = express();

// Enable CORS for all sources
app.use(cors());

// Enable CORS only for a specific set of sources
app.use(cors({
    origin: true
}));

// communications in json
app.use(express.json());

// Import routes:
app.use("/user", authMiddleware, userRoute);
app.use("/admin", authAdminMiddleware, adminRoute);
app.use("/sign", signRoute);


// Function to initialize the server
const inittserver = async () => {
    try {
        // We are waiting to connect to the database
        await mongoose.connect(process.env.DBCONNECTION);

        // Enable server
        app.listen(process.env.PORT, () => {
            console.log(`Example app listening on port ${process.env.PORT}`)
        })
    } catch (err) {
        console.error(err)
    }
}

// We call the function to initialize the server
inittserver();