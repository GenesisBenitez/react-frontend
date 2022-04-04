import React, {useEffect, useState} from "react";
import axios from "axios";
import {GiFarmer} from 'react-icons/gi'
import { Link, useParams } from "react-router-dom";
import {FaTrash} from 'react-icons/fa'

function Cart({userId, username, loggedIn}){
    const cardStyle = {height: "200px"};
    let {id} = useParams();
    const [loggedInUserId, setLoggedInUserId]= useState(id);
    const [cartItems, setCartItems] = useState([]);
    const [totalForCart, setTotalForCart] = useState(0);
  
    const getData = () =>{

    setCartItems([]);
    axios.get(`http://localhost:8080/cart/getcartbyuserid/${loggedInUserId}`, {withCredentials:true})
    .then((response)=>{
        console.log(response.data);
        setCartItems(response.data);
    })
};
const getTotalForCart = ()=>{
    setTotalForCart(0);
    axios.get(`http://localhost:8080/cart/getTotalCostForCart/${loggedInUserId}`, {withCredentials: true})
    .then((response)=>{
        console.log(response.data);
        setTotalForCart(response.data[0].total_cost_in_cart);
    }).catch(function(error){
        console.log(error)
    })
}
useEffect(() => getData(), []);
useEffect(() => getTotalForCart(), []);

console.log(userId)
    return(
        <div>
            
        
            <div className="row gx-5 justify-content-center mt-4">
            <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 mt-4" >
                <h1 className="display-5">Shopping Cart</h1>
                </div>
                {cartItems.map((cartItem, i)=>(
                
                    <div key={i} className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 mt-4" >
                        
                        <div className="row border" style={cardStyle}>
                            <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 d-flex align-items-center" align="center">
                                <img width="100%" height={130} src={cartItem.product_img}/>
                    
                            </div>
                            <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                                <div className="row mt-4">
                                    <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                                        <small className="d-block mt-3">{cartItem.name}</small>
                                        <small className="d-block">Category: <span className=" fw-bold">{cartItem.category}</span></small>
                                        <small className="d-block"><span className="fw-bold">{cartItem.quantity}</span> in your cart</small>

                                    </div>
                                    <div className="col-4 col-sm48 col-md-4 col-lg-4 col-xl-4">

                                        <small className="d-block fw-bold mt-4 lead"><span className="text-success fw-bold">$</span>{cartItem.total_price}</small>
                                    </div>
                                </div>
                                <div className="row mt-2 justify-content-end">
                                    <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                        <button onClick={()=>{
                                            axios.delete(`http://localhost:8080/cart/deleteCartItem/${cartItem.id}`)
                                            .then(function(response){
                                                console.log(response);
                                                getData();
                                                getTotalForCart();
                                            }).catch(function(error){

                                            })
                                        }}
                                         className="btn btn-light"><FaTrash/></button>
                                    </div>
                                </div>
                              
                            </div>
                        </div>
            
                    </div>
                        
                ))}
                <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 d-flex justify-content-end">
                    <h3 className="display-6 mt-4">Total: ${totalForCart}</h3>
                </div>
            </div>
            
        </div>
    )
}

export default Cart;