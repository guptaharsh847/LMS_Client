import React from 'react'
import "./Loader.css"
import { MoonLoader } from "react-spinners";
type Props = {}

const Loader = () => {
  return (
    // <div className='flex justify-center items-center h-screen'>
    //     <div className="loader"></div>
    <div className="loading-container">
  {/* <div className="loading-text">
    <span>L</span>
    <span>O</span>
    <span>A</span>
    <span>D</span>
    <span>I</span>
    <span>N</span>
    <span>G</span>
    <span>.</span>
    <span>.</span>
    <span>.</span>
  </div>*/}
  <MoonLoader color="#36d7b7" /> 
</div>

        
    // </div>
  )
}

export default Loader