const  mongoose=require('mongoose');
const initData=require('./data.js');
const Listing=require('../models/listing.js');

const MONGO_URL="mongodb://127.0.0.1:27017/demo";


main().then(()=>{
 console.log("Success")
})
.catch((err)=>
    console.log(err)
);

async function main(){
    await mongoose.connect(MONGO_URL);
} 

const initDB=async()=>{
    await Listing.deleteMany({});
     initData.data = initData.data.map((obj)=>({...obj,owner:"68516e19a79cdafe8c69ad48"}));
    await Listing.insertMany(initData.data);
    console.log("data was inserted");
};

initDB();