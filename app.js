if (process.removeListener.NODE_ENV != "production"){
require('dotenv').config();
}
 
const express=require('express');
const mongoose=require('mongoose');
const app=express();
const path=require('path');
const ejsMate=require('ejs-mate');
const passport=require('passport');
const session=require('express-session');
const LocalStrategy =require('passport-local');
const flash=require('connect-flash');
const User=require('./models/user');
const methodOverride=require('method-override');


const listingRouter=require('./routes/listing');
const reviewRouter=require('./routes/review');
const userRouter=require('./routes/user');

const MONGO_URL="mongodb://127.0.0.1:27017/demo";

app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride("_method"));
app.set("view engine","ejs");
app.engine("ejs",ejsMate);
app.use(express.urlencoded({extended:true}));   

main().then(()=>{ 
 console.log("Success")
})
.catch((err)=>
    console.log(err)
);

async function main(){  
    await mongoose.connect(MONGO_URL);
}

const sessionOptions={
    secret:"SecretString",
    resave:false,
    saveUninitialized:true,
    cookie:{
    maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
        httpOnly:true,
    },
}


app.use(session(sessionOptions));
app.use(flash())

//passport middleware
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//flash middleware
app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
});




app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);




// app.get("/listings",wrapAsync(async(req,res)=>{
//     const allListing=await Listing.find({});
//     res.render("./listing/index.ejs",{allListing});
// }));

// app.get("/listings/new",(req,res)=>{
//     res.render("./listing/new.ejs");
// });




// app.post("/listings",wrapAsync(async(req,res)=>{
//     const newlistings= new Listing(req.body.listing);
//     let savedListing=await newlistings.save();
//     console.log(savedListing);
//     req.flash("success","Art Info Created")
//     res.redirect("/listings")
// }));

// app.get("/listings/:id",wrapAsync(async(req,res)=>{
//     let {id}= req.params;
//     const listing=await Listing.findById(id).populate(
//         {
//         path:"reviews",
       
//         populate:{
//             path:"author"
//         }
// });
//     if(! listing){
//         req.flash("error","Listing dosennt exists");
//         return res.redirect('/listings');
//     }
//     res.render("listing/show.ejs",{listing})
// }));

// app.get("/sign",)

// app.post('/signup',);

// app.get("/login",)

// app.post("/login",(req,res)=>{
//     passport.authenticate("local",{failureRedirect:'/login',failureFlash:true})
//     req.flash("success","You have successfully logged in ")
//     res.redirect('/listings');
// });

// app.get("/listings/:id/edit",wrapAsync(async(req,res)=>{
//     let {id}= req.params;
//     const listing=await Listing.findById(id);
//     res.render("listing/edit.ejs",{listing});
// }));

// app.put("/listings/:id",validateListing,wrapAsync(async(req,res)=>{
//     let {id}=req.params;
//     let listing=await Listing.findByIdAndUpdate(id,{...req.body.listings},{new:true});
//     // console.log(listing);
//     await listing.save();
//     req.flash("success","New Art Info Edited");
//     res.redirect(`/listings/${id}`);
// }));;

// app.delete("/listings/:id",wrapAsync(async(req,res)=>{
//     let {id}=req.params;
//     let deletedListing= await Listing.findByIdAndDelete(id);
//     console.log(deletedListing);
//     req.flash("sucess","Art Info Deleted");
//     res.redirect('/listings')
// }));

// app.post("/listings/:id/reviews",async(req,res)=>{
//     let listing=await Listing.findById(req.params.id);
//     let newReview=new Review(req.body.review);
//     listing.reviews.push(newReview);
//     console.log(newReview);
//     await newReview.save();
//     await listing.save();
//     res.redirect(`/listings/${listing._id}`);
// });

// app.delete("/listings/:id/reviews/:reviewId",async(req,res)=>{
//     let {id,reviewId}=req.params;
//     await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
//     await Review.findByIdAndDelete(reviewId);
//     res.redirect(`/listings/${id}`);
// });


app.use((err,req,res,next)=>{
  let{status=500,message="Something went wrong"}=err;
    res.render("error.ejs",{message});
})

app.listen(8080,()=>{
    console.log("Server started");
})