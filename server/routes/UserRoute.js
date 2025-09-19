import express from "express";
const routerUser = express.Router();

import {
    getUsersVehicle,
    getUserVehicle,
    saveUserVehicle,
    updateUserVehicle,
    deleteUserVehicle,
} from "../controller/UserController.js";

routerUser.get('/', getUsersVehicle);
routerUser.post('/', saveUserVehicle);
routerUser.get('/:id', getUserVehicle);
routerUser.put('/:id', updateUserVehicle);
routerUser.delete('/:id', deleteUserVehicle);

export default routerUser;