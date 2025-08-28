const Review=require('../models/reviews');
const{validateReview,isReviewAuthor}=require('../middleware');
const{isLoggedin}=require('../middleware');
const express=require('express');
const app=express();
const Listing=require('../models/listing')
const wrapAsync=require('../utils/wrapAsync');
const router=express.Router({mergeParams:true});
const reviewController=require('../controllers/reviews');

router.post("/",validateReview,reviewController.addReview);

router.delete("/:reviewId",isReviewAuthor,reviewController.destroyReview);

module.exports=router;