'use client'
import React,{FC,useState} from "react";
import Heading from "../app/utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Route/Hero2"
import Courses from "./components/Route/Courses"
import Reviews from "./components/Route/Reviews"
import FAQ from "./components/FAQ/FAQ"
import Footer from "./components/Footer"
interface Props{}

const Page: FC<Props> =(props)=>{
  const [open, setOpen]=useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route,setRoute]= useState("Login");
  return(
        <div >
          <Heading
          title="ELearning"
          description="Elearning is a platform for purchasing course"
          keywords="Programming,MERN,Redux,MachineLearning"
          />
          <Header
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          setRoute={setRoute}
          route={route}
          />
          <Hero/>
          <Courses/>
          <Reviews/>
          <FAQ/>
          <Footer/>
        </div>
  )
};
export default Page