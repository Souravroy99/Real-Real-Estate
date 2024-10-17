import jwt from "jsonwebtoken" ;

export const shouldBeLoggedIn = async(req, res) => {
    const token = req.cookies.token ;

    if(!token) res.status(401).json({message: "Not Authenticated!"}) ;

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {  // Need to understand this
        res.status(403).json({message: "User have invalid token!"}) ;
    })

    res.status(200).json({message: "User is Authenticated"});
}

export const shouldBeAdmin = async(req, res) => {
    
}