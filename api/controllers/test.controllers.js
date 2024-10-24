import jwt from "jsonwebtoken";

export const shouldBeLoggedIn = async (req, res) => {
    console.log(req.userId) ;
    res.status(200).json({ message: "User is Authenticated" });
};

export const shouldBeAdmin = async (req, res) => {
  console.log(req.userAdmin) ;
  return res.status(200).json({ message: "User is Admin" });
};
