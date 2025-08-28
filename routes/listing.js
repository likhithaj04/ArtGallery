const express=require('express');
const mongoose=require('mongoose');
const app=express();
// const Listing=require('./models/listing')
const{validateListing,isLoggedin,isOwner}=require('../middleware');
const wrapAsync=require('../utils/wrapAsync');
const router=express.Router();
const multer=require("multer");
const {storage}=require('../cloudConfig.js');
const upload=multer({storage});


const listingController=require('../controllers/listing');

//create
router.get("/",wrapAsync(listingController.renderlistings));

router.post("/",upload.single('listing[image]'),wrapAsync(listingController.addListings));

router.get("/about",listingController.about);



//new
router.get("/new",isLoggedin,listingController.renderNew);


//show
router.get("/:id",wrapAsync(listingController.showListing));

//edit
router.get("/:id/edit",isLoggedin,wrapAsync(listingController.renderEditListing));

router.put("/:id",isLoggedin,isOwner, upload.single('listing[image]'),validateListing,wrapAsync(listingController.editListing));;

//delete
router.delete("/:id",wrapAsync(listingController.destroyListing));

module.exports=router;