import React, {useEffect, useState} from 'react';
import axios from "axios";
import {BiFilterAlt} from 'react-icons/bi';
import { Link, useParams } from 'react-router-dom';
import { useSnackbar } from 'material-ui-snackbar-provider';

function AllProducts({userId,username,loggedIn}){
    const cardStyle = {height: "400px"};
   
    const [products, setProducts] = useState([]);
    const [productCategory, setProductCategory] = useState([]);


    const getData = () =>{
        axios.get("http://localhost:8080/products/getAllProductInformation",   {withCredentials: true})
        .then((response)=>{
            console.log(response);
            setProducts(response.data.products);
        }).catch(function(error){
            console.log(error);


        })
    };
    
    const getProductCategories = () =>{
        axios.get("http://localhost:8080/products/getProductCategories",   {withCredentials: true})
        .then((response)=>{
            console.log(response.data);
            setProductCategory(response.data);
        }).catch(function(error){
            console.log(error);
        })
    };

    useEffect(()=> getData(), []);
    useEffect(()=> getProductCategories(), []);

    const filterByCategory = (e) =>{
        console.log(e.target.value);
        if(e.target.value == "resetFilter"){
            getData();
        }else{
        let id = parseInt(e.target.value);

        axios.get(`http://localhost:8080/products/getProductsByCategory/${id}`)
            .then(function(response){
                console.log(response);
                // snackbar.showMessage('Item successfully removed from cart!')
                setProducts(response.data);
            }).catch(function(error){
                console.log(error);
            })
        }
    }
    
    const filterByPrice = (e) =>{
        console.log(e.target.value);
        if(e.target.value == "resetFilter"){
            getData();
        }else{
        let id = parseInt(e.target.value);

        axios.get(`http://localhost:8080/products/getProductsByPrice/${id}`)
            .then(function(response){
                console.log(response);
                // snackbar.showMessage('Item successfully removed from cart!')
                setProducts(response.data);
            }).catch(function(error){
                console.log(error);
            })
        }
    }
    
    
    return(
        <div >
            <div className="row container mt-4 justify-content-center">
                <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-11">
                    <h4 className="display-6">Products</h4>
                    <small>Browse products and add items to cart</small>
                </div>
            </div>
            <div className="row justify-content-center mt-4">
                <div className="col-8 col-sm-8 col-md-5 col-lg-4 col-xl-3">
                    <div className="container">
                    <h4 className="lead mt-3">Filter</h4>
                    </div>
                    <div className="row container mt-5">
                        <label className="form-label mt-4">Category <BiFilterAlt/></label>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-10"  align="center">
                            <select onChange={filterByCategory} class="form-select" multiple aria-label="multiple select example">
                                <option value="resetFilter">All Products</option>
                                {productCategory.map((category, i)=>(
                                <option value={category.id}>{category.name}</option>
                                ))}
                            </select>
                        </div>

                    </div>
                    <div className="row container mt-4">
                        <label className="form-label">Price <BiFilterAlt/></label>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-10"  align="center">
                            <select onChange={filterByPrice} class="form-select" multiple aria-label="multiple select example">
                                <option value="resetFilter">All Prices</option>
                                <option value="5">Under $5</option>
                                <option value="10">Under $10</option>
                                <option value="20">Under $20</option>
                                <option value="30">Under $30</option>
                            </select>
                        </div>

                    </div>
                    
                </div>
                <div className="col-12 col-sm-8 col-md-6 col-lg-8 col-xl-8">
                <h4 className="lead mt-3">Results ({products.length})</h4>
                    <small>Price and other details may vary based on product size and color</small>
                    <div className="row container mt-4">
                    {products.map((product, i)=>(
                    <div className="col-8 col-sm-10 col-md-8 col-lg-6 col-xl-4 mt-2">
                        <Link className="text-decoration-none link-dark" to={`/products/${product.id}`}>
                        <div class="card border-light w-85 p-3" style={cardStyle}>
                            <img src={product.product_img} height="180"  class="w-80 p-2" alt="..."/>
                            <div class="card-body">
                                <div className="h-25">
                                    <h5 class="lead">{product.name}</h5>
                                </div>
                                <div className="h-75 mt-4">
                                    <small class="card-text fw-bold">{product.category}</small>
                                    <p className="fw-bold"><span className="text-success fw-bold">$</span>{product.price}</p>
                                    <small>{product.quantity} <span className="text-danger fw-bold">left</span></small>
                                </div>
                            </div>
                        </div>
                        </Link>
                    </div>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllProducts;