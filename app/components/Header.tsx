"use client";

import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import NavItems from "../utils/NavItems";
import { ThemeSwitcher } from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import CustomModal from "../utils/CustomModal";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";
import Verification from "../components/Auth/Verification";
import { useSelector } from "react-redux";
import Image from "next/image";
import avatar from "../../public/assets/avatar.png"
import { useSession } from "next-auth/react";
import { useLogOutQuery, useSocialAuthMutation } from "../../redux/features/auth/authApi";
import toast from "react-hot-toast";
type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};

const Header: FC<Props> = ({ activeItem, setOpen, route, setRoute, open }) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const {user} = useSelector((state:any)=>state.auth );
  const {data} = useSession();
  const [socialAuth,{isSuccess,error}] = useSocialAuthMutation();
  const [logout, setLogout] = useState(false);

const {} =useLogOutQuery(undefined,{
    skip: logout ? true: false,
});
  useEffect(() => {
    if(!user){
      if(data){
        socialAuth({email:data?.user?.email,name:data?.user?.name,avatar: data?.user?.image})
      };
    }

   if(data === null){
     if(isSuccess){
      toast.success("Login Successfully");
    }}
    if(data === null){
      setLogout(true);
    }
    
    
  }, [data, isSuccess, socialAuth, user])
  

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }
  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      setOpenSidebar(false);
    }
  };
  
  return (
    <div className="w-full relative">
      <div
        className={`${
          active
            ? "dark:bg-opacity-50 bg-opacity-100 bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed shawdow-xl top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] transition duration-100"
            : " w-full h-[80px]  z-[80] border-b dark:border-[#ffffff1c] dark:shadow"
        }`}
      >
        <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            <div>
              <Link
                href={"/"}
                className="text-[25px] font-Poppins font-[500] text-black dark:text-white "
              >
                Elearning
              </Link>
            </div>
            <div className="flex items-center ">
              <NavItems activeItem={activeItem} isMobile={false} />
              <ThemeSwitcher />
              {/* Only for mobilr */}
              <div className="800px:hidden">
                <HiOutlineMenuAlt3
                  size={25}
                  className="cursor-pointer dark:text-white text-black"
                  onClick={() => setOpenSidebar(true)}
                />
              </div>
              {
                user ?
                (
                  <Link href={"/profile"} className="hidden 800px:block">
                  <Image
                    src={user.avatar ? user.avatar.url : avatar}
                    alt="user-avatar"
                    className="w-[30px] h-[30px] border-[2px]  border-[#ddd540] rounded-full cursor-pointer"
                    width={30}
                    height={30}
                   /></Link>
                ):
                (<HiOutlineUserCircle
                  size={25}
                  className="hidden 800px:block cursor-pointer dark:text-white text-black"
                  onClick={() => setOpen(true)}
                />
                )
              }
            </div>
          </div>
        </div>
        {/* Mobile sidebar */}
        {openSidebar && (
          <div
            id="screen"
            className="fixed top-0 left-0 w-full h-screen dark:bg-[unset] bg-[#00000024] z-[99999]"
            onClick={handleClose}
          >
            <div className="w-[70%] fixed z-[999999999] h-screen bg-white  dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0">
              <h1 className="text-[25px] font-Poppins font-[500] text-black text-center my-2 dark:text-white ">
                Elearning{" "}
              </h1>
              <NavItems activeItem={activeItem} isMobile={true} />
              {
                user ?
                (
                  <Link href={"/profile"} className="ml-5 ">
                  <Image
                    src={user.avatar ? user.avatar : avatar}
                    alt="user-avatar"
                    className="w-[30px] h-[30px] ml-5 rounded-full items-center cursor-pointer"
                    
                   /></Link>
                ):
                (<HiOutlineUserCircle
                  size={25}
                  className=" cursor-pointer dark:text-white ml-5 pl-5 text-black"
                  onClick={() => setOpen(true)}
                />
                )
              }
              <br />
              <br />
              <p className="text-[16px] px-2 pl-5 text-black dark:text-white">
                Copyright © 2023 ELearning
              </p>
            </div>
          </div>
        )}
      </div>
      {route === "Sign-Up" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={SignUp}
            />
          )}
        </>
      )}
      {route === "Login" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Login}
            />
          )}
        </>
      )}
      {route === "Verification" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Verification}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Header;
