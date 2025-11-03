const User=require('../routes/user')

module.exports.renderSignup=(req,res)=>{
    res.render('user/sign.ejs');
};


module.exports.signup=async(req,res)=>{
    try{ 
    let {username,email,password}= req.body;
    const newUser= new User({email,username});
    let registeredUser= await User.register(newUser,password);
    // if(registeredUser){
    //     req.flash("success","Signed up");
    // }
    // console.log(registeredUser);
    req.login(registeredUser,(err)=>{
        if(err){
            console.log(err);
            return next(err);
        }
        req.flash("success","Welcome to Art Page");
         res.render('listing/index.ejs');

    })
}catch(e){
    req.flash("error",e.message);
    res.redirect("/sign");
} 
};

module.exports.renderLogin=(req,res)=>{
    res.render("user/login.ejs");

};
module.exports.login=("/login",async(req,res)=>{
    req.flash("success","You have successfully logged in ")
    let redirectUrl=res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl);
});

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Logged out Successfully");
        res.redirect("/listings");
    })
}