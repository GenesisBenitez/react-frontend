import React, {useEffect, useState} from "react";
import axios from "axios";
import {GiFarmer} from 'react-icons/gi'
import { Link } from "react-router-dom";

function AllProducts(){
    const cardStyle = {height: "250px"};
    const [products, setProducts] = useState([]);
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
             <header className="sellersHeader d-flex align-items-center justify-content-center">
                <h1 className=" display-6 text-center text-light">Welcome to the Farmer Seller Center</h1>
            </header>
        
            <div className="row gx-5 justify-content-center mt-4">
                {products.map((product)=>(
                    <div className="col-8 col-sm-10 col-md-6 col-lg-4 col-xl-4 mt-4" >
                        
                        <div className="row border" style={cardStyle}>
                            <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4" align="center">

                            <svg className="bi d-block mx-auto mb-1 mt-4" width="24" height="24"><GiFarmer size={25}/></svg>
                            <Link to={`/product/${product.id}`}>
                                <p>{product.name}</p>
                                </Link>
                            </div>
                            <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                            
                                <small className="d-block">{product.name}</small>
                                <small className="d-block">{product.description}</small>
                                <small className="d-block">{product.quantity}<span className="text-danger"> left</span></small>
                                <small className="d-block"><span className="text-success fw-bold">$</span>{product.price}</small>
                            </div>
                        </div>
            
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AllProducts;