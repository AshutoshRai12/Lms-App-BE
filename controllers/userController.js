const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");
const generateToken = require("../utils/generateToken.js");

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  } else if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      userName: user.userName,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(404);
    throw new Error("User already exists");
  }

  const user = await User.create({
    userName,
    email,
    password
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      userName: user.userName,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(404).json({message:"user Not Found"});
  }
});

const forgotPass =asyncHandler(async (req, res) => {
  try{
    const {email,password}= req.body;
    const user = await User.findOne({ email });
      if(user)
      {
      user.password = password;
      const updatedUser = await user.save();
      console.log(updatedUser)
      res.status(200).json({message:"password updated successfully!!"})
      }
      else{
        res.status(404).json({message:"user Not Found"});
      }
    
  }
  catch(err){
    res.status(500).json({message:"something went wrong"});
  }
})

const getUser = asyncHandler(async (req, res) => {
  const users = await User.find({email:req.params.email});
  if (users && users.legth > 0){
    res.status(200).json(users);
  } 
  else {
    res.status(404).json({message:" User not found"});
  }
});

module.exports = {
  authUser,
  registerUser,
  forgotPass,
  getUser
};
