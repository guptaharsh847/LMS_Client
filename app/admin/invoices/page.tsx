'use client'
import AdminSidebar from '../../components/Admin/sidebar/AdminSidebar'
import React from 'react'
import Heading from '../../utils/Heading'


import DashboardHeader from '@/app/components/Admin/DashboardHeader'
import AllInvoices from '@/app/components/Admin/Order/AllInvoices'

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
        <div className="w-[80%] bg-transparent">
            <DashboardHeader/>
          <AllInvoices isDashboard={false}/>
        </div>
      </div>
  
  </div>
  )
}

export default Page