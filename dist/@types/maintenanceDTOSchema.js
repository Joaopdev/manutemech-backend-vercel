"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.maintenanceSchema = void 0;
const Yup = __importStar(require("yup"));
exports.maintenanceSchema = Yup.object().shape({
    entry_date: Yup.date().required(),
    exits_date: Yup.date().required(),
    km_vehicle: Yup.number().required().positive().integer(),
    responsible_mechanic: Yup.string().required(),
    maintenance_price: Yup.number().required().positive(),
    remarks: Yup.string(),
    vehicleId: Yup.number().required().positive().integer(),
    parts: Yup.array().of(Yup.object().shape({
        partId: Yup.number().required().positive().integer(),
        price: Yup.number().required().positive(),
        supplierId: Yup.number().required().positive().integer(),
    })),
    services: Yup.array().of(Yup.number().required().positive().integer()),
    workshopId: Yup.number().required().positive().integer(),
});
