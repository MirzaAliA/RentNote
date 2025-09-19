import express from "express";
const routerUnits = express.Router();

import {
    getUnitVehicle,
    getUnitsVehicle,
    saveUnitVehicle,
    updateUnitVehicle,
    deleteUnitVehicle,
} from "../controller/UnitController.js";

routerUnits.get('/', getUnitsVehicle);
routerUnits.post('/', saveUnitVehicle);
routerUnits.get('/:id', getUnitVehicle);
routerUnits.put('/:id', updateUnitVehicle);
routerUnits.delete('/:id', deleteUnitVehicle);

export default routerUnits;