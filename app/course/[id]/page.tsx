"use client"
import CourseDetailsPage from "../../components/Course/CourseDetailsPage";

const Page = ({params}:any) =>{
    return(
       <div className="w-full h-[190%]">
        <CourseDetailsPage id ={params.id}/>
       </div>
    )
}
export default Page;
