import React, { FC } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import Loader from "../../Loader/Loader";
import { useGetUserAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";

import { styles } from "@/app/styles/styles";

type Props = {
  isDashboard?: boolean;
};

const UserAnalytics: FC<Props> = ({isDashboard}) => {
  const { isLoading, data, refetch } = useGetUserAnalyticsQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const analyticsData: any = [];
  {
    data &&
      data.users.last12Months.forEach((item: any) => {
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
              ? "mt-[50px]"
              : "mt-[50px] dark:bg-[#111C43] shadow-sm pb-5 rounded-sm"
          }`}
        >
          <div className={`${isDashboard ? "ml-8 mb-5" : ""}`}>
            <h1
              className={`${styles.title} ${
                isDashboard && "text-[20px]"
              } px-7 !text-center`}
            >
              User Analytics
            </h1>
            {!isDashboard && (
              <p className={`${styles.label} px-7 mx-3 `}>
                Last 12 Months Analytics Data {""}
              </p>
            )}
          </div>
          <div
            className={`${isDashboard ? "h-[30vh]" : "h-[90%]"
            } w-full flex items-center justify-center`}
          >
            <ResponsiveContainer
              width={isDashboard ? "100%" : "90%"}
              height={isDashboard ? "50%" : "90%"}
            >
              <AreaChart
                margin={{
                  top: 20,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
                data={analyticsData}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />

                <Area
                  dataKey="count"
                  fill="#4d62d9"
                  type="monotone"
                  stroke="#4d62d9"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default UserAnalytics;
