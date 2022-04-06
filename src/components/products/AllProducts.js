import React, {useEffect, useState} from 'react';
import axios from "axios";
import {BiFilterAlt} from 'react-icons/bi';
import { useSnackbar } from 'material-ui-snackbar-provider';

function AllProducts({userId,username,loggedIn}){
    const cardStyle = {height: "250px"};
    const descriptionStyle = {height: "110px", overflow: "scroll"}
    const imgStyle = {height: "60%", overflow:"hidden"}
    const [products, setProducts] = useState([]);
    const [quantity, setQuantity] = useState([]);
    const [productCategory, setProductCategory] = useState([]);

    const snackbar = useSnackbar();

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
    
    return(
        <div>
        
        <div className="row gx-5 justify-content-center mt-4">
            <div className="col-8 col-sm-10 col-md-8 col-lg-8 col-xl-8 mt-4" >
                <h1 className="display-5">Products</h1>
            </div>
            <div className="col-8 col-sm-10 col-md-8 col-lg-8 col-xl-8 mt-4" >
            <div className="row mt-3 justify-content-end">
            <label className='col-sm-1 col-md-1 col-lg-1 col-xl-1 mt-1'><BiFilterAlt/></label>
                <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    
                    <select required className="form-select" aria-label="Default select example" onChange={filterByCategory}>
                        <option disabled defaultValue>Filter by Category</option>
                        <option value="resetFilter">Reset Filer</option>
                        {productCategory.map((category, i)=>(
                            <option value={category.id} >{category.name}</option>
                            
                        ))}
                    </select>
                </div>
              
            </div>
            </div>
            {products.map((product, i)=>(
                <div key={i} className="col-8 col-sm-10 col-md-8 col-lg-8 col-xl-8 mt-4" >
                    <div className="row border" style={cardStyle} >
                        <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 d-flex align-items-center" align="center">
                            <div className="d-flex align-items-center justify-content-center" style={imgStyle}>
                                <img className="mh-100 mw-90" src={product.product_img} className="card-img-top" alt="..." />
                            </div>
                        </div>  
                        <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                            <small className="d-block mt-4">{product.name}</small>
                            <div style={descriptionStyle}>
                                <small className="d-block mt-4 text-break">{product.description}</small>
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
                                } , {withCredentials: true})
                                .then(function(response){
                                    console.log(response);
                                    snackbar.showMessage('Item has been added to your cart');
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
                                                if(i !== 0){
                                                    return <option value={i}>{i}</option>
                                                }
                                            })}
                                        </select>
                                    </div>
                                    <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                        <button  className="btn btn-dark">Add to cart</button>
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