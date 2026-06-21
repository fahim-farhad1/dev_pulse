import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import config from "../config/index.env";

 const auth = () =>{
    return async (req : Request, res : Response , next : NextFunction ) =>{
       const  token  = req.headers.authorization;
        console.log(token);
    const decode = jwt.verify(token as string, config.secret as string);
    console.log(decode)

        next()
}
}

export default auth;