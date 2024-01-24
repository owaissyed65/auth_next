"use server";

import * as z from "zod";

import { ResetSchema } from "@/schemas";
import { getUserByEmail } from "@/data/get-user";
import { generatePasswordVerificationToken } from "@/lib/tokens";
import { sendPasswordResetEmail } from "@/lib/mail";
export const reset = async (value: z.infer<typeof ResetSchema>) => {
  const email = value.email;
  if (!email) {
    return { error: "Email is required" };
  }
  const user = await getUserByEmail(email);

  if (!user) {
    return { error: "User not found" };
  }
  const token = await generatePasswordVerificationToken(user.email!);
  await sendPasswordResetEmail(token?.email!, token?.token!);

  return { success: "Reset link sent to your email" };
};
