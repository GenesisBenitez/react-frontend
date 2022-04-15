import axios from "axios";
import React, {useEffect, useState} from 'react';
import {GiFruitBowl} from 'react-icons/gi';
import { FaUserCircle } from 'react-icons/fa';
import {BsFillCartCheckFill} from 'react-icons/bs'
function Home(){
    const cardStyle = {height: "350px", width: "300px"};
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);

    const getProducts = () =>{
        axios.get("http://localhost:8080/products/getAllProductInformation",   {withCredentials: true})
        .then((response)=>{
            console.log(response);
            setProducts(response.data.products);
        }).catch(function(error){
            console.log(error);


        })
    };
    const getUsers = () =>{
        axios.get(`http://localhost:8080/users/getAllUsers` ,   {withCredentials: true})
        .then((response)=>{
            console.log(response.data);
            setUsers(response.data);
        }).catch(function(error){
            console.log(error);
        })
    };



    const getOrders = () =>{
        setOrders([]);
        axios.get(`http://localhost:8080/orders/getAllOrders`,   {withCredentials: true})
        .then((response)=>{
            console.log(response.data);
            setOrders(response.data);
        }).catch(function(error){
            console.log(error);
        })
    };
    useEffect(()=> getProducts(), []);
    useEffect(()=> getUsers(), []);
    useEffect(()=> getOrders(), []);

    return(
        <div >
        <div className="row container mt-4 justify-content-center">
            <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-11">
                <h4 className="display-6">Home</h4>
                <small>Welcome to <span className="fw-bold">Earthly Fruits©</span></small>
            </div>
        </div>
        <div className="row justify-content-center mt-4" >
            <div className="col-12 col-sm-8 col-md-6 col-lg-8 col-xl-4 mt-4" align="center">
                <h4 className="lead mt-3">Products</h4>
                    <div class="card border-light w-85 p-3" style={cardStyle}>
                        <div className="w-80 p-2">
                            <GiFruitBowl  size={140}/>
                        </div>
                        <div class="card-body">
                            <div className="h-75 mt-4">
                                <p className="lead">{products.length} products</p>
                                <small>Browse our products, add them to your cart, and checkout.</small>

                            </div>
                        </div>
                    </div>
            </div>
            <div className="col-12 col-sm-8 col-md-6 col-lg-8 col-xl-4 mt-4" align="center">
                <h4 className="lead mt-3">Users</h4>
                    <div class="card border-light w-85 p-3" style={cardStyle}>
                        <div className="w-80 p-2">
                            <FaUserCircle  size={140}/>
                        </div>
                        <div class="card-body">
                            <div className="h-75 mt-4">
                                <p className="lead">{users.length} users</p>
                                <small>Go to the user page to update your profile after registration.</small>

                            </div>
                        </div>
                    </div>
            </div>
            <div className="col-12 col-sm-8 col-md-6 col-lg-8 col-xl-4 mt-4" align="center">
                <h4 className="lead mt-3">Orders</h4>
                    <div class="card border-light w-85 p-3" style={cardStyle}>
                        <div className="w-80 p-2">
                            <BsFillCartCheckFill  size={140}/>
                        </div>
                        <div class="card-body">
                            <div className="h-75 mt-4">
                                <p className="lead">{orders.length} transactions</p>
                                <small>Go to the orders page after logging in to track all your orders!</small>

                            </div>
                        </div>
                    </div>
            </div>
        </div>
        </div>
    )
}

export default Home;