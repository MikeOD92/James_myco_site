import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export const hasToken = async (req) => {
  const token = await getToken({ req, secret });
  if (!token) {
    return false;
  }
  return true;
};
// API MIDDLEWARE
export const hasTokenMiddleware = async (req, res, next) => {
  const token = await getToken({ req, secret });
  if (!token) {
    return next(new Error("Not Allowed - User not authenticated"));
  }
  next();
};
export default hasToken;
