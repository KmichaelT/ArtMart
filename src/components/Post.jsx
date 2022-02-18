import { useState, useEffect, useRef } from "react";
import{getAuth, onAuthStateChanged} from 'firebase/auth'
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
  } from 'firebase/storage'
  import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'
import { db } from '../firebase.config'
import { v4 as uuidv4 } from 'uuid'

function Post() {
const [loading, setLoading]=useState(false)
const [formData, setFormData]= useState({
    type: 'drawing',
    title: '',
    description:'',
    price: '',
    image:'',
    artist:''
})

const{type,title,description,price,image,artist}=formData

const auth = getAuth()
const navigate = useNavigate()
const isMounted = useRef(true)

useEffect(()=>{
    if(isMounted){
        onAuthStateChanged(auth,(user)=>{
            if (user) {
                setFormData({...formData, useRef: user.uid})
            } else{
                navigate('/signin')
            }
        })


    }
    return()=>{
        isMounted.current = false
    }
},[isMounted])

const onSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)

    // Store image in firebase
    const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage()
        const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`

        const storageRef = ref(storage, 'images/' + fileName)

        const uploadTask = uploadBytesResumable(storageRef, image)

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log('Upload is ' + progress + '% done')
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused')
                break
              case 'running':
                console.log('Upload is running')
                break
              default:
                break
            }
          },
          (error) => {
            reject(error)
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL)
            })
          }
        )
      })
    }

    
    const imgUrls = await Promise.all(
      [...image].map((image) => storeImage(image))
    ).catch(() => {
      setLoading(false)
      toast.error('Images not uploaded')
      return
    })

    const formDataCopy = {
      ...formData,
      imgUrls,
    }


    delete formDataCopy.image
   

    const docRef = await addDoc(collection(db, 'collections'), formDataCopy)
    setLoading(false)
    toast.success('Listing saved')
    navigate(`/browse`)
  }

const onMutate = (e) => {

    // Files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        image: e.target.files,
      }))
    }

    // Text/Booleans/Numbers
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
      }))
    }
  }


if (loading) {
    <h2> loading...</h2>
}
    return (
        <div>
            <div class="accordion" id="accordionExample">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            upload new item
                        </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div class="accordion-body container w-50">
                            <form onSubmit={onSubmit}>
                                <div class="mb-3">
                                    <label for="title" class="form-label">Title</label>
                                    <input type="text" id='title' class="form-control" value={title} onChange={onMutate} placeholder="Monalisa" />
                                </div>
                                <div class=" row">
                                    <div class="col mb-3">
                                        <label for="artist" class="form-label">Artist</label>
                                        <input type="text" id='artist' class="form-control" value={artist} onChange={onMutate} placeholder="DaVinci" />
                                    </div>
                                    <div class="col mb-3">
                                        <label for="artist" class="form-label">Price</label>
                                        <input type="number" id='price' class="form-control" value={price} onChange={onMutate} placeholder=" $850,000,000 " />
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label for="description" class="form-label">Description</label>
                                    <textarea class="form-control" id='description' value={description} rows="3" onChange={onMutate} placeholder="A painting of a woman with no eyebrows"></textarea>
                                </div>
                                <div class="mb-3">
                                    <label for="image" class="form-label">Upload image</label>
                                    <input class="form-control" id='image' accept='.jpg,.png,.jpeg' required onChange={onMutate}  type="file"  />
                                </div>
                                <button type="submit" class="btn btn-primary brand_button">submit</button>
                            </form>



                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Post