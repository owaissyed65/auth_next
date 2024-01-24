"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";

import { getUserByEmail } from "@/data/get-user";
import { getPasswordVerificationTokenByToken } from "@/data/verification-token";
import { db } from "@/lib/db";
import { ResetPasswordSchema } from "@/schemas";

/**
 * this function verifies the user email
 * this function is called when the user clicks on the link sent to their email
 * this function is called from /auth/new-verification
 * @param token
 * @returns an object with the success or error message
 */
export const newPasswordVerification = async (
  value: z.infer<typeof ResetPasswordSchema>,
  token: string
) => {
  try {
    if (!token) return { error: "Token is required!" };
    const existingToken = await getPasswordVerificationTokenByToken(token);
    if (!existingToken) return { error: "Token doesn't exists!" };

    // check if token is expired
    const isExpired = new Date(existingToken.expiresAt) < new Date();
    if (isExpired) return { error: "Token is expired!" };

    // check if email exists or not
    const existingUser = await getUserByEmail(existingToken.email);
    if (!existingUser) return { error: "Email doesn't exists!" };
    if (!existingUser.emailVerified) return { error: "Email is not verified!" };
    // hash the password
    const hashed = await bcrypt.hash(value.password, 10);

    await db.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        password: hashed,
      },
    });
    await db.passwordVerificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });

    return { success: "Password is reset!" };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
};
