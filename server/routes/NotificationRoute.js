import express from "express";
const routerNotification = express.Router();

import {
    sendEmail
} from "../services/emailService.js"

routerNotification.get('/', sendEmail);

export default routerNotification;