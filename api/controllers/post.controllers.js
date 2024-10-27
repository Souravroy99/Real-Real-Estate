import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const getPosts = async (req, res) => {
  const query = req.query ; 
  console.log(query) ;
  try {
    const posts = await prisma.post.findMany({
      where: {
        city: query.city || undefined,
        type: query.type || undefined,
        property: query.property || undefined,
        bedroom: parseInt(query.bedroom) || undefined,
        price: {
          gte: parseInt(query.minPrice) || 0,
          lte: parseInt(query.maxPrice) || 10000000000,
        }
      }
    }) ;

    // setTimeout(() => {
      res.status(200).json(posts);
    // }, 1000)
  } 
  catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error!!" });
  }
};

/*
In Prisma, when you retrieve related data using findMany, it only fetches fields directly on the Post model by default. Relations, such as postDetail, are not included unless explicitly specified. To include related fields like PostDetail when fetching posts, you need to use the include option in your query.
*/

export const getPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await prisma.post.findUnique({ 
      where: { id }, 
      include: {
        postDetail: true,
        user: {
          select: {
            username: true,
            avatar: true,
          }
        }
      },
    });

    const token = req.cookies?.token;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (!err) {
          const saved = await prisma.savePost.findUnique({
            where: {
              userId_postId: {
                userId: payload.id,
                postId: id,
              }
            }
          });
          return res.status(200).json({ ...post, isSaved: saved ? true : false });
        } else {
          return res.status(200).json({ ...post, isSaved: false });
        }
      });
    } else {
      return res.status(200).json({ ...post, isSaved: false });
    }
  } 
  catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error!!" });
  }
};


export const addPost = async (req, res) => {
  const tokenUserId = req.userId;
  const body = req.body;

  console.log("Post Controller tokenUserId: ", req.userId) ;

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
    return res.status(500).json({ message: "Server Error!!" });
  }
};


export const updatePost = async (req, res) => {
  const id = req.params.id;

  try {
    res.status(200).json();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error!!" });
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
    return res.status(500).json({ message: "Server Error!!" });
  }
};
