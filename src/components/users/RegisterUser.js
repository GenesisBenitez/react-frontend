import {useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

function RegisterUser(){
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8080/users/registeruser", {
            username: username,
            password: password,
            first_name: firstName,
            last_name: lastName,
            admin: 'N'
        }).then(function(response){
            console.log(response);
            window.location = '/login'
        }).catch(function(error){
            console.log(error);
        })
    
    }
    return(
        <form onSubmit={handleSubmit}>
            <div className="row justify-content-center mt-4">
                <div className="col-8 col-sm-8 col-md-8 col-lg-6 col-xl-6 mt-2" align="center">
                    <h4 className="display-6">Register</h4>
                <div className="mb-3 mt-4">
                    <label htmlFor="first_name" className="form-label mt-4">First Name</label>
                    <input type="text" className="form-control" value={firstName} onChange={(e)=> setFirstName(e.target.value)}/>
                </div>
                <div className="mb-3 mt-4">
                    <label htmlFor="last_name" className="form-label mt-2">Last Name</label>
                    <input type="text" className="form-control" value={lastName} onChange={(e)=> setLastName(e.target.value)}/>
                </div>
                <div className="mb-3 mt-4">
                    <label htmlFor="username" className="form-label mt-2">Username</label>
                    <input type="text" className="form-control" value={username} onChange={(e)=> setUsername(e.target.value)}/>
                </div>
                <div className="mb-3 mt-4">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                </div>
                    <button className="btn btn-dark mt-4">Register</button>
                    <small className='d-block mt-4'>Already have an account? <Link to={'/login'}>Login</Link></small>
                </div>
            </div>
        </form>
    )
}

export default RegisterUser;