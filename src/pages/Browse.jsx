
import {useEffect,useState}from 'react'
import {useParams} from 'react-router-dom'
import{collection, getDocs, query, where, orderBy, limit,startAfter} from 'firebase/firestore'
import {db} from '../firebase.config'
import { toast } from 'react-toastify'



function Browse() {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)
  const params = useParams()

  useEffect(()=>{
    const fetchListing = async()=>{
      try {
        const listingsRef=collection(db,'collections')

        const q= query(
          listingsRef,
          where('type', '==', 'drawing'),orderBy('price','desc') ,limit(9)
          )

          const querySnap =await getDocs(q)
          const listings=[]
          querySnap.forEach((doc)=>{
            console.log(doc.data())
            return listings.push(
              {id: doc.id,
              data: doc.data()}
            )
          })
          setListings(listings)
          setLoading(false)
        
      } catch (error) {
        console.log(error)
        toast.error('fetching unsuccessful!')
      }
    }
    fetchListing()
    console.log(listings)
    
  },[])



  return (
    <>
      <section className="py-5 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-normal"> From Top Artists</h1>
            <p className="lead text-muted">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don’t simply skip over it entirely.</p>
            <p>
              {/* <a href="#" className="btn btn-primary my-2">Drawing</a>
              <a href="#" className="btn btn-secondary my-2">Secondary action</a> */}
            </p>
          </div>
        </div>
      </section>

      <div className="container">


        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

          {loading ? (
            <h2>loading</h2>
          ) : (
            <>

              {listings.map((listing) => (
                <div key={listing.id} className="col" >
                  <div className="card shadow-sm">
                    <img src={listing.data.imgUrls} height='500px' alt="..." />

                    <div className="card-body">
                      <h4>{listing.data.title}</h4>
                      <p className="card-text">{listing.data.description}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                          <button type="button" className="btn btn-sm btn-outline-secondary">Buy</button>
                         
                        </div>
                        <h4 className="text-muted">${listing.data.price}</h4>
                      </div>
                    </div>
                  </div>
                </div>

              ))}



            </>)}

        </div>


      </div>

    </>
  )
}

export default Browse