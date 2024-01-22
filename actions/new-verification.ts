"use server";

import { getUserByEmail } from "@/data/get-user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { db } from "@/lib/db";


/**
 * this function verifies the user email
 * this function is called when the user clicks on the link sent to their email
 * this function is called from /auth/new-verification
 * @param token
 * @returns an object with the success or error message
*/
export const newVerification = async (token: string) => {
  try {
    const existingToken = await getVerificationTokenByToken(token);
    if (!existingToken) return { error: "Token doesn't exists!" };  

    // check if token is expired
    const isExpired = new Date(existingToken.expiresAt) < new Date();
    if (isExpired) return { error: "Token is expired!" };

    // check if email exists or not
    const existingUser = await getUserByEmail(existingToken.email);
    if (!existingUser) return { error: "Email doesn't exists!" };

    // update user emailVerified and email
    await db.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        emailVerified: new Date(),
        email: existingToken.email,
      },
    });

    // delete the token
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
    return { success: "Email verified!" };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
};
