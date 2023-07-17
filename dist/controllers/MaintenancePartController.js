"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaintenancePartController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class MaintenancePartController {
    async createMaintenancePart(req, res) {
        const { maintenanceId, partId, supplierId, price } = req.body;
        try {
            const maintenancePart = await prisma.maintenancePart.create({
                data: {
                    maintenance: { connect: { id: maintenanceId } },
                    part: { connect: { id: partId } },
                    supplier: { connect: { id: supplierId } },
                    price,
                },
                include: {
                    maintenance: true,
                    part: true,
                    supplier: true,
                },
            });
            return res.status(201).json(maintenancePart);
        }
        catch (error) {
            return res.status(400).json({ error: 'Failed to create maintenance part' });
        }
    }
    async getMaintenancePartById(req, res) {
        const { id } = req.params;
        try {
            const maintenancePart = await prisma.maintenancePart.findUnique({
                where: { id: parseInt(id) },
                include: {
                    maintenance: true,
                    part: true,
                    supplier: true,
                },
            });
            if (!maintenancePart) {
                return res.status(404).json({ error: 'Maintenance part not found' });
            }
            return res.json(maintenancePart);
        }
        catch (error) {
            return res.status(500).json({ error: 'Failed to fetch maintenance part' });
        }
    }
    async updateMaintenancePart(req, res) {
        const { id } = req.params;
        const { maintenanceId, partId, supplierId, price } = req.body;
        try {
            const updatedMaintenancePart = await prisma.maintenancePart.update({
                where: { id: parseInt(id) },
                data: {
                    maintenance: { connect: { id: maintenanceId } },
                    part: { connect: { id: partId } },
                    supplier: { connect: { id: supplierId } },
                    price,
                },
                include: {
                    maintenance: true,
                    part: true,
                    supplier: true,
                },
            });
            if (!updatedMaintenancePart) {
                return res.status(404).json({ error: 'Maintenance part not found' });
            }
            return res.json(updatedMaintenancePart);
        }
        catch (error) {
            return res.status(400).json({ error: 'Failed to update maintenance part' });
        }
    }
    async deleteMaintenancePart(req, res) {
        const { id } = req.params;
        try {
            const success = await prisma.maintenancePart.delete({
                where: { id: parseInt(id) },
            });
            if (!success) {
                return res.status(404).json({ error: 'Maintenance part not found' });
            }
            return res.sendStatus(204);
        }
        catch (error) {
            return res.status(500).json({ error: 'Failed to delete maintenance part' });
        }
    }
}
exports.MaintenancePartController = MaintenancePartController;
