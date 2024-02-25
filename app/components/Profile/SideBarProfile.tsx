import Image from "next/image";
import React, { FC } from "react";
import avatarDefault from "../../../public/assets/avatar.png";
import { RiAdminFill, RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";
import { MdAdminPanelSettings } from "react-icons/md";
import Link from "next/link";

type Props = {
  user: any;
  active: number;
  avatar: string | null;
  setActive: (active: number) => void;
  logoutHandler: any;
};

const SideBarProfile: FC<Props> = ({
  user,
  active,
  avatar,
  setActive,
  logoutHandler,
}) => {
  return (
    <div className="w-full">
      <div
        className={`w-full  flex items-center px-3 py-4 cursor-pointer rounded-t-[5px] ${
          active === 1 ? "dark:bg-slate-800 bg-[#b6c1c9]" : "bg-transparent"
        }`}
        onClick={() => setActive(1)}
      >
        <Image
          src={
            user.avatar || avatar ? user.avatar.url || avatar : avatarDefault
          }
          alt=""
          width={20}
          height={20}
          className="w-[20px] h-[20px] 800px:w-[30px] 800px:h-[30px] cursor-pointer border-[3px]  border-[#ddd540] rounded-full "
        />
        <h5 className="pt-1 px-2 dark:text-white text-[20px] text-black font-[600] 800px:block hidden font-Poppins">
          My Account
        </h5>
      </div>
      <div
        className={`w-full   flex items-center px-3 py-4 cursor-pointer  ${
          active === 2 ? "dark:bg-slate-800 bg-[#b6c1c9]" : "bg-transparent"
        }`}
        onClick={() => setActive(2)}
      >
        <RiLockPasswordLine size={20} className="dark:text-white text-black" />
        <h5 className=" px-2 dark:text-white text-[20px] text-black font-[400] 800px:block hidden font-Poppins">
          Change Password
        </h5>
      </div>
      {user.role === "admin" && (
        <Link
          className={`w-full   flex items-center px-3 py-4 cursor-pointer  ${
            active === 5 ? "dark:bg-slate-800 bg-[#b6c1c9]" : "bg-transparent"
          }`}
          href={"/admin"}
        
        >
          <RiAdminFill size={20} className="dark:text-white  text-black" />
          <h5 className=" px-2 dark:text-white text-[20px] text-black font-[400] 800px:block hidden font-Poppins">
            Admin Dashboard
          </h5>
        </Link>
      )}
     {
      user.role ==="user" && (
        <div
        className={`w-full   flex items-center px-3 py-4 cursor-pointer  ${
          active === 3 ? "dark:bg-slate-800 bg-[#b6c1c9]" : "bg-transparent"
        }`}
        onClick={() => setActive(3)}
      >
        <SiCoursera size={20} className="dark:text-white text-black" />
        <h5 className=" px-2 dark:text-white text-[20px] text-black font-[400] 800px:block hidden font-Poppins">
          Enrolled Courses
        </h5>
      </div>
      )
     }
      <div
        className={`w-full  flex items-center px-3 py-4 cursor-pointer  ${
          active === 4
            ? "dark:bg-slate-800 bg-[rgb(182,193,201)]"
            : "bg-transparent"
        }`}
        onClick={() => {
          logoutHandler();
        }}
      >
        <AiOutlineLogout size={20} className="dark:text-white text-black" />
        <h5 className=" px-2 dark:text-white text-[20px] text-black font-[400] 800px:block hidden font-Poppins">
          Log Out
        </h5>
      </div>
    </div>
  );
};
export default SideBarProfile;
