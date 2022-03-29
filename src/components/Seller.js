import axios from 'axios';
import { useParams } from 'react-router-dom';
import {useState ,useEffect} from 'react';

function Seller(){
    let {id}  = useParams();
    const [data, setData] = useState({});
    const getData = () =>{
        axios.get(`http://localhost:8080/sellers/getSeller/${id}`)
        .then((response)=>{
            console.log(response.data);
            setData(response.data[0]);
        })
    }
    useEffect(()=> getData(), {});
    return(
        <div className='container'>
          <h4>{data.firstname} {data.lastname}</h4>
          <p>{data.description}</p>
        </div>
    );
}

export default Seller;