import jwt from "jsonwebtoken";

export const verifyAdmin = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Not Authenticated!" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    // Check if there was an error during token verification
    if (err) {
      return res.status(403).json({ message: "User has an invalid token!" });
    }
console.log(payload)
    if (!payload.isAdmin) {
      return res.status(403).json({ message: "User is not an admin!" });
    }
    req.userAdmin = payload.isAdmin ;
    next();
  });
};
