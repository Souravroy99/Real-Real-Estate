import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";

export const register = async (req, res) => {
  try 
  {
    const { username, email, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);
    console.log(hashPassword);

    const newUser = await prisma.user.create({ 
      data: {
        username,
        email,
        password: hashPassword,
      },
    });

    console.log(newUser) ;
    res.status(201).json({message: "User created successfully"}); 
  } 
  catch (error) 
  {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Failed to register user" });
  }
};



export const login = (req, res) => {
  res.send("Login");
};

export const logout = (req, res) => {
  res.send("Logout");
};
