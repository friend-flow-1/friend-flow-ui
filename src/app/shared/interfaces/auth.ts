import { User } from './user';

export interface LoginResponseDTO extends Response {
  data: {
    access_token: string;
    refresh_token: string;
    user: User;
    ua: string;
    ip: string;
  };
}

export interface RefreshTokenResponseDTO extends Response {
  data: {
    access_token: string;
    refresh_token: string;
  };
}

export interface RegisterResponseDTO extends Response {
  data: User;
}
