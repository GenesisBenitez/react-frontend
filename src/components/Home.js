import axios from "axios";

function Home(){
    axios.get("http://localhost:8080/sellers/getAllSellers")
    .then((response)=>{
        console.log(response.data);
    })
    return(
        <div>
            <header className="sellersHeader d-flex align-items-center justify-content-center">
                <h1 className=" display-6 text-center text-light">Welcome to the Farmer Seller Center</h1>
            </header>
            
        </div>
    )
}

export default Home;