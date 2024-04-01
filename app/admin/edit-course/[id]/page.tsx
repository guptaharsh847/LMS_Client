'use client'
import AdminSidebar from '../../../components/Admin/sidebar/AdminSidebar'
import React from 'react'
import Heading from '../../../utils/Heading'
import EditCourse from '../../../components/Admin/Course/EditCourse'
import DashboardHeader from '../../../components/Admin/DashboardHeader'

type Props = {}

const page = ({params}:any) => {
  const id =params?.id;
  return (
    <div>
    
      <Heading
        title="Admin ELearning"
        description="ELearning is a platform for students to learn and get help from teachers"
        keywords="Prograaming, MERN, Redux, Machine Learning"
      />
      <div className="flex h-full">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[85%]">
            <DashboardHeader/>
          <EditCourse id={id}/>
        </div>
      </div>
  
  </div>
  )
}

export default page