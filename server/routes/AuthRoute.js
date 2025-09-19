import express from "express";
const routerAuth = express.Router();

import {
    registerUser,
    loginUser,
} from "../controller/AuthController.js";

routerAuth.post('/register', registerUser);
routerAuth.post('/login', loginUser);

export default routerAuth;