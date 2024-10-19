import jwt from "jsonwebtoken";

export const shouldBeLoggedIn = async (req, res) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "Not Authenticated!" });

  // jwt.verify always takes 3 arguments
  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    if (err) {
      return res.status(403).json({ message: "User have invalid token!" });
    }

    console.log(payload);
    res.status(200).json({ message: "User is Authenticated" });
  });
};

export const shouldBeAdmin = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Not Authenticated!" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    // Check if there was an error during token verification
    if (err) {
      return res.status(403).json({ message: "User has an invalid token!" });
    }

    if (!payload.isAdmin) {
      return res.status(403).json({ message: "User is not an admin!" });
    }

    console.log(payload);

    // If the user is an admin, send the success response
    return res.status(200).json({ message: "User is Admin" });
  });
};
