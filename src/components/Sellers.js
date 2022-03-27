import React, {useEffect, useState} from "react";
import axios from "axios";
import {GiFarmer} from 'react-icons/gi'

function Sellers(){
    const cardStyle = {height: "200px"};
    const [data, setData] = useState([]);
    const getData = () =>{

    
    axios.get("http://localhost:8080/sellers/getAllSellers")
    .then((response)=>{
        console.log(response.data);
        setData(response.data);
    })
};
useEffect(() => getData(), []);
    return(
        <div>
             <header className="sellersHeader d-flex align-items-center justify-content-center">
                <h1 className=" display-6 text-center text-light">Welcome to the Farmer Seller Center</h1>
            </header>
        
            <div className="row gx-5 justify-content-center mt-4">
                {data.map((seller)=>(
                    <div className="col-8 col-sm-10 col-md-6 col-lg-4 col-xl-4 mt-4" >
                        <div className="row border" style={cardStyle}>
                            <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4" align="center">

                            <svg className="bi d-block mx-auto mb-1 mt-4" width="24" height="24"><GiFarmer size={25}/></svg>
                                <p>{seller.username}</p>
                            
                            </div>
                            <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                            
                                <small className="d-block">{seller.firstname} {seller.lastname}</small>
                                <small className="d-block">{seller.description}</small>
                                <small className="d-block">{seller.city}, <span className="fw-bold">{seller.state}</span></small>
                                <small className="d-block">{seller.country}</small>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Sellers;