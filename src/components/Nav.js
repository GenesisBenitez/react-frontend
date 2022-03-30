import {AiOutlineHome, AiFillShopping, AiOutlineShoppingCart,AiOutlineUser} from 'react-icons/ai'
import {HiOutlineInformationCircle} from 'react-icons/hi'
import {GiFruitBowl, GiFarmer} from 'react-icons/gi'

function Nav(){
    const mainIconStyle = {color: "#80b51c"}
    return(
    <div>
        <header>
            <div className=" mainNav px-3 py-2 text-white">
                <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <a href="/" className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
                <svg className="bi d-block mx-auto mb-1" width="30" height="30"><GiFruitBowl size={30} style={mainIconStyle}/></svg>
                </a>

                <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
                    <li>
                    <a href="/" className="nav-link text-white">
                        <svg className="bi d-block mx-auto mb-1" width="24" height="24"><AiOutlineHome size={25}/></svg>
                        Home
                    </a>
                    </li>
                    <li>
                    <a href="/about" className="nav-link text-white">
                    <svg className="bi d-block mx-auto mb-1" width="24" height="24"><HiOutlineInformationCircle size={25}/></svg>
                        About
                    </a>
                    </li>
                    <li>
                    <a href="#" className="nav-link text-white">
                    <svg className="bi d-block mx-auto mb-1" width="24" height="24"><AiFillShopping size={25}/></svg>
                        Orders
                    </a>
                    </li>
                    <li>
                    <a href="/products" className="nav-link text-white">
                    <svg className="bi d-block mx-auto mb-1" width="24" height="24"><GiFarmer size={25}/></svg>
                        Products
                    </a>
                    </li>
                    <li>
                    <a href="/register" className="nav-link text-white">
                    <svg className="bi d-block mx-auto mb-1" width="24" height="24"><AiOutlineUser size={25}/></svg>
                        User
                    </a>
                    </li>
                </ul>
                </div>
            </div>
            </div>
    </header> 
    </div>
  )
}

export default Nav;