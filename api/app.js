import express from "express" ;
import authRouter from "./routes/auth.route.js" ;
import postRouter from "./routes/post.route.js" ;

const app = express() ; 

app.use(express.json()) ;


app.use("/api/auth", authRouter) ;
app.use("/api/posts", postRouter) ;


const PORT = 8881 ;
app.listen(PORT, () => {
    console.log(`Running at --> ${PORT}`) ;
});