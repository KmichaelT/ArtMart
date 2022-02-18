import { Navigate, Outlet } from "react-router-dom"
import { useAuthStatus } from "../hooks/useAuthStatus"

const Private = () => {
    const {signedIn, checkingStatus } = useAuthStatus()
    if(checkingStatus){
        return <h3> loading ...</h3>
    }
    
  return signedIn?<Outlet/> : <Navigate to='/signin'/>
}

export default Private