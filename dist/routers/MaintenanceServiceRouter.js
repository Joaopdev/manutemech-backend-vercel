"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MaintenanceServiceController_1 = require("../controllers/MaintenanceServiceController");
const authenticationMiddleware_1 = require("../middlewares/authenticationMiddleware");
const router = express_1.default.Router();
const maintenanceServiceController = new MaintenanceServiceController_1.MaintenanceServiceController();
router.post('/maintenance-services', authenticationMiddleware_1.authenticate, maintenanceServiceController.createMaintenanceService);
router.get('/maintenance-services/:id', authenticationMiddleware_1.authenticate, maintenanceServiceController.getMaintenanceServicesByMaintenanceId);
router.put('/maintenance-services/:id', authenticationMiddleware_1.authenticate, maintenanceServiceController.updateMaintenanceService);
router.delete('/maintenance-services/:id', authenticationMiddleware_1.authenticate, maintenanceServiceController.deleteMaintenanceService);
exports.default = router;
