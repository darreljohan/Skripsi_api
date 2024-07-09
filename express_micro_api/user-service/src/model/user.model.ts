import { User } from "@prisma/client";
import { Request } from "express";
import { string } from "zod";

export type RegisterUserRequest = {
  username: string;
  password: string;
  name: string;
};
export function RegisterUserPrismaToRegisterResponse(
  user: User
): RegisterUserResponse {
  return { username: user.username, name: user.username };
}

export type RegisterUserResponse = {
  username: string;
  name: string;
};

export type LoginUserRequest = {
  username: string;
  password: string;
};

export function LoginUserPrismaToLoginResponse(user: User) {
  return {
    name: user.name,
    username: user.username,
    token: user.token as string,
  };
}

export type LoginUserResponse = {
  username: string;
  token: string;
};

export interface UserRequest extends Request {
  user?: User;
}

export type GetUserResponse = {
  username: string;
  name: string;
};

export function GetUserPrismaToGetUserResponse(user: User) {
  return {
    name: user.name,
    username: user.username,
  };
}

export type UpdateUserRequest = {
  name?: string;
  password?: string;
};

export function UpdateUserPrismaToUpdateUserResponse(user: User) {
  return {
    name: user.name,
    password: user.password,
    username: user.username,
  };
}

export type UpdateUserResponse = {
  name: string;
  password: string;
  username: string;
};

export type LogoutUserResponse = {
  name: string;
  username: string;
};

export function UserToLogoutUserResponse(user: User) {
  return { name: user.name, username: user.username };
}

export type AuthUserRequest = {
  token: string;
};

export type AuthUserResponse = {
  user: User;
};
