import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom"

const ProductList = () => {
    const [products,setProducts] = useState([]);

    useEffect( ()=>{
        getProducts();
    }, [] )


    const getProducts =async () => {
        let result =await fetch("http://localhost:5000/products",{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        });
        result =await result.json();
        setProducts(result)
        
    }

    console.log(products)

    const deleteProduct=async(id)=>{
        //console.log(id)
        let result =await fetch(`http://localhost:5000/product/${id}`, {
            method:'delete',
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        })

        result =await result.json();
        if(result) {
            getProducts();
            //alert("record deleted")
        }

    }


    const searchHandle=async(e)=>{
        //console.log(e.target.value);
        let key = e.target.value;
        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`,{
                headers:{
                    authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
                }
            })
            result =await result.json();
            if (result) {
                setProducts(result)
            }
        }

        else {
            getProducts();
        }
        
    }


    return (
        <div className="product-list">
            <h1>Product List</h1>
            <input type="text" placeholder="Search Product Here" className="search-box" onChange={searchHandle}></input>
            <ul>
                <li>S.No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Catagory</li>
                <li>Company</li>
                <li>Operations</li>
            </ul>

            {
                products.length > 0 ?  products.map((item, index)=> 
                <ul>
                    <li>{index+1}</li>
                    <li>{item.name}</li>
                    <li>$ {item.price}</li>
                    <li>{item.catagory}</li>
                    <li>{item.company}</li>
                    <li><button onClick={()=>{deleteProduct(item._id)}}>Delete</button>
                        <Link to={"/update/" + item._id}>update</Link>
                    </li>
                </ul>
                )

                :
                <h1>No Results</h1>
            }
        </div>
    )
}

export default ProductList;