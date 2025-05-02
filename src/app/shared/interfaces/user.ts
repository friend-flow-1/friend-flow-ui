import { Audit } from './audit';

export interface User extends Audit {
  id: string;
  emai: string;
  first_name: string;
  status: string;
  background?: string;
  birth_date?: Date;
  gender: Gender;
}

export type Gender = 'male' | 'female' | 'other';
