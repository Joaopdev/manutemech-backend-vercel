import { Prisma } from '@prisma/client';

type MaintenancePart = Prisma.MaintenancePartCreateInput;

export type CreateMaintenancePartInput = Omit<MaintenancePart, 'id'>;

export { MaintenancePart };
