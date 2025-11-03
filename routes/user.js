const express=require('express');
const passport=require('passport');
const { saveRedirectUrl } = require("../middleware");

const router=express.Router();

const userController=require('../controllers/user')

router.get("/sign",userController.renderSignup)



router.post("/sign",userController.signup);

router.get("/login",userController.renderLogin);

router.post("/login",saveRedirectUrl,
    passport.authenticate("local",
    {failureRedirect:'/login',failureFlash:true}),
    userController.login);

router.get("/logout",userController.logout);


module.exports=router;