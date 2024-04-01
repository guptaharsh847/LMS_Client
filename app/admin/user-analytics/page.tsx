'use client'
import AdminSidebar from '../../components/Admin/sidebar/AdminSidebar'
import React from 'react'
import Heading from '../../utils/Heading'
import UserAnalytics from '../../components/Admin/Analytics/UserAnalytics'

import DashboardHeader from '@/app/components/Admin/DashboardHeader'

type Props = {}

const page = (props: Props) => {
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
            <DashboardHeader/>
          {/* <UserAnalytics isDashboard={false}/> */}
        </div>
      </div>
  
  </div>
  )
}

export default page