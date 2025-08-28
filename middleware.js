const {listingSchema}=require("./schema.js");
const Listing=require('./models/listing');
const ExpressError=require('./utils/ExpressError.js');
const {reviewSchema}=require("./schema.js");
const Review=require("./models/reviews.js")
const wrapAsync=require('./utils/wrapAsync');



module.exports.validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    console.log(error);
     if (error){
    let erMsg=error.details.map((el)=>el.message).join(",");
        // throw new ExpressError(404,error)
         throw new ExpressError(404,erMsg);
    }else{
        next();
    }
}
   

module.exports.validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    console.log(error);
     if (error){
    let erMsg=error.details.map((el)=>el.message).join(",");
        // throw new ExpressError(404,error)
         throw new ExpressError(404,erMsg);
    }else{
        next();
    }
}
   
module.exports.isLoggedin=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","Login to continue");
          return  res.redirect('/login')
    }
    next();
}

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl
    }
    next();
}

module.exports.isOwner=(req,res,next)=>{
    let {id}=req.params;
    let listing= Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","You dont have permission")
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.isReviewAuthor=async(req,res,next)=>{
    let{id,reviewId}=req.params;
    let review=await Review.findById(reviewId);
    // console.log(review)
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","You cannot delete this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
}