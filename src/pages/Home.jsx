import React from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import Browse from './Browse';


function Home() {
    const navigate=useNavigate()
    const location=useLocation()
    
  return (
    <>
        <div className="container col-xxl-8 px-4 ">
    <div className="row flex-lg-row-reverse align-items-center g-5 ">
      <div className="col-10 col-sm-8 col-lg-6">
        <img src="assets/img/Abstract Painting.png" className="d-block mx-lg-auto img-fluid " alt="Bootstrap Themes"  width="700" height="500" loading="lazy"/>
      </div>
      <div className="col-lg-6">
        <h1 className="display-5 fw-bold lh-1 mb-3">Hub for Masterpieces</h1>
        <p className="lead">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
        <div className="d-grid gap-2 d-md-flex justify-content-md-start">
          <button type="button" className="btn brand_button btn-lg px-4 me-md-2" onClick={ ()=> navigate ('/signin') }>Sign in</button>
          <button type="button" className="btn brand_button_outline btn-lg px-4"onClick={ ()=> navigate ('/browse') }>Browse</button>
        </div>
      </div>
    </div>
  </div>
  <Browse/>
    </>
  )
}

export default Home