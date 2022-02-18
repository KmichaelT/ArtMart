import{ BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer,} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Browse from './pages/Browse';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Private from './components/Private';
import Category from './pages/Category';

function App() {
  return (
    <>
  <Router>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/browse' element={<Browse/>}/>
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/forgotpassword' element={<ForgotPassword/>}/>

      <Route path='/profile' element={<Private/> }>
      <Route path='/profile'element={<Profile/>}/>
      </Route>

    </Routes>
   
  </Router>  
  <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
    </>
  );
}

export default App;
