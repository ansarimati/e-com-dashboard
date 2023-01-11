import React, { useEffect, useState } from "react";
import {useParams, useNavigate} from "react-router-dom";


const UpdateProduct = () => {
    const[name,setName] = useState("");
    const[price,setPrice] = useState("");
    const[catagory,setCatagory] = useState("");
    const[company,setCompany] = useState("")
    
    const params = useParams();
    const navigate = useNavigate();


    useEffect( ()=>{
        getProductDetail();

    },[] )


    const getProductDetail=async()=>{
        console.log(params)
        let result = await fetch(`http://localhost:5000/product/${params.id}`);
        result = await result.json();
        //console.log(result)
        setName(result.name);
        setPrice(result.price);
        setCatagory(result.catagory);
        setCompany(result.company);
    }



    const UpdateProduct=async()=>{
        console.log(name, price, catagory, company)
        let result =await fetch (`http://localhost:5000/product/${params.id}`, {
            method:"put",
            body : JSON.stringify({name, price, catagory, company}),
            headers: {
                "Content-Type":"application/json",
                authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        });

        result =await result.json();
        console.log(result)
        navigate("/")
    }


    return (
        <div className="product">
            <h1>Update Prdouct</h1>
            <input type="text" className="inputBox" value={name} onChange={(e)=>{setName(e.target.value)}}
                placeholder="Enter Product Name"></input>
            

            <input type="text" className="inputBox" value={price} onChange={(e)=>{setPrice(e.target.value)}}
                placeholder="Enter Price "></input>
            
            
            <input type="text" className="inputBox" value={catagory} onChange={(e)=>{setCatagory(e.target.value)}}
                placeholder="Enter Catagory Name"></input>
            

            <input type="text" className="inputBox" value={company} onChange={(e)=>{setCompany(e.target.value)}}
                placeholder="Enter Company Name"></input>
            

            <button type="button" className="signUpBtn" onClick={UpdateProduct} >Update Product</button>
        </div>
    )
};

export default UpdateProduct;