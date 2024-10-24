import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    return res.status(200).json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to get users" });
  }
};

export const getUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to get user" });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
 
  if (id !== tokenUserId) {
    return res.status(403).json({ message: "Not Authorized" });
  }

  const { password, avatar, ...otherInputs } = req.body;
  try {
    let updatedPassword = null;
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...otherInputs,
        ...(updatedPassword && { password: updatedPassword }),
        ...(avatar && { avatar }),
      },
    });

    const { password: userPassword, ...updatedUserWithoutPassword } =
      updatedUser;
    return res.status(200).json(updatedUserWithoutPassword);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to update user" });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  if (id !== tokenUserId) {
    return res.status(403).json({ message: "Not Authorized" });
  }
  try {
    await prisma.user.delete({ where: { id } });
    return res.status(200).json({ message: "User successfully deleted" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to delete user" });
  }
};
