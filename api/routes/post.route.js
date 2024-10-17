import express from "express" ;

const router = express.Router() ;

router.get("/test", (req, res) => {
    res.send("Post Router works!") ;
}) ;

router.post("/test", (req, res) => {
    res.send("Post Router works!") ;
}) ;

router.put("/test", (req, res) => {
    res.send("Post Router works!") ;
}) ;

router.delete("/test", (req, res) => {
    res.send("Post Router works!") ;
}) ;


export default router ;