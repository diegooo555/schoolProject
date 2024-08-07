import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js';

export const authRequired = (req, res, next) => {
    const {token} = req.cookies;
    if(!token) 
        return res.status(401).json({message: "Not token, autorization denied"});
    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if(err) return res.status(401).json({message: "Invalid Token"});
        req.user = user;//save token user in req.user
        next();
    });
}