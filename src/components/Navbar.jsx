import { useNavigate, useLocation } from "react-router-dom";
import React from 'react'
import {getAuth} from 'firebase/auth'
import { useAuthStatus } from "../hooks/useAuthStatus"

function Navbar() {
    const navigate=useNavigate()
    const location=useLocation()
    const auth=getAuth()

    const pathMatchRoute =(route)=>{
        if (route ===location.pathname){
            return true
        }
    }
    const {signedIn, checkingStatus } = useAuthStatus()
    if(checkingStatus){
        return <h3> loading ...</h3>
    }
    const onSignout=() =>{
        auth.signOut()
        navigate ('/signin')
    }
    
    
    
return  (<>

<div className="container" >
    
    <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 mt-5 ">
      <a href="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
      <img className="bi me-2" src="assets/img/logo.png" height="32"/>
      </a>

      <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li onClick={ ()=> navigate ('/') }><a href="#"  className={pathMatchRoute('/')? 'link-dark fw-bold nav-link px-2' : 'link-dark fw-light nav-link px-2'}>Home</a></li>
        <li onClick={ ()=> navigate ('/browse') }><a href="#" className={pathMatchRoute('/browse')? 'link-dark fw-bold nav-link px-2' : 'link-dark fw-light nav-link px-2'}>Browse</a></li>
        <li onClick={ ()=> navigate ('/about') }><a href="#" className={pathMatchRoute('/about')? 'link-dark fw-bold nav-link px-2' : 'link-dark fw-light nav-link px-2'}>About</a></li>
        
      </ul>

      <div className="col-md-auto text-end">
        
        {signedIn?<>
       
        <a href="#" className="col-md-auto ms-2 link-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
             <img src={auth.currentUser.photoURL} alt="mdo" width="32" height="32" className="rounded-circle"/>
        </a>

        <ul className="dropdown-menu  text-small" aria-labelledby="dropdownUser1">
          <li><a className="dropdown-item" href="#">New project...</a></li>
          <li><a className="dropdown-item" href="#">Settings</a></li>
          <li><a className="dropdown-item" href="#"onClick={ ()=> navigate ('/profile') }>Profile</a></li>
          <li><hr className="dropdown-divider"/></li>
          <li><a className="dropdown-item" onClick={ onSignout }>Sign out</a></li>
        </ul> 
        </>
        :<>
        <button type="button" className="btn brand_button_outline me-2" onClick={ ()=> navigate ('/signin') }>Sign-in</button>
        <button type="button" className="btn btn-primary brand_button" onClick={ ()=> navigate ('/signup') }>Sign-up</button>
        </>
     } 
        
      </div>
    </header>
  </div>

</> 
  )
}

export default Navbar
