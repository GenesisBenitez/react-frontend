import React, {useEffect, useState} from 'react';
import axios from "axios";
import { useParams, Link } from 'react-router-dom';
import {FaTrash} from 'react-icons/fa';
import { useSnackbar } from 'material-ui-snackbar-provider';
import {ImNotification} from 'react-icons/im'
import { AiOutlineShopping } from 'react-icons/ai';

function Cart({userId,username,loggedIn}){
    const cardStyle = {height: "200px"};
    let {id}  = useParams();

    
    const [loggedInUserId, setLoggedInUserId] = useState(id);
    const [cartItems, setCartItems] = useState([]);
    const [totalForCart, setTotalForCart] = useState(0);
    const [userPayment, setUserPayment] = useState([]);

    const snackbar = useSnackbar();

    const getData = () =>{
        setCartItems([]);
        axios.get(`http://localhost:8080/cart/getcartbyuserid/${loggedInUserId}`,   {withCredentials: true})
        .then((response)=>{
            console.log(response.data);
            setCartItems(response.data);
        }).catch(function(error){
            console.log(error);
        })
    };

    const getTotalForCart = () =>{
        setTotalForCart(0);
        axios.get(`http://localhost:8080/cart/getTotalCostForCart/${loggedInUserId}`, {withCredentials: true})
        .then((response)=>{
            console.log(response.data);
            setTotalForCart(response.data[0].total_cost_in_cart);
        }).catch(function(error){
            console.log(error);
        })
    }

    const getUserPayment = () =>{
        axios.get(`http://localhost:8080/users/getUserPayment/${loggedInUserId}` ,   {withCredentials: true})
        .then((response)=>{
            console.log(response.data);
            setUserPayment(response.data);
        }).catch(function(error){
            console.log(error);
        })
    };  
    
    useEffect(()=> getData(), []);
    useEffect(()=> getTotalForCart(), []);
    useEffect(()=> getUserPayment(), []);

    let cartItemsHtml;
    if(cartItems.length == 0){
        cartItemsHtml = 
    <div>
    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex justify-content-center mt-4">
                <div class="alert alert-primary d-flex align-items-center mt-4" role="alert">
                    <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Info:"><ImNotification/></svg>
                    <div>
                    There are no items in your cart
                    </div>
                </div>
    </div>
    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex justify-content-center mt-4">
    <p className="link-dark">Browse <Link to={"/products"}>products</Link> or check on your <Link to={`/orders/${loggedInUserId}`}>order history</Link></p>

    </div>
    </div>
    }else if(cartItems.length > 0){
        
        cartItemsHtml = 
        <div>
        {cartItems.map((cartItem, i)=>(
            <div className="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-12 mt-2">
                <div class="card border-light w-85 p-3" style={cardStyle}>
                    <div className="row">
                        <div className="col-4 col-sm-4 col-md-4 col-lg-6 col-xl-6" align="center">
                            <img src={cartItem.product_img} height="180"  class="w-80 p-2" alt="..."/>
                        </div>
                        <div className="col-8 col-sm-8 col-md-8 col-lg-6 col-xl-6">
                            <div class="">
                                <div className="h-25">
                                    <h5 class="lead">{cartItem.name}</h5>
                                </div>
                                <div className="h-75 mt-2">
                                <small className="d-block text-success">{isInStock(cartItem.quantity)}</small>
                                    <small className="d-block"><span className="fw-bold">Price:</span> <span className="text-success fw-bold">$</span>{cartItem.price}</small>
                                    <small className="d-block"><span className="fw-bold">Quantity:</span> {cartItem.quantity} <span className="text-success fw-bold">in your cart</span></small>
                                    <small className="d-block"><span className="fw-bold">Total:</span> <span className="text-success fw-bold">$</span>{cartItem.total_price}</small>
                                    <div className="row justify-content-end">
                                        <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                            <button onClick={() =>{
                                                axios.delete(`http://localhost:8080/cart/deletecartitem/${cartItem.id}`)
                                                .then(function(response){
                                                    console.log(response);
                                                    snackbar.showMessage('Item successfully removed from cart!')
                                                    getData();
                                                    getTotalForCart();
                                                }).catch(function(error){
                                                    console.log(error);
                                                })
                                            }}  className="btn mt-2"><FaTrash size={15}/></button>
                                        </div>
                                    </div>

                                </div>
                            </div>    
                        </div>
                    </div>
                </div>
            </div>
            ))}
            </div>
    }
    
    let cartItemsTotal;
    if(cartItems.length > 0){
        cartItemsTotal = 
        <div className="row mt-2">
            <h4 className="lead mt-4">Subtotal ({numberOfItems(cartItems.length)}) : <span className="text-success fw-bold">$</span>{totalForCart}</h4>
            <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8" align="center">
                    <button className="btn btn-dark mt-4" onClick={() =>{
                        cartItems.map((cartItem, i)=>(
                                            axios.post(`http://localhost:8080/orders/addOrder`, {
                                                user_id: loggedInUserId,
                                                product_id: cartItem.product_id,
                                                total: cartItem.total_price,
                                                quantity: cartItem.quantity,
                                                user_payment_id: userPayment[0].id
                                            })
                                            .then(function(response){
                                                console.log(response);
                                                snackbar.showMessage("You're all set! Go to orders to see the status of your orders");
                                                setCartItems([]);
                                            }).catch(function(error){
                                                console.log(error);
                                            })
                        ))
                    }}
                    
                    >
                        <span className="text-success">Checkout</span>
                    </button>
                </div>
            </div>
   
    }else{
        cartItemsTotal = 
        <div className="row mt-2">
            <h4 className="lead mt-4">Subtotal (0 items) : <span className="text-success fw-bold">$</span>0</h4>
            <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8" align="center">
                    <button className="btn btn-dark mt-4" disabled >
                        <span className="text-success">Checkout</span>
                    </button>
                </div>
            </div>
    }
    
    function isInStock(quantity){
        if(quantity > 0){
            return "In Stock"
        }else if (quantity == 0){
            return "Not In Stock"
        }
    }

    function numberOfItems(quantity){
        if(quantity == 1){
            return quantity + " item"
        }else if (quantity > 1){
            return quantity + " items"
        }
    }
    return(
        <div >
        <div className="row container mt-4 justify-content-center">
            <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-11">
                <h4 className="display-6">Shopping Cart</h4>
                <small>Items saved in your cart</small>
            </div>
        </div>
        <div className="row justify-content-center mt-4">
            <div className="col-12 col-sm-8 col-md-6 col-lg-8 col-xl-8">
                
                <div className="row justify-content-center container mt-4">
                {cartItemsHtml}
                </div>
            </div>
            <div className="col-8 col-sm-8 col-md-5 col-lg-4 col-xl-3">
                {cartItemsTotal}
            </div>
        </div>
        
    </div>
    )
}

export default Cart;