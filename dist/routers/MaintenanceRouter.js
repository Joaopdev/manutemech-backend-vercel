"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MaintenanceController_1 = __importDefault(require("../controllers/MaintenanceController"));
const authenticationMiddleware_1 = require("../middlewares/authenticationMiddleware");
const router = (0, express_1.Router)();
const maintenanceController = new MaintenanceController_1.default();
router.get('/maintenances', authenticationMiddleware_1.authenticate, maintenanceController.getAllMaintenances);
router.post('/maintenances', authenticationMiddleware_1.authenticate, maintenanceController.createMaintenance);
router.get('/maintenances/:id', authenticationMiddleware_1.authenticate, maintenanceController.getMaintenanceById);
router.get('/maintenances/vehicle/:vehicleId', authenticationMiddleware_1.authenticate, maintenanceController.getMaintenanceByVehicle);
router.put('/maintenances/:id', authenticationMiddleware_1.authenticate, maintenanceController.updateMaintenance);
router.delete('/maintenances/:id', authenticationMiddleware_1.authenticate, maintenanceController.deleteMaintenance);
exports.default = router;
