import { ResponseError } from "../error/response.error";

export function stringToNumberChanger(target: string): number {
  if (isNaN(Number(target))) {
    throw new ResponseError(500, "Parameter ID is not a number");
  }
  return Number(target);
}
