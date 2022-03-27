import axios from "axios";

function Home(){
    axios.get("http://localhost:8080/sellers/getAllSellers")
    .then((response)=>{
        console.log(response.data);
    })
    return(
        <div>
            <h1>Home</h1>
            
        </div>
    )
}

export default Home;