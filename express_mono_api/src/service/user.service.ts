import { User } from "@prisma/client";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response.error";
import {
  GetUserPrismaToGetUserResponse,
  GetUserResponse,
  LoginUserPrismaToLoginResponse,
  LoginUserRequest,
  LoginUserResponse,
  LogoutUserResponse,
  RegisterUserPrismaToRegisterResponse,
  RegisterUserRequest,
  RegisterUserResponse,
  UpdateUserPrismaToUpdateUserResponse,
  UpdateUserRequest,
  UpdateUserResponse,
} from "../model/user.model";
import { UserValidationService } from "../validation/user.validation";
import { Validation } from "../validation/validation";
import { v4 as uuid } from "uuid";
import { Request } from "express";
import { logger } from "../application/logger";

export class UserService {
  static async register(
    request: RegisterUserRequest
  ): Promise<RegisterUserResponse> {
    const registerRequest = Validation.validate(
      UserValidationService.REGISTER,
      request
    );

    const duplicateUser = await prismaClient.user.count({
      where: { username: registerRequest.username },
    });

    if (duplicateUser != 0) {
      throw new ResponseError(400, "Username already exist");
    }
    const user = await prismaClient.user.create({ data: registerRequest });
    return RegisterUserPrismaToRegisterResponse(user);
  }

  static async login(request: LoginUserRequest): Promise<LoginUserResponse> {
    const loginRequest = Validation.validate(
      UserValidationService.LOGIN,
      request
    );

    const checkUser = await prismaClient.user.findUnique({
      where: {
        username: loginRequest.username,
        password: loginRequest.password,
      },
    });

    if (!checkUser) {
      throw new ResponseError(401, "Username or Password is wrong");
    }

    let userToken = await prismaClient.user.update({
      where: {
        username: checkUser.username,
      },
      data: { token: uuid() },
    });

    const response = LoginUserPrismaToLoginResponse(userToken);
    return response;
  }

  static async get(user: User): Promise<GetUserResponse> {
    return GetUserPrismaToGetUserResponse(user);
  }

  static async update(
    user: User,
    request: UpdateUserRequest
  ): Promise<UpdateUserResponse> {
    const updateRequest = Validation.validate(
      UserValidationService.UPDATE,
      request
    );

    if (updateRequest.name) {
      user.name = updateRequest.name;
    }

    if (updateRequest.password) {
      user.password = updateRequest.password;
    }

    const result = await prismaClient.user.update({
      where: { username: user.username },
      data: user,
    });

    return UpdateUserPrismaToUpdateUserResponse(result);
  }

  static async logout(user: User): Promise<LogoutUserResponse> {
    const result = await prismaClient.user.update({
      where: { username: user.username },
      data: { token: null },
    });
    return result;
  }
}
