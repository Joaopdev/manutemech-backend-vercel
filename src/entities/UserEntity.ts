import { Prisma } from '@prisma/client';

type User = Prisma.UserCreateInput;

export type CreateUserInput = Omit<User, 'id'>;
export type UpdateUserInput = Partial<Omit<User, 'id'>>;

export { User };
