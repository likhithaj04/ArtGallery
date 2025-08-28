const express=require('express');
const Listing=require('../models/listing')
const mapboxGeocoding=require('@mapbox/mapbox-sdk/services/geocoding');
mapToken=process.env.MAP_TOKEN;
const geocodingClient=mapboxGeocoding({accessToken:mapToken});

//create
module.exports.renderlistings=(async(req,res)=>{
    const allListing=await Listing.find({});
    res.render("./listing/index.ejs",{allListing});
});

module.exports.about=(req, res) => {
  res.render("./listing/about.ejs");
};

//new
module.exports.renderNew=(req,res)=>{
    res.render("./listing/new.ejs");
};
module.exports.about=(req, res) => {
  res.render("./listing/about.ejs");
};

module.exports.addListings=async(req,res)=>{
    let response= await geocodingClient.forwardGeocode({
        query:req.body.listing.location,
        limit:1
    })
    .send()
      if (!req.file) {
        req.flash("error", "Image upload failed or was missing.");
        return res.redirect("/listings/new");
    }
    
    // console.log(url,".....",filename);
    //  console.log(response.body.features[0].geometry);
    //  res.send("done");
     let url=req.file.path;
    let filename=req.file.filename;

    const newlistings= new Listing(req.body.listing);
    newlistings.image={url,filename};
     newlistings.owner=req.user._id;

//    console.log(newlistings);

     newlistings.geometry=response.body.features[0].geometry;

    let savedListing=await newlistings.save();
    console.log(savedListing);

    req.flash("success","Art Info Created")
    res.redirect("/listings")
};

//show

module.exports.showListing=async(req,res)=>{
    let {id}= req.params;
    const listing=await Listing.findById(id).populate(
        {
        path:"reviews",
       
        populate:{
            path:"author"
        }
}).populate("owner");
    if(! listing){
        req.flash("error","Listing dosennt exists");
        res.redirect('/listings');
    }
    // console.log("Current User:", res.locals.currUser);

    res.render("listing/show.ejs",{listing})
};

//edit
module.exports.renderEditListing=async(req,res)=>{
    let {id}= req.params;
    const listing=await Listing.findById(id);
    res.render("listing/edit.ejs",{listing});
};

module.exports.editListing=async(req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findByIdAndUpdate(id,{...req.body.listings},{new:true});
    // console.log(listing);

     if(typeof req.file !=="undefined"){// to edit listing by adding new image
        let url=req.file.path;
       let filename=req.file.filename;
       listing.image={url,filename};
       await listing.save(); 
       }
       
    req.flash("success","New Art Info Edited");
    res.redirect(`/listings/${id}`);
};

//delete
module.exports.destroyListing=async(req,res)=>{
    let {id}=req.params;
    let deletedListing= await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("sucess","Art Info Deleted");
    res.redirect('/listings')
};