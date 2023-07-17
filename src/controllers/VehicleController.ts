import { Request, Response } from "express";
import { PrismaClient, Vehicle } from "@prisma/client";
import { AuthenticatedRequest } from "../@types/controllers/AuthenticatedRequest";

const prisma = new PrismaClient();

export class VehicleController {
    async getAllVehicles(req: AuthenticatedRequest, res: Response): Promise<Response> {
        const userId = Number(req.userId)
        try {
            const vehicles = await prisma.vehicle.findMany({where: { userId: userId }});
            return res.status(200).json(vehicles);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    async createVehicle(req: AuthenticatedRequest, res: Response): Promise<Response> {
        const {
            manufacturer,
            model,
            year,
            chassis_number,
            renavam,
            licence_plate,
        } = req.body;
        const userId = Number(req.userId)

        try {
            const vehicle = await prisma.vehicle.create({
                data: {
                    manufacturer,
                    model,
                    year,
                    chassis_number,
                    renavam,
                    licence_plate,
                    user: {connect: { id: userId }},
                },
            });
            return res.status(201).json(vehicle);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    async getVehicleById(req: AuthenticatedRequest, res: Response): Promise<Response> {
        const { id } = req.params;
        const userId = Number(req.userId)
    
        if (isNaN(parseInt(id))) {
            return res.status(400).json({ error: "Invalid vehicle ID" });
        }
    
        try {
            const vehicle = await prisma.vehicle.findUnique({
                where: { id: parseInt(id) },
            });
    
            if (!vehicle) {
                return res.status(404).json({ error: "Vehicle not found" });
            }
            if (vehicle.userId !== userId) {
                return res.status(401).json({ error: "Unauthorized" });
            
            }
    
            return res.json(vehicle);
        } catch (error) {
            return res.status(500).json({ error: "Failed to fetch vehicle" });
        }
    }

    async updateVehicle(req: AuthenticatedRequest, res: Response): Promise<Response> {
        const { id } = req.params;
        const userId = Number(req.userId)
        const {
            manufacturer,
            model,
            year,
            chassis_number,
            renavam,
            licence_plate,
        } = req.body;

        try {
            const vehicle = await prisma.vehicle.update({
                where: { id: parseInt(id) },
                data: {
                    manufacturer,
                    model,
                    year,
                    chassis_number,
                    renavam,
                    licence_plate,
                },
            });
            if (!vehicle) {
                return res.status(404).json({ error: "Vehicle not found" });
            }

            if (vehicle.userId !== userId) {
                return res.status(401).json({ error: "Unauthorized" });
            
            }
            return res.json(vehicle);
        } catch (error) {
            return res.status(400).json({ error: "Failed to update vehicle" });
        }
    }

    async deleteVehicle(req: AuthenticatedRequest, res: Response): Promise<Response> {
        const { id } = req.params;
        const userId = Number(req.userId)

        try {
            const vehicle = await prisma.vehicle.delete({
                where: { id: parseInt(id) },
            });
            if (!vehicle) {
                return res.status(404).json({ error: "Vehicle not found" });
            }

            if (vehicle.userId !== userId) {
                return res.status(401).json({ error: "Unauthorized" });
            
            }
            return res.sendStatus(204);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }
}
