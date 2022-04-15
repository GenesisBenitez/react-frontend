import React, {useEffect, useState} from 'react';
import axios from "axios";
import { useParams, Link } from 'react-router-dom';
import { useSnackbar } from 'material-ui-snackbar-provider';
import {ImNotification} from 'react-icons/im'
import {BiFilterAlt} from 'react-icons/bi';
import { FaUserCircle , FaCcMastercard, FaCcVisa, FaCcDiscover, FaCcAmex } from 'react-icons/fa';

function Orders({userId,username,loggedIn}){
    const cardStyle = {height: "250px"};
    let {id}  = useParams();

    
    const [loggedInUserId, setLoggedInUserId] = useState(id);
    const [orders, setOrders] = useState([]);

    const snackbar = useSnackbar();

    const getData = () =>{
        setOrders([]);
        let idParsed = parseInt(id);
        axios.get(`http://localhost:8080/orders/getordersbyuserid/${idParsed}`,   {withCredentials: true})
        .then((response)=>{
            console.log(response.data);
            setOrders(response.data);
        }).catch(function(error){
            console.log(error);
        })
    };
    const filterOrders = (e) =>{
        console.log(e.target.value);
        // let orderParams = e.target.value.split(",");
        // console.log(orderParams[0]);
        // console.log(orderParams[1]);


        axios.post(`http://localhost:8080/orders/getOrdersByUserIdFilter/${id}`, {
            date: e.target.value
        })
            .then(function(response){
                console.log(response);
                setOrders([]);
                setOrders(response.data);
            }).catch(function(error){
                console.log(error);
            })
        
    }
    function convertTime(time){
        var newTime = new Date(time);
        const realTime = newTime.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'})
        return realTime;
    }

    function disguiseCardNumber(cardNum){
        return cardNum.replace(/\d(?=(?:\D*\d){4})/g, "*");
    }

    function getLastFourDigits(cardNum){
        return cardNum.substr(cardNum.length - 4);
    }

    function getCardIcon(card){
        if(card == "Visa"){
            return <FaCcVisa/>
        }else if(card == "Discover"){
            return <FaCcDiscover/>
        }else if(card == "Mastercard"){
            return <FaCcMastercard/>
        }else if(card == "American Express"){
            return <FaCcAmex size={100}/>
        }
    }

    let orderInfo;
    if(orders.length > 0){
        orderInfo =  <div>
            {orders.map((order, i)=>( 
            <div className="row justify-content-center">    
            <div className="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-12 mt-2">
                <div class="card border-light w-85 p-3" style={cardStyle}>
                    <div className="row">
                        <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                            <small>Order Placed:</small>
                            <small className="d-block">{convertTime(order.created_at)}</small>
                        </div>
                        <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                            <small>Total:</small>
                            <small className="d-block"><span className="text-success">$</span>{order.total}</small>
                        </div>
                        <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                            <small>Shipped to:</small>
                            <small className="d-block">{order.first_name} {order.last_name}</small>  
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4 col-sm-4 col-md-4 col-lg-6 col-xl-4" align="center">
                            <img src={order.product_img} height="180"  class="w-80 mw-100 p-3" alt="..."/>
                        </div>
                        <div className="col-8 col-sm-8 col-md-8 col-lg-6 col-xl-8">
                            <div class="">
                                <div className="h-25">
                                    
                                </div>
                                <div className="h-75 mt-2">
                                    <small className="d-block"><span className="fw-bold">Order ID:</span> {order.orderId}</small>
                                    <small className="d-block"><span>Quantity:</span> {order.quantity}</small>
                                    <small className="d-block">Charged to your <span className="fw-bold">{order.payment_type} {getCardIcon(order.payment_type)}</span> </small>                                    
                                    <small className="d-block">Account ending in: <span className="fw-bold">{getLastFourDigits(order.account_number)}</span></small>
                                </div>
                            </div>    
                        </div>
                    </div>
                </div>
            </div>          
            </div>
        ))}
    </div>

    }else if(orders.length == 0){
 orderInfo = <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-8" align="center">
                            <div className="row">
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <div class="alert alert-primary d-flex align-items-center mt-4" role="alert">
                                <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Info:"><ImNotification/></svg>
                                <div>
                                You don't have any orders
                                </div>
                            </div>
                            </div>
                            <p className="link-dark">Browse <Link to={"/products"}>products</Link> or check your <Link to={`/cart/${loggedInUserId}`}>cart</Link> and checkout</p>
                        
                            </div>                            
                        </div> 
    }
    useEffect(()=> getData(), []);

    
    return(
        <div >
        <div className="row container mt-4 justify-content-center">
            <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-11">
                <h4 className="display-6">Orders</h4>
                <small>Track all your orders in one place</small>
            </div>
        </div>
        <div className="row justify-content-center mt-4">
            <div className="col-8 col-sm-8 col-md-5 col-lg-4 col-xl-4">
                <div className="row container mt-4 justify-content-center">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-8"  align="center">
                        <label className="form-label mt-4">Filter orders by date <BiFilterAlt/></label>
                        {/* <select onChange={filterOrders} class="form-select" multiple aria-label="multiple select example">
                            <option value="orders.total,ASC">Price Ascending</option>
                            <option value="orders.total,DESC">Price Descending</option>
                            <option value="orders.created_at,ASC">Date Ascending</option>
                            <option value="orders.created_at,DESC">Date Descending</option>
                        </select> */} 
                        <input type="date" class="form-select" onChange={filterOrders}/>
                    </div>

                </div>
                
            </div>
            <div className="col-12 col-sm-8 col-md-6 col-lg-8 col-xl-8">
                <div className="row container mt-4">
                {orderInfo}
                </div>
            </div>
        </div>
    </div>
    )
}

export default Orders;
