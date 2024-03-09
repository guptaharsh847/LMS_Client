import React from 'react'
import "./Loader.css"
import { MoonLoader } from "react-spinners";
type Props = {}

const Loader = () => {
  return (

    <div className="loading-container bg-transparent">
  <MoonLoader color="#36d7b7" /> 
</div>


  )
}

export default Loader