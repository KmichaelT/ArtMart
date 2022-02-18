import {useState, useEffect} from 'react'
import {getAuth, updateProfile} from 'firebase/auth' 
import { updateDoc, doc, getDoc } from "firebase/firestore";
import {db} from '../firebase.config'
import {useNavigate, Link} from 'react-router-dom'
import {toast} from 'react-toastify'
import Post from '../components/Post';


function Profile() {
  const auth=getAuth()
  const [changeDetails, setChangeDetails]= useState(false)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
    photo: auth.currentUser.photoURL,
    about: doc.about
  })
  const onSubmit=async()=>{
    try {
      if(auth.currentUser.displayName !== formData.name){
        await updateProfile(auth.currentUser,{
          displayName: formData.name
        })
        const userRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(userRef,{
          name: formData.name
        })
      }
      
    } catch (error) {
      toast.error('Could not update')
    }
  }
  const onChange = (e) => {
    setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
    }))
}
  
  return <>
  <div className='container-sm '>
  <div className="row align-items-md-stretch">
     <div className="col-md-3 ">
                  <img className="w-100" src={formData.photo} alt="" />

                </div>
      <div className="col-md-9">
      
        <div className="h-100 p-5 bg-light border rounded-3">
          
          <h2><input type="text" id='name' disabled={!changeDetails} readonly className={!changeDetails ? "form-control-plaintext" : 'form-control'} value={formData.name} onChange={onChange}/></h2>
          <p>{doc.about}</p>
          <button className="btn btn-outline-secondary" type="button" onClick={ ()=> { changeDetails && onSubmit() 
          setChangeDetails((prevState)=> !prevState)
          }} >{changeDetails ? 'Done' : 'Edit'}</button>
        </div>
      </div>
    </div>
    <Post/>
    </div>
    
  </>
}

export default Profile