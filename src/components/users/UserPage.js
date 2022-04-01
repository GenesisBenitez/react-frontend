import React, {useEffect, useState} from "react";
import axios from "axios";
import {GiFarmer} from 'react-icons/gi'
import { Link, useParams } from "react-router-dom";

function UserPage({userId, username}){
    const cardStyle = {height: "250px"};
    let {id} = useParams();
    const [user, setUser] = useState([]);
    const getData = () =>{

    
    axios.get(`http://localhost:8080/users/getUserInformation/${userId}`, {withCredentials:true})
    .then((response)=>{
        console.log(response)
        setUser(response.data[0]);
    }).catch((error)=>{
        console.log(error);
    })
};
useEffect(() => getData(), []);
    return(
       <div className="row justify-content-center">
            <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8" align="center">
                <h4>{user.username}</h4>
                <p>{user.first_name} {user.last_name}</p>
                <p>{user.street_address}</p>
                <p>{user.city}, {user.postal_code}</p>
                <p>{user.country}</p>
                <p>{user.payment_type}</p>
            </div> 
        </div>
      
    )
}

export default UserPage;