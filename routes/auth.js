const express=require('express');
const {body}=require('express-validator');
const router=express.Router();

const authController=require('../controllers/auth.js');
const User=require('../model/user.js')
router.post('/signup',[
  body('email')
  .isEmail().withMessage('Please Enter a valid Email.')
  .custom((value,{req})=>{
    return User.findOne({
      email:value
    }).then(userDoc=>{
      if(userDoc){
        Promise.reject('Email already exists');
      }
    });
  }).normalizeEmail(),
  body('password')
  .trim()
  .isLength({min:8})
],authController.signup);
router.post('/signin',authController.login);
module.exports=router;
