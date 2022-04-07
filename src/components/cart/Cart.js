import React, {useEffect, useState} from 'react';
import axios from "axios";
import { useParams, Link } from 'react-router-dom';
import {FaTrash} from 'react-icons/fa';
import { useSnackbar } from 'material-ui-snackbar-provider';
import {ImNotification} from 'react-icons/im'

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
        axios.get(`http://localhost:8080/cart/getcartbyuserid/${loggedInUserId}`, {withCredentials: true})
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
        axios.get(`http://localhost:8080/users/getUserPayment/${loggedInUserId}` , {withCredentials: true})
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
    }
    
let cartItemsTotal;
    if(cartItems.length > 0){
        cartItemsTotal = <div className="col-10 col-sm-10 col-md-6 col-lg-6 col-xl-6 d-flex justify-content-end">
        <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mt-4">
                <h3 className="mt-4 lead">Total: ${totalForCart}</h3>
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
                
                >Checkout</button>
            </div>
        </div>

        </div>
    }
    
    return(
        <div>
        <div className="row gx-5 justify-content-center mt-4">
            <div className="col-8 col-sm-10 col-md-8 col-lg-8 col-xl-8 mt-4 " >
                <h1 className="display-5">Shopping Cart ({cartItems.length})</h1>
            </div>
            <div className="col-10 col-sm-10 col-md-10 col-lg-6 col-xl-6 mt-4" >

            {cartItems.map((cartItem, i)=>(      
            <div className="row justify-content-center">         
                <div key={i} className="col-10 col-sm-10 col-md-10 col-lg-12 col-xl-12 mt-4" >
                    <div className="row border" style={cardStyle}>
                        <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 d-flex align-items-center" align="center">
                            <img width="100%" height="130" src={cartItem.product_img}/>
                        </div>  
                        <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                            <div className="row mt-4">
                                <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                                    <small className="d-block mt-4 lead">{cartItem.name}</small>
                                    <small className="d-block">Category: <span className="fw-bold">{cartItem.category}</span></small>
                                    <small className="d-block"><span className="fw-bold">{cartItem.quantity}</span> in your cart</small>
                                </div>
                                <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                    <small className="d-block fw-bold mt-4 lead"><span className="text-success fw-bold">$</span>{cartItem.total_price}</small> 
                                </div>
                            </div>
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
                                    }}  className="btn btn-light"><FaTrash size={25}/></button>
                                </div>
                            </div>
                            
                        </div>    
                    </div>
                </div> 
            </div>
            ))}
        </div>
        <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 mt-4" align="center" >
            {cartItemsTotal}
        </div>
                {cartItemsHtml}
        </div>

        </div>
    )
}

export default Cart;