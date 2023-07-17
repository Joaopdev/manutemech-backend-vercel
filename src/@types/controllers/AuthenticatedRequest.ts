import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  userId?: string; // Propriedade userId personalizada
}