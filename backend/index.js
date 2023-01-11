const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");
const Jwt = require("jsonwebtoken");

const jwtKey = "e-comm"
const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  const user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  //res.send(result);
  Jwt.sign({result}, jwtKey, {expiresIn:"2h"} ,(err, token)=>{
    if (err) { res.send("something went wrong") }
    res.send({result, auth:token});
  })
});

app.post("/login", async (req, res) => {
  console.log(req.body);
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({user}, jwtKey, {expiresIn:"2h"} ,(err, token)=>{
        if (err) { res.send("something went wrong") }
        res.send({user, auth:token});
      })
      
    } else {
      res.send({result:"result not found"});
    }
  } else {
    res.send({result:"result not found"});
  }
});


app.post("/add-product",verifyToken,async (req,res)=>{
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result)
})

app.get("/products",verifyToken,async (req, res)=>{
  let products =await Product.find();
  if(products.length>0) {
    res.send(products)
  }
  else {
    res.send({result:"no products found"})
  }
})


app.delete("/product/:id",verifyToken,async (req,res)=>{
  // res.send(req.params.id)
  const result =await Product.deleteOne({_id:req.params.id})
  res.send(result)
})



// 2 api for update one to get data and show pre filled in update page then second for update

app.get("/product/:id",verifyToken,async (req,res)=>{ 
  let result = await Product.findOne({_id:req.params.id});
  if (result) {
    res.send(result)
  }
  else {
    res.send({result:"no record Foundd"})
  }
})


app.put("/product/:id",verifyToken,async (req,res)=>{
  let result = await Product.updateOne(
    {_id:req.params.id},
    { 
      $set : req.body
    }
  )

    res.send(result)

})


// search api, $or is used for searach in more then one field

app.get("/search/:key",verifyToken,verifyToken,async (req,res)=>{
  let result =await Product.find({
    "$or": [
      {name:{$regex:req.params.key}},
      {company:{$regex:req.params.key}},
      {price:{$regex:req.params.key}},
      {catagory:{$regex:req.params.key}}
    ]
  })

  res.send(result)

})

function verifyToken(req,res,next){
  let token = req.headers["authorization"]; 
  if (token) {
    token = token.split(" ")[1];
    console.log("middleware called", token);
    Jwt.verify(token, jwtKey, (err, valid)=>{
      if (err) {
        res.status(401).send({result:"please provide valid token"})
      }
      else {
        next();
      }

    })
  } 
  else {
    res.status(403).send({result:"please add token with header"})
  }
  

}

app.listen(5000);

// const express = require('express');
// const mongoose = require('mongoose');

// const app = express();

// const connectDB =async () => {
//     mongoose.connect("mongodb://127.0.0.1:27017/e-com");
//     const productSchema = new mongoose.Schema({});
//     const productModel = mongoose.model('products', productSchema);
//     const data = await productModel.find();
//     console.log(data);
// }

// connectDB()

// app.listen(5000);
