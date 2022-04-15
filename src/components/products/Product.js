import React, {useEffect, useState} from 'react';
import axios from "axios";
import {BiFilterAlt} from 'react-icons/bi';
import { Link, useParams } from 'react-router-dom';
import { useSnackbar } from 'material-ui-snackbar-provider';

function Product({userId,username,loggedIn}){
    let {id}  = useParams();

    const [product, setProduct] = useState([]);
    const [quantity, setQuantity] = useState([]);

    const snackbar = useSnackbar();

    const getData = () =>{
        axios.get(`http://localhost:8080/products/getProduct/${id}`,   {withCredentials: true})
        .then((response)=>{
            console.log(response);
            setProduct(response.data[0]);
        }).catch(function(error){
            console.log(error);


        })
    };
    

    useEffect(()=> getData(), []);


    const firstStyle={height: "300px", width: "100%"}
    return(
        <div >
            
            <div className="row justify-content-center">
                
                <div className="col-12 col-sm-8 col-md-6 col-lg-8 col-xl-10">
                    <div className="row container mt-4">
                        <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                            <h4 className="display-6">Products</h4>
                            <small>Browse products and add items to cart</small>
                            <nav aria-label="breadcrumb">
                            <ol class="breadcrumb mt-3">
                                <li class="breadcrumb-item "><Link className="text-decoration-none link-dark" to={'/products'}>Products</Link></li>
                                <li class="breadcrumb-item active" aria-current="page">{product.name}</li>
                            </ol>
                            </nav>

                        </div>
                    </div>
                        <div class="row mt-4">
                            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 order-lg-2 order-xl-2 mt-4 ">
                                <div class="container-fluid">
                                    <div class="d-flex justify-content-center" style={firstStyle}>
                                        <div class="col-lg-10 col-xl-7">
                                            <img src={product.product_img}  alt="" className="mw-100 mh-100" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 order-lg-1 order-xl-1 mt-4 ">
                                <div class="container">
                                    <div class="row justify-content-end">
                                        <div class="col-xs-12 col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8">
                                            <h1 class="display-6">{product.name}</h1>
                                            <small class="fw-bold">
                                                <span className="text-success">$</span>{product.price}
                                            </small>
                                            <small class=" d-block mt-2">
                                                {product.quantity}<span className="text-danger"> left</span>
                                            </small>
                                            <small class="d-block mt-4">
                                                {product.description}
                                            </small>
                                            <form onSubmit={(e)=>{ 
                                                    e.preventDefault();
                                                    let quantityValue = parseInt(quantity);
                                                    console.log(product.id, userId, quantityValue);
                                                    axios.post('http://localhost:8080/cart/addproducttocart', {
                                                        user_id: userId,
                                                        product_id: product.id,
                                                        quantity: quantityValue
                                                    } , {withCredentials: true})
                                                    .then(function(response){
                                                        console.log(response);
                                                        snackbar.showMessage('Item has been added to your cart');
                                                    }).catch(function(error){
                                                        console.log(error);
                                                    })
                                                    }}
                                                >
                                            <div className="row mt-4">

                                            <div className="col-5 col-sm-4 col-md-4 col-lg-4 col-xl-6">
                                                <select required className="form-select" aria-label="Default select example" onChange={(e)=> setQuantity(e.target.value)}>
                                                    <option disabled defaultValue>QTY: 0</option>
                                                    {Array.from(Array(product.quantity), (error, i)=>{
                                                        if(i !== 0){
                                                            return <option value={i}>{i}</option>
                                                        }
                                                    })}
                                                </select>
                                            </div>
                                            <div className="col-7 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                                <button  className="btn btn-dark">Add to cart</button>
                                            </div>
                                        </div>
                                        </form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                </div>
            </div>
        </div>
    )
}

export default Product;