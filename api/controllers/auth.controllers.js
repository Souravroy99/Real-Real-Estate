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



export const login = async (req, res) => {
  const {username, password} = req.body ;
  
  try{
    const user = await prisma.user.findUnique({
      where: {username: username}
    })

    if(!user) res.status(401).json({message: "Invalid Credentails!"}) ;

    const isPasswordValid = await bcrypt.compare(password, user.password) ;
    
    if(!isPasswordValid) res.status(401).json({message: "Invalid Credentails!"}) ;

    res.cookie("test", "myValue", {
      httpOnly: true,
    }).status(200).json({message: "Login successfully"}) ;
  }
  catch(err) {
    console.log(err) ;
    res.status(500).json({message: "Failed to login!"}) ;
  }
};

export const logout = (req, res) => {
  res.send("Logout");
};
