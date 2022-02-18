import React from 'react'
import { toast } from 'react-toastify';
import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {getAuth, signInWithEmailAndPassword, updateProfile} from 'firebase/auth'

function SignIn() {
    const [formData, setFormData]= useState({
        email: '',
        password:''
    })
    const {email,password}=formData
    const navigate=useNavigate()
    const onChange=(e)=>{
        setFormData((prevState)=>({
            ...prevState,
            [e.target.id]:e.target.value,
        }))
    }
    const onSubmit = async (e) => {
        e.preventDefault()
    try {
    const auth=getAuth()
        const userCredential=await signInWithEmailAndPassword(auth, email, password)

        if(userCredential.user){
            navigate('/')
        }    
    } catch (error) {
        toast.error('User not found')
    }
    
        
    }

  return (
      <>
          <div className="container col-xl-10 col-xxl-8 px-4 py-5">
              <div className="row align-items-center g-lg-5 py-5">
                 
                  <div className="col-md-10 mx-auto col-lg-5">
                  
                      <form className="p-4 p-md-5 border rounded-3 bg-light" onSubmit={onSubmit}>
                          <div className="text-center pb-5"> <img src="assets/img/logo.png" alt="" height="32" /> </div>
                      
                          <div className="form-floating mb-3">
                              <input type="email" className="form-control" id="email" placeholder="name@example.com" value={email} onChange={onChange}/>
                              <label htmlFor="floatingInput">Email address</label>
                          </div>
                          <div className="form-floating mb-3">
                              <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={onChange}/>
                              <label htmlFor="floatingPassword">Password</label>
                          </div>
                          
                          <button className="w-100 btn btn-lg btn-primary brand_color" type="submit">Sign in</button>
                          <Link className='text-end link-dark nav-link fw-normal pt-3' to ='/signup'> or sign up instead </Link>
                          <hr className="my-4" />
                          
                      </form>
                  </div>
              </div>
          </div>
      </>
    
  )
}

export default SignIn