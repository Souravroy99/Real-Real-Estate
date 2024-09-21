import express from "express" ;

const router = express.Router() ;

router.get("/test", (req, res) => {
    res.send("Post Router works!") ;
})


export default router ;