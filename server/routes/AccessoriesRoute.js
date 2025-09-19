import express from "express";
const routerAccessories = express.Router();

import {
    getAccessoriessVehicle,
    getAccessoriesVehicle,
    saveAccessoriesVehicle,
    updateAccessoriesVehicle,
    deleteAccessoriesVehicle,
} from "../controller/AccessoriesController.js"

routerAccessories.get('/', getAccessoriessVehicle);
routerAccessories.post('/', saveAccessoriesVehicle);
routerAccessories.get('/:id', getAccessoriesVehicle);
routerAccessories.put('/:id', updateAccessoriesVehicle);
routerAccessories.delete('/:id', deleteAccessoriesVehicle);

export default routerAccessories;