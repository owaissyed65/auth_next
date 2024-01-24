import { v4 as uuid } from "uuid";

import { db } from "@/lib/db";

import {
  getPasswordVerificationTokenByEmail,
  getVerificationTokenByEmail,
} from "@/data/verification-token";

/**
 * this function generates a verification token for a user
 * @param email
 * @returns an object with the token and the expiresAt date
 */

export const generateVerificationToken = async (email: string) => {
  try {
    // Delete any existing tokens for this user
    const existingToken = await getVerificationTokenByEmail(email);
    if (existingToken) {
      await db.verificationToken.delete({
        where: {
          id: existingToken.id,
        },
      });
    }

    // create a new token
    const token = uuid();

    // set the expires date to 1 hour from now
    const expiresAt = new Date(new Date().getTime() + 3600 * 1000);

    // save the token to the database
    const verificationToken = await db.verificationToken.create({
      data: {
        token,
        expiresAt,
        email,
      },
    });

    return verificationToken;
  } catch (error) {
    return null;
  }
};

/**
 * this function generates a verification token for a user
 * @param email
 * @returns an object with the token and the expiresAt date
 */
export const generatePasswordVerificationToken = async (email: string) => {
  try {
    // Delete any existing tokens for this user
    const existingToken = await getPasswordVerificationTokenByEmail(email);
    if (existingToken) {
      await db.passwordVerificationToken.deleteMany({
        where: {
          id: existingToken.id,
        },
      });
    }

    // create a new token
    const token = uuid();

    // set the expires date to 1 hour from now
    const expiresAt = new Date(new Date().getTime() + 3600 * 1000);

    // save the token to the database
    const verificationToken = await db.passwordVerificationToken.create({
      data: {
        token,
        expiresAt,
        email,
      },
    });

    return verificationToken;
  } catch (error) {
    return null;
  }
};
