import React, { useState } from "react";

const AddProduct = () => {
    const[name,setName] = useState("");
    const[price,setPrice] = useState("");
    const[catagory,setCatagory] = useState("");
    const[company,setCompany] = useState("")
    const[error, serError] = useState(false)


    const addProduct=async()=>{
        console.log(!name)  // !name will give true if name is empty
        if(!name || !price || !catagory || !company) {
            serError(true)
            return false;
        }
        
        console.log(name,price,catagory,company);
        const userId =JSON.parse( localStorage.getItem("user") )._id;
        
        let result =await fetch("http://localhost:5000/add-product", {
            method:"post",
            body:JSON.stringify({name, price, catagory, company, userId}),
            headers: {
                "Content-Type":"application/json",
                authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        })
        result =await result.json();
        console.log(result)

        // setName("");setPrice("");setCatagory("");setCompany("");
    }

    return (
        <div className="product">
            <h1>Add Prdouct</h1>
            <input type="text" className="inputBox" value={name} onChange={(e)=>{setName(e.target.value)}}
                placeholder="Enter Product Name"></input>
            {error && !name  && <span className="invalid-input">Enter valid name</span>}

            <input type="text" className="inputBox" value={price} onChange={(e)=>{setPrice(e.target.value)}}
                placeholder="Enter Price "></input>
            {error && !price && <span className="invalid-input">Enter valid price</span>}
            
            <input type="text" className="inputBox" value={catagory} onChange={(e)=>{setCatagory(e.target.value)}}
                placeholder="Enter Catagory Name"></input>
            {error && !catagory && <span className="invalid-input">Enter valid catagory name</span>}

            <input type="text" className="inputBox" value={company} onChange={(e)=>{setCompany(e.target.value)}}
                placeholder="Enter Company Name"></input>
            {error && !company && <span className="invalid-input">Enter valid company name</span>}

            <button type="button" className="signUpBtn" onClick={addProduct} >Add Product</button>
        </div>
    )
};

export default AddProduct;