import { Prisma } from '@prisma/client';

export type MaintenanceService = Prisma.MaintenanceServiceCreateInput;
export type CreateMaintenanceServiceInput = Omit<MaintenanceService, 'maintenance' | 'service'>;
