require("dotenv").config({ path: "../.env" });

const mongoose = require("mongoose");
const express = require("express");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");
const initData = require("./data.js");

const app = express();

const PORT = process.env.PORT || 8080;
const url = process.env.MONGO_URL;

async function initDB() {
  try {
    await mongoose.connect(url);
    console.log("DB Connected");

    let admin = await User.findOne({ username: "ADMIN" });
    if (!admin) {
      admin = await User.create({
        username: "ADMIN",
        email: "admin@test.com",
        password: "somepass",
      });
    }

    await Listing.deleteMany({});

    const updatedData = initData.data.map((obj) => ({
      ...obj,
      owner: admin._id,
    }));

    await Listing.insertMany(updatedData);

    console.log("Seed data inserted");
    process.exit();
  } catch (err) {
    console.log("Seed error:", err);
    process.exit(1);
  }
}

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

initDB();




// require('dotenv').config({ path: '../.env' });


// const  mongoose=require('mongoose');
// const initData=require('./data.js');
// const Listing=require('../models/listing.js');
// const express=require('express');
// const app=express();
// const User = require("../models/user.js");

// const user = await User.findOne() || await User.create({
//   username: "ADMIN",
//   email: "admin@test.com",
//   password: "somepass"
// });

// initData.data = initData.data.map((obj) => ({
//   ...obj,
//   owner: user._id,
// }));


// const PORT = process.env.PORT || 8080
// const url = process.env.MONGO_URL;


// app.listen(PORT, () => {
//   console.log("Port listening");
//   mongoose.connect(url);
//   console.log("db connected")
// })


// // const MONGO_URL="mongodb://127.0.0.1:27017/demo";

// // main().then(()=>{
// //  console.log("Success")
// // })
// // .catch((err)=>
// //     console.log(err)
// // );

// // async function main(){
// //     await mongoose.connect(MONGO_URL);
// // } 

// const initDB=async()=>{
//     await Listing.deleteMany({});
//      initData.data = initData.data.map((obj)=>({...obj,owner:"68516e19a79cdafe8c69ad48",username:"ADMIN"}));
//     await Listing.insertMany(initData.data);
//     console.log("data was inserted");
// };

// initDB();