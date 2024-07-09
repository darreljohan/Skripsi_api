import { Request, Response } from "express";

export interface UserRequest extends Request {
  user?: {
    username: string;
    password: string;
    name: string;
    token: string | null;
  };
}

export type authResponse = {
  data: {
    user: {
      username: string;
      password: string;
      name: string;
      token: string | null;
    };
  };
};
