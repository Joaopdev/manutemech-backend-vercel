import { Prisma } from '@prisma/client';

export type Part = Prisma.PartCreateInput;
export type CreatePartInput = Omit<Part, 'id' | 'maintenance'>;
