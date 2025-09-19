import express from "express";
const routerTenant = express.Router();

import {
    getTenantsVehicle,
    getTenantVehicle,
    saveTenantVehicle,
    updateTenantVehicle,
    deleteTenantVehicle,
} from "../controller/TenantController.js";

routerTenant.get('/', getTenantsVehicle);
routerTenant.post('/', saveTenantVehicle);
routerTenant.get('/:id', getTenantVehicle);
routerTenant.put('/:id', updateTenantVehicle);
routerUnits.delete('/:id', deleteTenantVehicle);

export default routerTenant;