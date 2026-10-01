import express from 'express'
import {
    followUser,
    getUser,
    getUserProfile,
    loginUser,
    registerUser,
    unFollowUser,
    updateProfile
} from '../controllers/user_controllers.js'
import { isAuthenticated } from '../middlewares/authMiddleware.js'
import upload from '../middlewares/upload.middleware.js'

const userRoutes = express.Router()

userRoutes.post('/register', registerUser)
userRoutes.post('/login', loginUser)
userRoutes.get('/me', isAuthenticated, getUser)
userRoutes.get('/profile/:username', isAuthenticated, getUserProfile)

userRoutes.post('/follow/:id', isAuthenticated, followUser)
userRoutes.post('/unfollow/:id', isAuthenticated, unFollowUser)

// userRoutes.post('/testUpload' ,upload.single('profileImage') , testUpload )


userRoutes.post('/updateProfile' , isAuthenticated , upload.single('profileImage') , updateProfile)

export default userRoutes