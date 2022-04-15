import {useState} from 'react';
import axios from 'axios';
import {useNavigate, Link} from 'react-router-dom';
function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.post("http://localhost:8080/login", {
            username: username,
            password: password,
        },  {withCredentials: true})
        .then(function(response){
            console.log(response.data.user);
            window.location = "/products";
        }).catch(function(error){
            console.log(error);
        })
    
    }
    return(
        <form onSubmit={handleSubmit}>
            <div className="row justify-content-center mt-4">
                <div className="col-8 col-sm-8 col-md-8 col-lg-6 col-xl-5 mt-4" align="center">
                    <h4 className="display-6">Login</h4>
                    <small>Sign into your account</small>
                    <div className="mb-3 mt-4">
                        <label htmlFor="username" className="form-label mt-4">Username</label>
                        <input type="text" className="form-control" value={username} onChange={(e)=> setUsername(e.target.value)}/>
                    </div>
                    <div className="mb-3 mt-4">
                        <label htmlFor="password" className="form-label mt-4">Password</label>
                        <input type="password" className="form-control" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                    </div>
                    <button className="btn btn-dark mt-4">Login</button>
                    <small className="d-block mt-4">Don't have an account? <Link to={'/register'}>Register</Link></small>
                </div>
            </div>
        </form>
    )
}

export default Login;