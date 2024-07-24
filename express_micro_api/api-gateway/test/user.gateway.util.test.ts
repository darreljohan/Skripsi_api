import { userClient as prismaClient } from "./database/database";
import { User } from "@prisma/client";

export class UserTest {
  static async delete() {
    await prismaClient.user.deleteMany({
      where: { username: "test" },
    });
  }

  static async create() {
    await prismaClient.user.create({
      data: {
        username: "test",
        password: "test",
        name: "Tester",
        token: "test",
      },
    });
  }

  static async get(): Promise<User> {
    const user = await prismaClient.user.findFirst({
      where: { username: "test" },
    });

    if (!user) {
      throw new Error("user not found");
    }

    return user;
  }
}
