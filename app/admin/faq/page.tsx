'use client'
import AdminSidebar from '../../../app/components/Admin/sidebar/AdminSidebar'
import React from 'react'
import Heading from '../../../app/utils/Heading'
import EditFaq from '../../../app/components/Admin/Customization/EditFaq'
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
      <div className="flex h-screen">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[80%]">
            <DashboardHero/>
          <EditFaq/>
        </div>
      </div>
  
  </div>
  )
}

export default Page