import React from 'react'
import { toast } from 'react-toastify';
import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import{db} from '../firebase.config'
import {setDoc, doc, serverTimestamp} from 'firebase/firestore'

function SignUp() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        photo: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        about: 'introduce yourself'
    })
    const { name, email, password,photo } = formData
    const navigate = useNavigate()
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }
    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            const auth = getAuth()
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user

            updateProfile(auth.currentUser, {
                displayName: name,
                photoURL: photo
            })

            const formDataCopy = {...formData}
            delete formDataCopy.password
            formDataCopy.timestamp = serverTimestamp()

            await setDoc(doc(db, 'users', user.uid), formDataCopy)

            navigate('/')
        } catch (error) {
            console.log(error)
            toast.error('Registration unsuccessful!')
        }
    }
    return (
        <>
            <div className="container col-xl-10 col-xxl-8 px-4 py-5">
                <div className="row align-items-center g-lg-5 py-5">

                    <div className="col-md-10 mx-auto col-lg-5" onSubmit={onSubmit}>

                        <form className="p-4 p-md-5 border rounded-3 bg-light">
                            <div className="text-center pb-5"> <img src="assets/img/logo.png" alt="" height="32" /> </div>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="name" placeholder="John Doe" value={name} onChange={onChange} />
                                <label htmlFor="floatingInput">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="email" className="form-control" id="email" placeholder="name@example.com" value={email} onChange={onChange} />
                                <label htmlFor="floatingInput">Email address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={onChange} />
                                <label htmlFor="floatingPassword">Password</label>
                            </div>

                            <button className="w-100 btn btn-lg btn-primary brand_color" type="submit">Sign up</button>
                            <Link className='text-end link-dark nav-link fw-normal pt-3' to='/signin'> or sign in instead </Link>
                            <hr className="my-4" />

                        </form>
                    </div>
                </div>
            </div>
        </>

    )
}

export default SignUp