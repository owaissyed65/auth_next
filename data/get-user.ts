import { db } from "@/lib/db";
/**
 * This is to get user by email
 * return @type {Promise}
 * if not find it will return null
 */

export const getUserByEmail = async (email: string) => {
  try {
    return await db.user.findUnique({ where: { email } });
  } catch (error) {
    return null;
  }
};

/**
 *
 * This is to get user by id
 * return @type {Promise}
 * if not find it will return null
 */
export const getUserById = async (id: string) => {
  try {
    return await db.user.findUnique({ where: { id } });
  } catch (error) {
    return null;
  }
};
