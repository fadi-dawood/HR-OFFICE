import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { authAdminMiddleware, authMiddleware } from "./services/middleware/authMiddleware.js";
import userRoute from "./services/routes/user.route.js";
import signRoute from "./services/routes/sign.route.js";
import adminRoute from "./services/routes/admin.route.js";

// caricare le variabili da .env
config();

// creare un'applicazione express chiamata app (creazione server)
const app = express();

// Abilita CORS per tutte le origini
app.use(cors());

// Abilita CORS solo per un set specifico di origini
app.use(cors({
    origin: true
}));

// comunicazioni in json
app.use(express.json());

// Importa routes:
app.use("/user", authMiddleware, userRoute);
app.use("/admin", authAdminMiddleware, adminRoute);
app.use("/sign", signRoute);


// Funzione per inizializzare il server
const inittserver = async () => {
    try {
        // Aspettiamo di connetterci al database
        await mongoose.connect(process.env.DBCONNECTION);

        // Abilita server
        app.listen(process.env.PORT, () => {
            console.log(`Example app listening on port ${process.env.PORT}`)
        })
    } catch (err) {
        console.error(err)
    }
}

// Invochiamo la funzione per inizializzare il server
inittserver();