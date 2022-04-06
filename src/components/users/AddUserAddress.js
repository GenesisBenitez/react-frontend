import {useState} from 'react';
import axios from 'axios';

function AddUserAddress(){
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8080/users/AddUserAddress", {
            username: username,
            password: password,
            first_name: firstName,
            last_name: lastName
        }).then(function(response){
            console.log(response);
        }).catch(function(error){
            console.log(error);
        })
    
    }
    return(
        <form onSubmit={handleSubmit}>
            <div className="row justify-content-center mt-4">
                <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8" align="center">
                    <h4 className="display-6">Register</h4>
                    <div className="mb-3 mt-4">
                    <label htmlFor="first_name" className="form-label">First Name</label>
                    <input type="text" className="form-control" value={firstName} onChange={(e)=> setFirstName(e.target.value)}/>
                    </div>
                    <div className="mb-3 mt-4">
                    <label htmlFor="last_name" className="form-label">Last Name</label>
                    <input type="text" className="form-control" value={lastName} onChange={(e)=> setLastName(e.target.value)}/>
                    </div>
                    <div className="mb-3 mt-4">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" value={username} onChange={(e)=> setUsername(e.target.value)}/>
                    </div>
                    <div className="mb-3 mt-4">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                    </div>
                    <button className="btn btn-dark mt-4">Register</button>
                </div>
            </div>
        </form>
    )
}

export default AddUserAddress;