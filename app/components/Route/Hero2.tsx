import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import Image from "next/image";
import Link from "next/link";
import React, { FC, useState } from "react";
import { BiSearch } from "react-icons/bi";
import Loader from "../Loader/Loader";
import { useRouter } from "next/navigation";

type Props = {};

const Hero: FC<Props> = (props) => {
  const { data,isLoading } = useGetHeroDataQuery("Banner",{});
  const [search,setSearch] =useState("");
  const router = useRouter()

  const handleSearch = () => {
    if(search.length > 0) {
      router.push(`/courses?title=${search}`)
    }else{
      return
    }
  }


  return (
  <>
  {
    isLoading ? <Loader/> : 
    (  <div className="w-full 1000px:flex items-center ">
    <div className="w-screen   !h-screen">
      <div className="!h-screen   items-center text-center  w-full shadow-md flex flex-wrap flex-col-reverse md:flex-row p-4  sm:p-8">
        <div className="w-full h-[100%]  md:w-1/2 hero_animation rounded-full ">
          <Image
            src={data?.layout?.banner?.image?.url}
            alt=""
            className="object-contain 1100px:max-w-[90%] w-[90%] transition-transform hover:scale-110 duration-300 mx-auto my-4 py-6 1500px:max-w-[85%] h-[auto] z-[10]"
            width={1000}
            height={1000}
          />
        </div>
        <div className="  w-[90%] sm:w-1/2 text-center flex flex-col items-center sm:text-left">
          <h2 className="dark:text-white text-[#000000c7] bg-transparent border-none ml- w-full 1500px:!w-[55%] 1100px:!w-[78%]  1000px:text-[50px]  font-[500] font-Josefin py-6  leading-tight">
            {`${data?.layout?.banner.title}`}
          </h2>
          <p className="dark:text-[#edfff4] text-[#000000ac] font-Josefin font-[600] text-[18px] 1500px:!w-[55%] 1100px:!w-[78%]">
            {`${data?.layout.banner.subTitle}`}
          </p>
          <br />
          <br />
          <div className="1500px:w-[55%] flex justify-between 1100px:w-[78%] w-[90%] h-[50px] bg-transparent ">
            <input
              type="search"
              placeholder="Search Courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-l-[5px] p-2 w-full h-full outline-none text-[#0000004e] dark:text-[#ffffffe6] text-[20px] font-[500] font-Josefin"
            />
            <div className="relative flex w-[40px] text-white dark:text-black cursor-pointer h-[50px]  bg-[#39c1f3] rounded-r-[5px]"
            onClick={handleSearch}>
              <BiSearch className="text-white mt-2" size={30} />
            </div>
          </div>
          <br />
          <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] flex items-center">
            <Image
              src={require("../../../public/assets/client-1.jpg")}
              alt=""
              className="rounded-full"
            />
            <Image
              src={require("../../../public/assets/client-2.jpg")}
              alt=""
              className="rounded-full ml-[-20px]"
            />
            <Image
              src={require("../../../public/assets/client-3.jpg")}
              alt=""
              className="rounded-full ml-[-20px]"
            />
            <p className="font-Josefin dark:text-[#edfff4] text-[#000000b3] 1000px:pl-3 text-[18px] font-[600]">
              500K+ People already trusted us. <br />
              <Link
                href="/courses"
                className="dark:text-[#46e256] text-[crimson]"
              >
                View Courses
              </Link>
              {""}
            </p>
          </div>
          {/* <button
        className="px-6  py-3 bg-pink-500 text-gray-200 mt-4 mb-8 text-base font-medium rounded-md shadow-md hover:bg-pink-600 hover:text-gray-50">Get
        Started</button> */}
        </div>
      </div>
    </div>
  </div>)
  }
  </>
  );
};

export default Hero
