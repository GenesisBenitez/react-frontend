import axios from "axios";

function Home(){
    axios.get("http://localhost:8080/sellers/getAllSellers")
    .then((response)=>{
        console.log(response.data);
        })
    return(
        <div>
            <header className="sellersHeader d-flex align-items-center justify-content-center">
                <h1 className=" display-6 text-center text-light">Eartly Fruits</h1>
            </header>
            <div className="row justify-content-center">
                <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-cl-8">
                    <h1 className="lead text-center mt-4">Welcome to Eartly Fruits</h1>
                    <small>Eartly Fruits is a Atlanta based company. Our mission is to spread awareness about healthy eating by making fresh and exotic fruits more accessible to everyone.  We want to get people excited about exploring and tasting new fruits!
                    For us, it's about health and wellness achieved by nourishing our bodies with the freshest produce. </small>
                </div>
            </div>
        </div>
    )
}

export default Home;