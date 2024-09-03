const{
    authUser,
    registerUser,
    forgotPass,
    getUser
  } =require("../controllers/userController.js");
  const express = require('express');
  const bodyParser =require('body-parser');
  const cors = require('cors');
  const router = express.Router();
  const app = express();
  app.use(bodyParser.json());
  app.use(cors()); 
  
  
  router.route("/user/register").post(registerUser);
  router.post("/login", authUser);
  //they do same fn search and get
  router.route('/user/:email').get(getUser);
  //forgot pass
  router.route('/forgot').patch(forgotPass)
  
  module.exports= router;

