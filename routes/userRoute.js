const{
    authUser,
    registerUser,
    forgotPass,
    getUser,
    getUserList
  } =require("../controllers/userController.js");
  const express = require('express');
  const bodyParser =require('body-parser');
  const cors = require('cors');
  const router = express.Router();
  const app = express();
  app.use(bodyParser.json());
  app.use(cors()); 
  
  // This is for register user 
  router.route("/user/register").post(registerUser);
   // Login 
  router.post("/login", authUser);
   // Get User By Email
  router.route('/user/:email').get(getUser);
    // Get All User 
  router.route('/users/list').get(getUserList);
  //forgot pass
  router.route('/forgot').patch(forgotPass)
  
  module.exports= router;

