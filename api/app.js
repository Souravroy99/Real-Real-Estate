import express from "express" ;
import cookieParser from "cookie-parser" ;
import authRouter from "./routes/auth.route.js" ;
import postRouter from "./routes/post.route.js" ;
import testRouter from "./routes/test.route.js" ;
import userRouter from "./routes/user.route.js" ;

import cors from "cors" ;

const app = express() ; 

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
})) ;
app.use(express.json()) ;
app.use(cookieParser()) ;


app.use("/api/auth", authRouter) ;
app.use("/api/post", postRouter) ;
app.use("/api/test", testRouter) ;
app.use("/api/user", userRouter) ;


const PORT = 8881 ;
app.listen(PORT, () => {
    console.log(`Running at --> ${PORT}`) ;
});