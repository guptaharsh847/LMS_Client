import React from 'react'
import "./Loader.css"

type Props = {}

const Loader = () => {
  return (
    // <div className='flex justify-center items-center h-screen'>
    //     <div className="loader"></div>
    <div className="loading-container">
  <div className="loading-text">
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
  </div>
</div>

        
    // </div>
  )
}

export default Loader