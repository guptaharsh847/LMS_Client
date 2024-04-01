import Ratings from "@/app/utils/Ratings";
import React, { FC, useState } from "react";
import toast from "react-hot-toast";
import {
  IoCheckmarkCircleSharp,
  IoCheckmarkDoneOutline,
  IoCloseOutline,
} from "react-icons/io5";
import { useSelector } from "react-redux";
import { reviews } from "../Route/Reviews";
import { format } from "timeago.js";
import CoursePlayer from "@/app/utils/CoursePlayer";
import Link from "next/link";
import { styles } from "@/app/styles/styles";
import CourseContentList from "../../components/Course/CourseContentList";
import {Elements} from "@stripe/react-stripe-js";
import CheckOutForm from "../../components/Payment/CheckOutForm"
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

type Props = {
  data: any;
  clientSecret:string;
  stripePromise:any;
};

const CourseDetails: FC<Props> = ({ data ,clientSecret,stripePromise}) => {
  // const { user } = useSelector((state: any) => state.auth);S
  const {data: userData} = useLoadUserQuery({});
  const user =userData?.user;
  const [open, setOpen] = useState(false);
  const discountPercentage =
    ((data?.estimatedPrice - data.price) / data?.estimatedPrice) * 100;
  const discountPercentagePrice = discountPercentage.toFixed(0);
  // console.log(userData
  const isPurchased =
    user && user?.courses?.find((item: any) => item._id === data._id);

  const handleOrder = (e: any) => {
   setOpen(true);
  };
// console.log(user.role);
// console.log(user?.courses?.find((item: any) => item._id === data._id));
  return (
    <div>
      <div className="m-auto  w-[90%] 800px:w-[90%] py-5">
        <div className="w-full flex flex-col-reverse 800px:flex-row">
          <div className="w-full 800px:w-[65%] 800px:pr-5">
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
              {data.name}
            </h1>
            <div className="flex items-center justify-between pt-3">
              <div className="flex items-center">
                <Ratings rating={data.ratings} />
                <h5 className="text-black dark:text-white">
                  {data.reviews?.length} Reviews
                </h5>
              </div>

              <h5 className="text-black dark:text-white">
                {data.purchased} Students
              </h5>
            </div>
            <br />
            <h1 className="text-[25px] font-Poppins text-black dark:text-white font-[600]">
              What will you learn from this course?
            </h1>
            <div>
              {data.benefits?.map((benefit: any, index: number) => (
                <div
                  className="w-full flex 800px:items-center py-2"
                  key={index}
                >
                  <div className="w-[15px] mr-1">
                    <IoCheckmarkDoneOutline
                      size={20}
                      className="text-black dark:text-white"
                    />
                  </div>
                  <p className="text-[20px] font-Poppins text-black dark:text-white pl-2 ">
                    {benefit.title}
                  </p>
                </div>
              ))}
              <br />
              <br />
            </div>
            <h1 className="text-[25px] font-Poppins text-black dark:text-white font-[600]">
              What will you require for this course?
            </h1>
            <div>
              {data.prerequisites?.map((item: any, index: number) => (
                <div
                  className="w-full flex 800px:items-center py-2"
                  key={index}
                >
                  <div className="w-[15px] mr-1">
                    <IoCheckmarkDoneOutline
                      size={20}
                      className="text-black dark:text-white"
                    />
                  </div>
                  <p className="text-[20px] font-Poppins text-black dark:text-white pl-2 ">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
            <br />
            <br />
            <h1 className="text-[25px] font-Poppins text-black dark:text-white font-[600]">
              Course Overview
            </h1>
            {/* course content list1 */}
                  <CourseContentList isDemo ={true} data={data?.courseData}/>
            <br />
            {/* course description */}
            <div className="w-full">
              <h1 className="text-[25px] font-Poppins text-black dark:text-white font-[600]">
                Course Details
              </h1>
              <p className="text-[18px] whitespace-pre-line w-full overflow-hidden font-Poppins text-black dark:text-white">
                {data.description}
              </p>
            </div>
            <br />
            <br />
            <div className="w-full">
              <div className="800px:flex items-center">
                <Ratings rating={data?.ratings} />
                <div className="items-center 800px:flex">
                  <h5 className="text-[20px] font-Poppins  text-black dark:text-white ">
                    {Number.isInteger(data?.ratings)
                      ? data?.ratings.toFixed(1)
                      : data?.ratings.toFixed(2)}
                    {" || "}
                    Course Rating • {data?.reviews?.length}
                    {"   "} Reviews
                  </h5>
                </div>
                <br />
                <br />
                {(data?.reviews && [...data.reviews].reverse()).map(
                  (item: any, index: number) => (
                    <div className="w-full pb-4" key={index}>
                      <div className="flex">
                        <div className="w-[50px] h-[50px]">
                          <div className="w-[50px] h-[50px] bg-slate-600 rounded-[50px] flex items-center justify-center cursor-pointer">
                            <h1 className="uppercase text-[18px]  text-black dark:text-white">
                              {item.user.name.slice(0, 2)}
                            </h1>
                          </div>
                        </div>

                        <div className="hidden 800px:block pl-2">
                          <div className="flex items-center">
                            <h5 className="text-[18px] pr-2 text-black dark:text-white">
                              {item.user.name}
                            </h5>

                            <Ratings rating={item.rating} />
                          </div>

                          <p className="text-black dark:text-white">
                            {item.comment}
                          </p>
                          <small className="text-[#00000001] dark:text-[#ffffff83]">
                            {format(item.createdAt)}.
                          </small>
                        </div>

                        <div className="pl-2 flex 800px:hidden items-center">
                          <h5 className="text-[18px] pr-2 text-black dark:text-white">
                            {item.user.name}
                          </h5>

                          <Ratings rating={item.rating} />
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
          <div className="w-full 800px:w-[35%] relative">
            <div className="sticky top-[100px] left-0 z-50 w-full">
              <CoursePlayer videoUrl={data?.demoUrl} title={data?.title} />
              <div className="flex items-center">
                <h1 className="text-[25px] pt-5 font-Poppins text-black dark:text-white font-[600]">
                  {data.price === 0 ? "Free" : "₹" + data.price}
                </h1>
                <h5 className="text-[20px] font-Poppins text-black opacity-80 line-through dark:text-white  pl-2">
                  ₹ {data?.estimatedPrice}
                </h5>
                <h4 className="text-[22px] pl-5 pt-4 text-black dark:text-white ">
                  {discountPercentagePrice}% OFF
                </h4>
              </div>
              <div className="flex items-center">
               
              
                {(isPurchased || user?.role==="admin" )? (
                  <Link
                    href={`/course-access/${data._id}`}
                    className={` ${styles.button} my-3 font-Poppins !w-[180px] text-black dark:text-white !bg-[crimson] cursor-pointer`}
                  >
                    Go to Course
                  </Link>
                ) : (
                  <div
                    className={`${styles.button} my-3 font-Poppins !w-[180px] text-black dark:text-white !bg-[crimson] cursor-pointer`}
                    onClick={handleOrder}
                  >
                    Buy Now ₹{data.price}
                  </div>
                )}
              </div>
              <br />
              <p className="pb-1 text-black dark:text-white">• Full Lifetime access</p>
              <p className="pb-1 text-black dark:text-white">• Premium support</p>
              <p className="pb-3 text-black dark:text-white">• Access to special Questions Answer section</p>
            </div>
          </div>
        </div>
      </div>
      <>
      {
        open && (
          <div className="w-full h-screen bg-[#00000036] fixed top-0 left-0 z-50 flex items-center justify-center">
            <div className="w-[500px] min-h-[500px] bg-white rounded-xl shadow p-3 ">
              <div className="w-full flex justify-end">
                <IoCloseOutline
                
                  size={40}
                  className="cursor-pointer text-black"
                  onClick={() => setOpen(false)}
                />
              
              </div>
              <div className="w-full">
                {
                  stripePromise && clientSecret && (
                    <Elements stripe={stripePromise} options ={{clientSecret}}>
                      <CheckOutForm setOpen={setOpen} data= {data} />
                    </Elements>
                  )
                }
              </div>
            </div>
          </div>
        )
      }</>
    </div>
  );
};

export default CourseDetails;
