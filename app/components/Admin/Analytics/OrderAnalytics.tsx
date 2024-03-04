import React, { FC } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
} from "recharts";
import Loader from "../../Loader/Loader";
import { useGetOrderAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";

import { styles } from "@/app/styles/styles";

type Props = {
  isDashboard?: boolean;
};

const OrderAnalytics: FC<Props> = ({isDashboard}) => {
  const { isLoading, data, refetch } = useGetOrderAnalyticsQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const analyticsData: any = [];
  {
    data &&
      data.orders.last12Months.forEach((item: any) => {
        analyticsData.push({ name: item.month, count: item.count });
      });
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={`${
            isDashboard
              ? "mt-[10px]"
              : "mt-[50px] dark:bg-[#111C43] shadow-sm pb-5 rounded-sm"
          }`}
        >
          <div className={`${isDashboard ? "ml-8 mb-1" : ""}`}>
            <h1
              className={`${styles.title} bg-transparent ${
                isDashboard && "text-[20px]"
              } px-2 !text-center`}
            >
              Order Analytics
            </h1>
            {!isDashboard && (
              <p className={`${styles.label} px-2 mx-3 `}>
                Last 12 Months Analytics Data {""}
              </p>
            )}
          </div>
          <div
            className={`${
              isDashboard ? "h-[30vh]" : "h-screen"
            } w-full flex items-center  justify-center`}
          >
            <ResponsiveContainer
              width={isDashboard ? "100%" : "90%"}
              height={isDashboard ? "90%" : "100%"}
            >
              <LineChart
                margin={{
                  top: 0,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
                data={analyticsData}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid stroke="#ccc"  />

                <Line dataKey="count" type="monotone" stroke="#82ca9d" />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderAnalytics;
