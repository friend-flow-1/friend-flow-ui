import { Response } from './response';
import { User } from './user';

export interface MeInfoResponseDTO extends Response {
  data: User;
}
