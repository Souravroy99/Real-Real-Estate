import prisma from "../lib/prisma.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany() ;
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    return res.status(403).json({ message: "Failed to fetch all the posts" });
  }
};

export const getPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await prisma.post.findUnique({ where: { id } });
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    return res.status(403).json({ message: "Failed to add the post" });
  }
};


export const addPost = async (req, res) => {
  const tokenUserId = req.userId;
  const body = req.body;

  try {
    const newPost = await prisma.post.create({
      data: {
        ...body.postData,
        userId: tokenUserId, 
        postDetail: {
          create: body.postDetail,  
        },
      },
    });
    res.status(200).json(newPost);
  } catch (err) {
    console.log(err);
    return res.status(403).json({ message: "Failed to create the post" });
  }
};


export const updatePost = async (req, res) => {
  const id = req.params.id;

  try {
    res.status(200).json();
  } catch (err) {
    console.log(err);
    return res.status(403).json({ message: "Failed to update the post" });
  }
};

export const deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  try {
    const findPost = await prisma.post.findUnique({ where: { id } });

    if (findPost.userId !== tokenUserId) {
      console.log("The user did not make the post");
      return res.status(403).json({ message: "User is not authorized!" }); // OR, "The user did not make the post"
    }
    await prisma.post.delete({ where: { id } });
    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(403).json({ message: "Failed to delete the post" });
  }
};
