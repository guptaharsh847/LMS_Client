'use client'
import AdminSidebar from '../../../app/components/Admin/sidebar/AdminSidebar'
import React from 'react'
import Heading from '../../../app/utils/Heading'
import EditCategory from '../../../app/components/Admin/Customization/EditCategory'
import DashboardHero from '../../../app/components/Admin/DashboardHero'

type Props = {}

const Page = (props: Props) => {
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
        <div className="w-[80%] !h-screen">
            <DashboardHero/>
          <EditCategory/>
        </div>
      </div>
  
  </div>
  )
}

export default Page