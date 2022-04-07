import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from 'react-router-dom';
import { FaUserCircle , FaCcMastercard, FaCcVisa, FaCcDiscover, FaCcAmex } from 'react-icons/fa';
import DatePicker from 'react-date-picker';
import { useSnackbar } from 'material-ui-snackbar-provider';

function UserPage({userId,username}){
    const mainIconStyle = {color: "#80b51c"}
    let {id} = useParams();

    const snackbar = useSnackbar();
    const [loggedInUserId, setLoggedInUserId] = useState(id);
    const [user, setUser] = useState([]);
    const [userAddress, setUserAddress] = useState([]);
    const [userPayment, setUserPayment] = useState([]);
    const [productCategories, setProductCateories] = useState([]);

 //update address fields

    const [street_address, setStreet_address] = useState("");
    const [city, setCity] = useState("");
    const [postal_code, setPostal_code] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
 
 //update payment fields

    const [payment_type, setPayment_type] = useState("");
    const [account_number, setAccount_number] = useState("");
    const [expiry, setExpiry] = useState("");
 
 //add product fields

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category_id, setCategory_id] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [product_img, setProduct_img] = useState("");

 //add product category fields

    const [productCategoryName, setProductCategoryName] = useState("");
    const [productCategoryDescription, setProductCategoryDescription] = useState("");

    const getUser = () =>{
        axios.get(`http://localhost:8080/users/getUser/${loggedInUserId}` , {withCredentials: true})
        .then((response)=>{
        console.log(response.data);
        setUser(response.data[0]);
        }).catch(function(error){
        console.log(error);
        })
    };
    const getUserAddress = () =>{
        axios.get(`http://localhost:8080/users/getUserAddress/${loggedInUserId}` , {withCredentials: true})
        .then((response)=>{
        console.log(response.data);
        setUserAddress(response.data);
        }).catch(function(error){
        console.log(error);
        })
    };

    const getUserPayment = () =>{
        axios.get(`http://localhost:8080/users/getUserPayment/${loggedInUserId}` , {withCredentials: true})
        .then((response)=>{
        console.log(response.data);
        setUserPayment(response.data);
        }).catch(function(error){
        console.log(error);
        })
    };

    const getProductCategories = () =>{
        axios.get(`http://localhost:8080/products/getAllProductCategories` , {withCredentials: true})
        .then((response)=>{
        console.log(response.data);
        setProductCateories(response.data);
        }).catch(function(error){
        console.log(error);
        })
    };
 function convertTime(time){
    var newTime = new Date(time);
    const realTime = newTime.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric'})
    return realTime;
    }
    useEffect(()=> getUser(), []);
    useEffect(()=> getUserAddress(), []);
    useEffect(()=> getUserPayment(), []);
    useEffect(()=> getProductCategories(), []);

    const handleAddressSubmit = (e) =>{
    e.preventDefault();
    axios.post("http://localhost:8080/users/registerUserAddress", {
        user_id: loggedInUserId,
        street_address: street_address,
        city: city,
        postal_code: postal_code,
        country: country,
        state: state
    }).then(function(response){
    console.log(response);
    window.location = `/profilepage/${loggedInUserId}`;
    }).catch(function(error){
    console.log(error);
    }) 
 }

    const handlePaymentSubmit = (e) =>{
    e.preventDefault();
    console.log({
        user_id: loggedInUserId,
        payment_type: payment_type,
        account_number: account_number,
        expiry: expiry
    });
    axios.post("http://localhost:8080/users/registerUserPayment", {
        user_id: loggedInUserId,
        payment_type: payment_type,
        account_number: account_number,
        expiry: expiry
    }).then(function(response){
    console.log(response);
    window.location = `/profilepage/${loggedInUserId}`;
    }).catch(function(error){
    console.log(error);
    })
 }

    const handleAddProductSubmit = (e) =>{
    e.preventDefault();
    console.log({
        name: name,
        description: description,
        category_id: category_id,
        price: price,
        quantity: quantity,
        product_img: product_img
    });
    axios.post("http://localhost:8080/products/addProduct", {
        name: name,
        description: description,
        category_id: category_id,
        price: price,
        quantity: quantity,
        product_img: product_img
    }).then(function(response){
    console.log(response);
    snackbar.showMessage('Product Successfully added');
    window.location = "/products"
     }).catch(function(error){
    console.log(error);
        })
    }

    const handleAddProductCategorySubmit = (e) =>{
    e.preventDefault();
    console.log({
        name: productCategoryName,
        description: productCategoryDescription
    });
    axios.post("http://localhost:8080/products/addProductCategory", {
        name: productCategoryName,
        description: productCategoryDescription
    }).then(function(response){
    console.log(response);
    snackbar.showMessage('Product Category Successfully added');
    window.location = "/products"
    }).catch(function(error){
    console.log(error);
        })
    }
 function disguiseCardNumber(cardNum){
    return cardNum.replace(/\d(?=(?:\D*\d){4})/g, "*");
    }
 //conditional html for user address
    let userAddressInfo;
    if(userAddress.length == 0){
        userAddressInfo = <div> 
        <div className="mt-4">
        </div>
         <small className="d-block">We do not have an address for you yet</small>
         <button type="button" className="btn btn-dark mt-3" data-bs-toggle="modal" data-bs-target="#addressmodal">
            Update address
        </button>
    </div>

    }else{
         userAddressInfo = <div> 
         <div className="mt-4">
            <small>Address:</small>
        </div>
        <small className="d-block mt-2">{userAddress[0].street_address}</small>
        <small>{userAddress[0].city}, {userAddress[0].state} {userAddress[0].postal_code}</small>
        <small className="d-block">{userAddress[0].country}</small>
        </div>
    }

 //conditional html for user payment
    let userPaymentInfo;
    if(userPayment.length == 0){
        userPaymentInfo = <div> 
        <div className="mt-4">
        </div>
            <small className="d-block">We do not have any payment information for you</small>
            <button type="button" className="btn btn-dark mt-3" data-bs-toggle="modal" data-bs-target="#paymentmodal">
            Update Payment
            </button>
        </div>
 
    }else{
    userPaymentInfo = 
        <div className="row justify-content-center"> 
            {userPayment.filter(payment => payment.payment_type === "MasterCard").map((payment, i)=>(
        <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 mt-4 mr-4">
            <FaCcMastercard size={50}/>
            <small className="d-block">{disguiseCardNumber(payment.account_number)}</small>
            <small className="d-block">{payment.expiry}</small>
        </div>
    ))}
        {userPayment.filter(payment => payment.payment_type === "Visa").map((payment, i)=>(
        <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 mt-4 mr-4">
            <FaCcVisa size={50}/>
            <small className="d-block">{disguiseCardNumber(payment.account_number)}</small>
            <small className="d-block">{payment.expiry}</small>
        </div>
    ))}
        {userPayment.filter(payment => payment.payment_type === "Discover").map((payment, i)=>(
        <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 mt-4 mr-4">
            <FaCcDiscover size={50}/>
            <small className="d-block">{disguiseCardNumber(payment.account_number)}</small>
            <small className="d-block">{payment.expiry}</small>
        </div>
    ))}
        {userPayment.filter(payment => payment.payment_type === "American Express").map((payment, i)=>(
        <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 mt-4 mr-4">
            <FaCcAmex size={50}/>
            <small className="d-block">{disguiseCardNumber(payment.account_number)}</small>
            <small className="d-block">{payment.expiry}</small>
        </div>
    ))}
    </div>
 }
 
    let addProductButton;
    if(user.admin != null && user.admin == 'Y'){
        addProductButton = <div>
        <button type="button" className="btn btn-dark float-end" data-bs-toggle="modal" data-bs-target="#addproductcategoryModal">
            Add Product Category
        </button>
        <button type="button" className="btn btn-dark float-end" data-bs-toggle="modal" data-bs-target="#addproductModal">
            Add Product
        </button>
    </div>
        }
    ///////////////////////COUNTRY LIST ARRAY//////////////////////
    const countryList = [
 "Afghanistan",
 "Albania",
 "Algeria",
 "American Samoa",
 "Andorra",
 "Angola",
 "Anguilla",
 "Antarctica",
 "Antigua and Barbuda",
 "Argentina",
 "Armenia",
 "Aruba",
 "Australia",
 "Austria",
 "Azerbaijan",
 "Bahamas (the)",
 "Bahrain",
 "Bangladesh",
 "Barbados",
 "Belarus",
 "Belgium",
 "Belize",
 "Benin",
 "Bermuda",
 "Bhutan",
 "Bolivia (Plurinational State of)",
 "Bonaire, Sint Eustatius and Saba",
 "Bosnia and Herzegovina",
 "Botswana",
 "Bouvet Island",
 "Brazil",
 "British Indian Ocean Territory (the)",
 "Brunei Darussalam",
 "Bulgaria",
 "Burkina Faso",
 "Burundi",
 "Cabo Verde",
 "Cambodia",
 "Cameroon",
 "Canada",
 "Cayman Islands (the)",
 "Central African Republic (the)",
 "Chad",
 "Chile",
 "China",
 "Christmas Island",
 "Cocos (Keeling) Islands (the)",
 "Colombia",
 "Comoros (the)",
 "Congo (the Democratic Republic of the)",
 "Congo (the)",
 "Cook Islands (the)",
 "Costa Rica",
 "Croatia",
 "Cuba",
 "Curaçao",
 "Cyprus",
 "Czechia",
 "Côte d'Ivoire",
 "Denmark",
 "Djibouti",
 "Dominica",
 "Dominican Republic (the)",
 "Ecuador",
 "Egypt",
 "El Salvador",
 "Equatorial Guinea",
 "Eritrea",
 "Estonia",
 "Eswatini",
 "Ethiopia",
 "Falkland Islands (the) [Malvinas]",
 "Faroe Islands (the)",
 "Fiji",
 "Finland",
 "France",
 "French Guiana",
 "French Polynesia",
 "French Southern Territories (the)",
 "Gabon",
 "Gambia (the)",
 "Georgia",
 "Germany",
 "Ghana",
 "Gibraltar",
 "Greece",
 "Greenland",
 "Grenada",
 "Guadeloupe",
 "Guam",
 "Guatemala",
 "Guernsey",
 "Guinea",
 "Guinea-Bissau",
 "Guyana",
 "Haiti",
 "Heard Island and McDonald Islands",
 "Holy See (the)",
 "Honduras",
 "Hong Kong",
 "Hungary",
 "Iceland",
 "India",
 "Indonesia",
 "Iran (Islamic Republic of)",
 "Iraq",
 "Ireland",
 "Isle of Man",
 "Israel",
 "Italy",
 "Jamaica",
 "Japan",
 "Jersey",
 "Jordan",
 "Kazakhstan",
 "Kenya",
 "Kiribati",
 "Korea (the Democratic People's Republic of)",
 "Korea (the Republic of)",
 "Kuwait",
 "Kyrgyzstan",
 "Lao People's Democratic Republic (the)",
 "Latvia",
 "Lebanon",
 "Lesotho",
 "Liberia",
 "Libya",
 "Liechtenstein",
 "Lithuania",
 "Luxembourg",
 "Macao",
 "Madagascar",
 "Malawi",
 "Malaysia",
 "Maldives",
 "Mali",
 "Malta",
 "Marshall Islands (the)",
 "Martinique",
 "Mauritania",
 "Mauritius",
 "Mayotte",
 "Mexico",
 "Micronesia (Federated States of)",
 "Moldova (the Republic of)",
 "Monaco",
 "Mongolia",
 "Montenegro",
 "Montserrat",
 "Morocco",
 "Mozambique",
 "Myanmar",
 "Namibia",
 "Nauru",
 "Nepal",
 "Netherlands (the)",
 "New Caledonia",
 "New Zealand",
 "Nicaragua",
 "Niger (the)",
 "Nigeria",
 "Niue",
 "Norfolk Island",
 "Northern Mariana Islands (the)",
 "Norway",
 "Oman",
 "Pakistan",
 "Palau",
 "Palestine, State of",
 "Panama",
 "Papua New Guinea",
 "Paraguay",
 "Peru",
 "Philippines (the)",
 "Pitcairn",
 "Poland",
 "Portugal",
 "Puerto Rico",
 "Qatar",
 "Republic of North Macedonia",
 "Romania",
 "Russian Federation (the)",
 "Rwanda",
 "Réunion",
 "Saint Barthélemy",
 "Saint Helena, Ascension and Tristan da Cunha",
 "Saint Kitts and Nevis",
 "Saint Lucia",
 "Saint Martin (French part)",
 "Saint Pierre and Miquelon",
 "Saint Vincent and the Grenadines",
 "Samoa",
 "San Marino",
 "Sao Tome and Principe",
 "Saudi Arabia",
 "Senegal",
 "Serbia",
 "Seychelles",
 "Sierra Leone",
 "Singapore",
 "Sint Maarten (Dutch part)",
 "Slovakia",
 "Slovenia",
 "Solomon Islands",
 "Somalia",
 "South Africa",
 "South Georgia and the South Sandwich Islands",
 "South Sudan",
 "Spain",
 "Sri Lanka",
 "Sudan (the)",
 "Suriname",
 "Svalbard and Jan Mayen",
 "Sweden",
 "Switzerland",
 "Syrian Arab Republic",
 "Taiwan",
 "Tajikistan",
 "Tanzania, United Republic of",
 "Thailand",
 "Timor-Leste",
 "Togo",
 "Tokelau",
 "Tonga",
 "Trinidad and Tobago",
 "Tunisia",
 "Turkey",
 "Turkmenistan",
 "Turks and Caicos Islands (the)",
 "Tuvalu",
 "Uganda",
 "Ukraine",
 "United Arab Emirates (the)",
 "United Kingdom of Great Britain and Northern Ireland (the)",
 "United States Minor Outlying Islands (the)",
 "United States of America (the)",
 "Uruguay",
 "Uzbekistan",
 "Vanuatu",
 "Venezuela (Bolivarian Republic of)",
 "Viet Nam",
 "Virgin Islands (British)",
 "Virgin Islands (U.S.)",
 "Wallis and Futuna",
 "Western Sahara",
 "Yemen",
 "Zambia",
 "Zimbabwe",
 "Åland Islands"
    ];

    return(
        <div className="row justify-content-center">
            <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                <h4 className="display-5 mt-4">Account</h4>
                    {addProductButton} 
        </div>
        <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 mt-4" align="center">
            <FaUserCircle size={100} className="mt-4" />
            <h4 className="display-6">{user.username}</h4>
        </div>
        <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 mt-4" align='center'>
            <h4 className="display-6 mt-4">{user.first_name} {user.last_name}</h4>
            <p>Member since {convertTime(user.created_at)} </p>
            <h5 className="lead mt-4">Personal Information:</h5>
                {userAddressInfo}
        </div>
        <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 mt-3" align="center">
            <h2 className="display-6 mt-4">Payment Information</h2>
                {userPaymentInfo}
        </div>

{/* //////////////////////////////MODAL FOR ADDRESS/////////////////////////////////////// */}
    <div class="modal fade" id="addressmodal" tabindex="-1" aria-labelledby="addressmodalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
        <div class="modal-header">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
    <div class="modal-body">
        <form onSubmit={handleAddressSubmit}>
            <div className="row justify-content-center mt-4">
                <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8" align="center">
                    <h4 className="display-6">Update Address</h4>
                <div className="mb-3 mt-4">
                    <label htmlFor="street_address" className="form-label">Street Address</label>
                    <input type="text" className="form-control" value={street_address} onChange={(e)=> setStreet_address(e.target.value)}/>
                </div>
            <div className="mb-3 mt-4">
                <label htmlFor="city" className="form-label">City</label>
                <input type="text" className="form-control" value={city} onChange={(e)=> setCity(e.target.value)}/>
            </div>
            <div className="mb-3 mt-4">
                <label htmlFor="state" className="form-label">State</label>
                <input type="text" className="form-control" value={state} onChange={(e)=> setState(e.target.value)}/>
            </div>
            <div className="mb-3 mt-4">
                <label htmlFor="postal_code" className="form-label">Postal Code</label>
                <input type="text" className="form-control" value={postal_code} onChange={(e)=> setPostal_code(e.target.value)}/>
            </div>
            <div className="mb-3 mt-4">
                <label htmlFor="country" className="form-label">Country</label>
                <select required className="form-select form-inline" aria-label="Default select example" value={country} onChange={(e)=> setCountry(e.target.value)}>
                    {countryList.map((country, i)=>(
                <option value={country}>{country}</option>
                        ))}
                </select>
            </div>
                    <button className="btn btn-dark mt-4">Save</button>
                </div>
            </div>
        </form>
    </div>
 
            </div>
        </div>
 </div>

{/* //////////////////////////////MODAL FOR PAYMENT/////////////////////////////////////// */}
    <div class="modal fade" id="paymentmodal" tabindex="-1" aria-labelledby="addressmodalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
    <div class="modal-body">
        <form onSubmit={handlePaymentSubmit}>
            <div className="row justify-content-center mt-4">
            <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8" align="center">
                <h4 className="display-6">Update Payment</h4>
            <div className="mb-3 mt-4">
                <label htmlFor="street_address" className="form-label">Payment Type</label>
                <select required className="form-select form-inline" aria-label="Default select example" value={payment_type} onChange={(e)=> setPayment_type(e.target.value)}>
                    <option value="Visa">Visa</option>
                    <option value="MasterCard">MasterCard</option>
                    <option value="American Express">American Express</option>
                    <option value="Discover">Discover</option>
                </select> 
            </div>
        <div className="mb-3 mt-4">
            <label htmlFor="city" className="form-label">Account Number</label>
            <input type="text" className="form-control" value={account_number} onChange={(e)=> setAccount_number(e.target.value)}/>
        </div>
        <div className="mb-3 mt-4">
            <label htmlFor="state" className="form-label">Expiry</label>
            <input type="text" className="form-control" value={expiry} onChange={(e)=> setExpiry(e.target.value)}/>
        </div>
            <button className="btn btn-dark mt-4">Save</button>
            </div>
            </div>
        </form>
    </div>
 
        </div>
 </div>
    </div>

{/* //////////////////////////////MODAL FOR ADDING PRODUCT///////////////////////////////// */}
    <div class="modal fade" id="addproductModal" tabindex="-1" aria-labelledby="addressmodalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
        <div class="modal-body">
        <form onSubmit={handleAddProductSubmit}>
        <div className="row justify-content-center mt-4">
        <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8" align="center">
            <h4 className="display-6">Add Product</h4>
        <div className="mb-3 mt-4">
            <label htmlFor="street_address" className="form-label">Name</label>
            <input type="text" className="form-control" value={name} onChange={(e)=> setName(e.target.value)}/>
        </div>
        <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">Description</label>
            <textarea class="form-control" value={description} onChange={(e)=> setDescription(e.target.value)} rows="3"></textarea>
        </div>
        <div class="mb-3">
            <label htmlFor="country" className="form-label">Product Category</label>
            <select required className="form-select form-inline" aria-label="Default select example" value={category_id} onChange={(e)=> setCategory_id(e.target.value)}>
                {productCategories.map((productCategory, i)=>(
            <option value={productCategory.id}>{productCategory.name}</option>
                ))}
            </select>
        </div>
        <div className="mb-3 mt-4">
            <label htmlFor="street_address" className="form-label">Price</label>
            <input type="text" className="form-control" value={price} onChange={(e)=> setPrice(e.target.value)}/>
        </div>
        <div className="mb-3 mt-4">
            <label htmlFor="street_address" className="form-label">Quantity</label>
            <input type="text" className="form-control" value={quantity} onChange={(e)=> setQuantity(e.target.value)}/>
        </div>
        <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">Product Image</label>
            <textarea class="form-control" value={product_img} onChange={(e)=> setProduct_img(e.target.value)} rows="3"></textarea>
        </div>
            <button className="btn btn-dark mt-4">Save</button>
            </div>
            </div>
            </form>
        </div>
 
            </div>
        </div>
    </div>

{/* ////////////////////////////////MODAL FOR ADDING PRODUCT CATEGORY///////////////////////// */}
    <div class="modal fade" id="addproductcategoryModal" tabindex="-1" aria-labelledby="addressmodalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
        <div class="modal-body">
            <form onSubmit={handleAddProductCategorySubmit}>
            <div className="row justify-content-center mt-4">
                <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8" align="center">
                    <h4 className="display-6">Add Product Category</h4>
                <div className="mb-3 mt-4">
                    <label htmlFor="street_address" className="form-label">Name</label>
                    <input type="text" className="form-control" value={productCategoryName} onChange={(e)=> setProductCategoryName(e.target.value)}/>
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                    <textarea class="form-control" value={productCategoryDescription} onChange={(e)=> setProductCategoryDescription(e.target.value)} rows="3"></textarea>
                </div>
 
                    <button className="btn btn-dark mt-4">Save</button>
                </div>
            </div>
            </form>
        </div>
 
        </div>
        </div>
    </div>
 </div>

 

 )
}

export default UserPage;