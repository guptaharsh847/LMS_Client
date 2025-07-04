import { Box, CircularProgress } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import UserAnalytics from "../Analytics/UserAnalytics";
import { BiBorderLeft } from "react-icons/bi";
import { PiUsersFourLight } from "react-icons/pi";
import OrderAnalytics from "../Analytics/OrderAnalytics";
import AllInvoices from "../Order/AllInvoices"
import { useGetOrderAnalyticsQuery, useGetUserAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";

type Props = {
  open: boolean;
  value?: number;
};
const CircularProgressWithLabel: FC<Props> = ({ open, value }) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={value}
        size={45}
        color={value && value > 99 ? "info" : "error"}
        thickness={4}
        style={{ zIndex: open ? -1 : 1 }}
      />

      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></Box>
    </Box>
  );
};
const DashboardWidgets: FC<Props> = ({ open }) => {
  // const [comparePercentage, setComparePercentage] = useState();
  const [ordersComparePercentage, setOrdersComparePercentage] = useState<any>();
  const [usersComparePercentage, setUsersComparePercentage] = useState<any>();

  const {data,isLoading  } = useGetUserAnalyticsQuery(
    {} );
    const { data:ordersData,isLoading:ordersLoading} = useGetOrderAnalyticsQuery({});
    useEffect(() => {
      if(isLoading && ordersLoading){
        return;
      
      }
      if(data && ordersData){
      
        const lastTwoMonthsOrders = ordersData.orders.last12Months.slice(-2);
        const lastTwoMonthsUsers = data.users.last12Months.slice(-2);

        if (lastTwoMonthsOrders.length === 2 && lastTwoMonthsUsers.length === 2) {
        const currentMonthOrders = lastTwoMonthsOrders[1].count;
        const previousMonthOrders = lastTwoMonthsOrders[0].count;  
        const currentMonthUsers = lastTwoMonthsUsers[1].count;
        const previousMonthUsers = lastTwoMonthsUsers[0].count;

        const usersPercentChange= previousMonthUsers !== 0 ? (currentMonthUsers - previousMonthUsers) / previousMonthUsers * 100 :100;
        const ordersPercentChange = previousMonthOrders!==0 ? (currentMonthOrders - previousMonthOrders) / previousMonthOrders * 100: 100;
        
        setUsersComparePercentage({
          currentMonth:currentMonthUsers,
          previousMonth:previousMonthUsers,
          percentChange: usersPercentChange,
        });
        setOrdersComparePercentage({
          currentMonth:currentMonthOrders,
          previousMonth:previousMonthOrders,
          percentChange: ordersPercentChange,
        });
        }
      }
    }, [])
    
  return (
    <div className="mt-[30px] min-h-screen">
      <div className="grid grid-cols-[75%,25%]">
        <div className="p-8">
          <UserAnalytics isDashboard={true} />
        </div>

        <div className="pt-[80px] pr-8">
          <div className="w-full dark:bg-[#111C43] rounded-sm shadow">
            <div className="flex items-center p-5 justify-between">
              <div className="">
                <BiBorderLeft className="dark:text-[#45CBA0] text-[#000] text-[30px]" />

                <h5 className="pt-2 font-Poppins dark:text-[#fff] text-black text-[20px]">
                 {ordersComparePercentage?.currentMonth}
                </h5>

                <h5 className="py-2 font-Poppins dark:text-[#45CBA0] text-black text-[20px] font-[400]">
                  Sales Obtained
                </h5>
              </div>

              <div>
                <CircularProgressWithLabel value={100} open={open} />

                <h5 className="text-center dark:text-[#fff] text-black pt-4">
                  {
                    ordersComparePercentage?.percentChange > 0
                      ? '+' + ordersComparePercentage?.percentChange.toFixed(2)
                      : '-' + ordersComparePercentage?.percentChange.toFixed(2)
                  } %
                </h5>
              </div>
            </div>
          </div>

          <div className="w-full dark:bg-[#111C43] rounded-sm shadow">
            <div className="flex items-center p-5 justify-between">
              <div className="">
                <PiUsersFourLight className="dark:text-[#45CBA0] text-[#000] text-[30px]" />

                <h5 className="pt-2 font-Poppins dark:text-[#fff] text-black text-[20px]">
                 {usersComparePercentage?.currentMonth}
                </h5>

                <h5 className="py-2 font-Poppins dark:text-[#45CBA0] text-black text-[20px] font-[400]">
                  New Users
                </h5>
              </div>

              <div>
                <CircularProgressWithLabel value={100} open={open} />

                <h5 className="text-center pt-4 dark:text-[#fff] text-black">
                 {usersComparePercentage?.percentChange > 0 
                 ? '+' + usersComparePercentage?.percentChange.toFixed(2) 
                  : '-'+ usersComparePercentage?.percentChange.toFixed(2)
                 }%
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[65%,35%] mt-[-20px]">
        <div className="dark:bg-[#111C43] w-[94%] mt-[30px] h-[40vh] shadow-sm m-auto">
          <OrderAnalytics isDashboard={true} />
        </div>

        <div className="p-5">
          <h5 className="pb-3 font-Poppins dark:text-white text-black text-[20px] font-[400]">
            Recent Transactions
          </h5>
          <AllInvoices isDashboard={true}/>
        </div>
      </div>
    </div>
  );
};

export default DashboardWidgets;
