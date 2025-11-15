// if (process.removeListener.NODE_ENV != "production"){
// require('dotenv').config();
// }
 if (process.env.NODE_ENV !== "production") {
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


app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride("_method"));
app.set("view engine","ejs");
app.engine("ejs",ejsMate);
app.use(express.urlencoded({extended:true}));   

const PORT = process.env.PORT || 8080
const url = process.env.MONGO_URL;


app.listen(PORT, () => {
  console.log("Port listening");
  mongoose.connect(url);
  console.log("db connected")
})


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


app.use((err,req,res,next)=>{
  let{status=500,message="Something went wrong"}=err;
    res.render("error.ejs",{message});
})

