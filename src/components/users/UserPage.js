import React, {useEffect, useState} from "react";
import axios from "axios";
import {GiFarmer} from 'react-icons/gi'
import {FaUserCircle} from 'react-icons/fa'
import { Link, useParams } from "react-router-dom";

function UserPage({userId, username}){
    const cardStyle = {height: "250px"};
    const mainIconStyle = {color: "#80b51c"}
    let {id} = useParams();
    const [loggedInUserId, setLoggedInUserId] = useState(id);
    const [user, setUser] = useState([]);
    const getData = () =>{

    
    axios.get(`http://localhost:8080/users/getUserInformation/${loggedInUserId}`, {withCredentials:true})
    .then((response)=>{
        console.log(response)
        setUser(response.data[0]);
    }).catch(function(error){
        console.log(error);
    })
};
function convertTime(time){
    var newTime = new Date(time);
    const realTime = newTime.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    return realTime;
}
useEffect(() => getData(), []);
    return(
       <div className="row justify-content-center">
           <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                <h4 className="display-5 mt-4">Account</h4>
           </div>
            <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 mt-4" align="center">
            <div className="row justify-content-center ">
                <FaUserCircle size={100}  className="mt-4" style={mainIconStyle}/>
                <h4 className="display-6">{user.username}</h4>
            </div>
         
            </div> 
            <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 mt-4">
            <h4 className="display-6 mt-4">{user.first_name} {user.last_name}</h4> 
            <p>Member since {convertTime(user.created_at)}</p>
            <h4 className=" lead mt-4">Personal Information:</h4>
            <div className="mt-4">
                <small className="mt-4">Address:</small>
            </div>
            <small className="d-block mt-2">{user.street_address}</small>
            <small>{user.city}, {user.state} {user.postal_code}</small>
            <small className="d-block">{user.country}</small>
            </div> 
        </div>
      
    )
}

export default UserPage;