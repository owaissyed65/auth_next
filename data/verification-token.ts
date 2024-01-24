import { db } from "@/lib/db";

/**
 * this function gets a verification token by the email
 * @param email
 * @returns the verification token
 * in catch block, return null
 */
export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const token = await db.verificationToken.findFirst({
      where: {
        email: email,
      },
    });
    return token;
  } catch (error) {
    return null;
  }
};

/**
 * this function gets a verification token by the token
 * @param token
 * @returns the verification token
 */
export const getVerificationTokenByToken = async (token: string) => {
  try {
    const vToken = await db.verificationToken.findUnique({
      where: {
        token: token,
      },
    });
    return vToken;
  } catch (error) {
    return null;
  }
};

/**
 * this function gets a password verification token by the token
 * @param token
 * @returns
 */
export const getPasswordVerificationTokenByToken = async (token: string) => {
  try {
    const vToken = await db.passwordVerificationToken.findUnique({
      where: {
        token: token,
      },
    });
    return vToken;
  } catch (error) {
    return null;
  }
};

/**
 * this function is  to generate a password verification token
 * @param email
 * @returns an object with the token and the expiresAt date
 */
export const getPasswordVerificationTokenByEmail = async (email: string) => {
  try {
    const vToken = await db.passwordVerificationToken.findFirst({
      where: {
        email,
      },
    });
    return vToken;
  } catch (error) {
    return null;
  }
};
