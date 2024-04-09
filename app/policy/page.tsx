"use client"
import React, { useState } from "react"
import Heading from "../utils/Heading"
import Header from "../components/Header"

import About from "../about/About"
import Footer from "../components/Footer"

type Props={}

const page = (props:Props) =>{
    const [route, setRoute] = useState("Login")
    const [open,setOpen]=useState(false)
    
    return(
        <div>
          <div className="w-[95%] 800px:w-[85%] m-auto min-h-screen">
            <Heading
              title={"About us -Elearning"}
              description={"Elearning is a platform for purchasing course"}
              keywords={"Programming,MERN,Redux,MachineLearning"}
            />
            <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={2}
          />
            <About/>
            <Footer/>
            
          </div>
        </div>
    )
}
export default page