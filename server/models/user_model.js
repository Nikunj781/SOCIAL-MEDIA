import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true
   },

   username: {
      type: String,
      required: true,
      unique: true
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true
   },

   profileImage: {
      type: String
   },
   bio : {
      type : String
   },
   // steve123
   followers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
   }],
   // alex90
   followings: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
   }],


   posts: [],
   stories: [],
   reels: []


}, { timestamps: true })


const User = mongoose.model('User', userSchema)

export default User