"use server";
import bcrypt from "bcryptjs";

import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import { db } from "@/lib/db";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
export const register = async (values: z.infer<typeof RegisterSchema>) => {
  if (
    [values.email, values.password, values.name].some(
      (value) => value.trim() === ""
    )
  ) {
    return { error: "Field is required" };
  }

  const { email, password, name } = values;

  const existingUser = await db.user.findUnique({
    where: {
      email: email,
    },
  });
  if (existingUser) {
    return { error: "User already exists" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  const vToken = await generateVerificationToken(email);
  console.log(vToken);
  await sendVerificationEmail(vToken?.email!, vToken?.token!);
  return { success: "User created" };
};
