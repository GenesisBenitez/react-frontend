import React, {useEffect, useState} from "react";
import axios from "axios";
import {GiFarmer} from 'react-icons/gi'
import { Link, useParams } from "react-router-dom";


function AllProducts({userId, username, loggedIn}){
    const cardStyle = {height: "250px"};
    const descriptionStyle = {height:"35%", overflow: "scroll"};
    const [products, setProducts] = useState([]);
    const [quantity, setQuantity] = useState();
    const getData = () =>{

    
    axios.get("http://localhost:8080/products/getAllProductInformation", {withCredentials:true})
    .then((response)=>{
        console.log(response.data);
        setProducts(response.data.products);
    })
};
useEffect(() => getData(), []);

    return(
        <div>
           
        
            <div className="row gx-5 justify-content-center mt-4">
            <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 mt-4" >
                <h1 className="display-5">Products</h1>
                </div>
                
                {products.map((product, i)=>(
                    <div key={i} className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 mt-4" >
                        
                        <div className="row border" style={cardStyle}>
                            <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 d-flex align-items-center" align="center">
                                <img width="100%" height={130} src={product.product_img}/>
                    
                            </div>
                            <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                            
                                <small className="d-block mt-3">{product.name}</small>
                                <div style={descriptionStyle}>
                                <small className="d-block mt-4">{product.description}</small>
                                </div>

                                <small className="d-block mt-2 fw-bold"><span className="text-success fw-bold">$</span>{product.price}</small>
                                <form onSubmit={(e)=>{
                                    e.preventDefault();
                                    let quantityValue = parseInt(quantity);
                                    console.log(product.id, userId, quantityValue);
                                    axios.post('http://localhost:8080/cart/addproducttocart', {
                                    user_id: userId,
                                    product_id: product.id,
                                    quantity: quantityValue
                                    },{withCredentials: true}).then(function(response){
                                        console.log(response);
                                    }).catch(function(error){
                                        console.log(error);
                                    })
                                    }}
                                >
                                    <div className="row mt-3">
                                        <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                            <select required className="form-select" aria-label="Default select example" onChange={(e)=> setQuantity(e.target.value)}>
                                            <option disabled defaultValue>QTY: 0</option>
                                            {Array.from(Array(product.quantity), (error, i)=>{
                                                if(i !==0){
                                                    return <option value={i}>{i}</option>
                                                }
                                            })}
                                            </select>  
                                        </div> 
                                    <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                        <button className="btn btn-dark">Add to cart</button>
                                    </div>
                                    </div>

                                </form>
                            </div>
                        </div>
            
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AllProducts;