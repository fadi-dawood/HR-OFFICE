import jwt from "jsonwebtoken";
import Employee from "../models/employee.model.js";

// generate the token
export const generateJWT = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: "30d" },
            (err, token) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(token);
                }
            }
        );
    });
};


//check the token
export const verifyJWT = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(
            token,
            process.env.JWT_SECRET,
            (err, decoded) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(decoded);
                }
            }
        );
    });
};


// Middleware to use in requests that require authorization
export const authMiddleware = async (req, res, next) => {
    try {
        // The token was not provided in the header
        if (!req.headers.authorization) {
            res.status(400).send("login required");

        } else { // The token was provided in the header

            const decoded = await verifyJWT(
                req.headers.authorization.replace("Bearer ", "")
            );

            // Does the token exist? Let's check through its property exp
            if (decoded.exp) {

                delete decoded.iat; //token issued time 
                delete decoded.exp; // token expire time

                const me = await Employee.findOne({
                    ...decoded,
                });

                if (me) {
                    // Adding the user parameter to the request object. req.user will have all the user data directly from the database
                    req.user = me;
                    next();
                } else {
                    res.status(401).send("User not found");
                }
            } else {
                // Invalid token
                res.status(401).send("login required");
            }
        }
    } catch (err) {
        next(err);
    }
};



// Middleware to use in requests that require an admin authorization
export const authAdminMiddleware = async (req, res, next) => {
    try {
       
        // The token was not provided in the header
        if (!req.headers.authorization) {
            res.status(400).send("login required");

        } else { // The token was provided in the header

            const decoded = await verifyJWT(
                req.headers.authorization.replace("Bearer ", "")
            );

            // Does the token exist? Let's check through its property exp
            if (decoded.exp) {

                delete decoded.iat; //token issued time 
                delete decoded.exp; // token expire time
                const me = await Employee.findOne({
                    ...decoded,
                });

                if (me) {
                    console.log(me.isAdmin);
                    if (me.isAdmin) {
                        // Adding the user parameter to the request object. req.user will have all the user data directly from the database
                        req.user = me;
                        next();
                    } else {
                        res.status(400).send("You are not authorized");
                    }
                } else {
                    res.status(401).send("User not found");
                }
            } else {
                // Invalid token
                res.status(401).send("login required");
            }
        }
    } catch (err) {
        next(err);
    }
};