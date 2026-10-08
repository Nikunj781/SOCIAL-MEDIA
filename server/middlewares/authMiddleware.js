import jwt from "jsonwebtoken"
import User from "../models/user_model.js"


export const isAuthenticated = async (req,res,next)=>{
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({message: "Unauthorized"})
    }

    const decoded = jwt.verify(token , process.env.JWT_SECRET)

    const user = await User.findById(decoded.userId)

    if(!user){
        return res.status(404).json({message: "User not found , token invalid"})
    }

    req.user = user

    next()

}   


 