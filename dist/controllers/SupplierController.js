"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class SupplierController {
    async getAllSuppliers(req, res) {
        const userId = Number(req.userId);
        try {
            const suppliers = await prisma.supplier.findMany({
                where: {
                    userId: userId
                }
            });
            return res.status(200).json(suppliers);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: error.message });
        }
    }
    async createSupplier(req, res) {
        const { name, remarks, address } = req.body;
        const userId = Number(req.userId);
        try {
            const supplier = await prisma.supplier.create({
                data: {
                    name,
                    remarks,
                    address,
                    user: { connect: { id: userId } },
                },
            });
            return res.status(201).json(supplier);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async getSupplierById(req, res) {
        const { id } = req.params;
        const userId = Number(req.userId);
        try {
            const supplier = await prisma.supplier.findUnique({
                where: { id: parseInt(id) },
            });
            if (!supplier) {
                return res.status(404).json({ error: 'Supplier not found' });
            }
            if (supplier.userId !== userId)
                return res.status(401).json({ error: 'Unauthorized' });
            return res.json(supplier);
        }
        catch (error) {
            return res.status(500).json({ error: 'Failed to fetch supplier' });
        }
    }
    async updateSupplier(req, res) {
        const { id } = req.params;
        const { name, remarks, address } = req.body;
        const userId = Number(req.userId);
        try {
            const supplier = await prisma.supplier.update({
                where: { id: parseInt(id) },
                data: {
                    name,
                    remarks,
                    address,
                    user: { connect: { id: userId } },
                },
            });
            if (!supplier) {
                return res.status(404).json({ error: 'Supplier not found' });
            }
            if (supplier.userId !== userId)
                return res.status(401).json({ error: 'Unauthorized' });
            return res.json(supplier);
        }
        catch (error) {
            return res.status(400).json({ error: 'Failed to update supplier' });
        }
    }
    async deleteSupplier(req, res) {
        const { id } = req.params;
        const userId = Number(req.userId);
        try {
            const supplier = await prisma.supplier.delete({
                where: { id: parseInt(id) },
            });
            if (!supplier) {
                return res.status(404).json({ error: 'Supplier not found' });
            }
            if (supplier.userId !== userId)
                return res.status(401).json({ error: 'Unauthorized' });
            return res.sendStatus(204);
        }
        catch (error) {
            return res.status(500).json({ error: 'Failed to delete supplier' });
        }
    }
}
exports.SupplierController = SupplierController;
