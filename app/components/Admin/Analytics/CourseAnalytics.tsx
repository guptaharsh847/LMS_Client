import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Label,
  LabelList,
} from "recharts";
import Loader from "../../Loader/Loader";
import { analyticsApi, useGetCourseAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import { Anybody } from "next/font/google";
import { styles } from "@/app/styles/styles";
type Props = {};

const CourseAnalytics = (props: Props) => {
  const { isLoading, data, refetch } = useGetCourseAnalyticsQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const analyticsData: any = [];
  {
    data && 
    data.courses.last12Months.forEach((item:any) => {
        analyticsData.push({name: item.month, uv: item.count});
    })
}
const minValue=0;
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-[90%] h-screen">
          <div className="mt-[50px]">
            <h1 className={`${styles.title} px-7 !text-center`}>
              Course Analytics
            </h1>

            <p className={`${styles.label} px-7 mx-3 `}>
              Last 12 Months Analytics Data {""}
            </p>
          </div>
          <div className="w-full h-[90%] flex items-center justify-center">
            <ResponsiveContainer width="90%" height="50%">
              <BarChart width={150} height={300} data={analyticsData}>
                <XAxis dataKey="name">
                  <Label offset={0} position="insideBottom" />
                </XAxis>

                <YAxis domain={[minValue, "auto"]} />

                <Bar dataKey="uv" fill="#3faf82">
                  <LabelList dataKey="uv" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseAnalytics;
