import { Prisma } from '@prisma/client';

type Service = Prisma.ServiceCreateInput;

export type CreateServiceInput = Omit<Service, 'id'>;

export { Service };
