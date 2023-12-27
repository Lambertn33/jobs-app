import { hash, compare } from "bcryptjs";

export const hashPassword = async (password: string) =>
  await hash(password, 12);

export const comparePasswords = async (
  password: string,
  userPassword: string
) => compare(password, userPassword);
