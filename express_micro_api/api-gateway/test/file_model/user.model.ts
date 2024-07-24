import { Request } from "express";

export type User = {
  name: string;
  username: string;
  password: string;
  token?: string;
};

export interface UserRequest extends Request {
  user?: User;
}
