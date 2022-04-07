import React, {useEffect, useState} from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'material-ui-snackbar-provider';
import {ImNotification} from 'react-icons/im'

function Orders({userId,username,loggedIn}){
    const cardStyle = {height: "200px"};
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

    function convertTime(time){
        var newTime = new Date(time);
        const realTime = newTime.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'})
        return realTime;
    }

    function disguiseCardNumber(cardNum){
        return cardNum.replace(/\d(?=(?:\D*\d){4})/g, "*");
    }

    let orderInfo;
    if(orders.length > 0){
        orderInfo =  
        <div>
            {orders.map((order, i)=>( 
            <div className="row justify-content-center">              
                <div key={i} className="col-8 col-sm-10 col-md-8 col-lg-8 col-xl-6 mt-4"  align="center">
                    <div className="row border" style={cardStyle}>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <div className="row">
                        <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                <small className="d-block fw-bold mt-4 lead">{order.name}</small> 
                                <small className="d-block">Quantity: {order.quantity}</small>
                                <small>Charged to your <span className="fw-bold">{order.payment_type}</span> </small>
                                <small className="d-block">Account ending in: {disguiseCardNumber(order.account_number)}</small>
                        </div>
                        <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                            <small className="d-block mt-4">Order ID: {order.id}</small>
                            <small className="d-block">Order placed: {convertTime(order.created_at)}</small>
                            <small className="d-block">Shipped to {order.first_name} {order.last_name}</small>
                            <small className="d-block">Total: <span className="fw-bold">${order.total}</span></small>
                        </div>
                            
                        </div>                            
                    </div>    
                </div>
            </div> 
        </div>
        ))}
    </div>

    }else if(orders.length == 0){
        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="alert alert-primary d-flex align-items-center mt-4" role="alert">
                        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Info:"><ImNotification/></svg>
                            <div>
                                You don't have any orders yet
                            </div>
                    </div>
                </div>                               
            </div>                            
        </div> 
    }
    useEffect(()=> getData(), []);

    return(
        <div>
            <div className="row gx-5 justify-content-center mt-4">
                <div className="col-8 col-sm-10 col-md-8 col-lg-8 col-xl-8 mt-4" >
                    <h1 className="display-5">Orders</h1>
                </div>
            {orderInfo}
            </div>
        </div>
    )
}

export default Orders;