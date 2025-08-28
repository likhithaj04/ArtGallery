const mongoose=require('mongoose');
const passport = require('passport');
const passportLocalMongoose= require('passport-local-mongoose');


const Schema=mongoose.Schema;
// const Review=require('./review.js')

const userSchema= new Schema({
    email:{
        type:String
    }

});

userSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model("User",userSchema);