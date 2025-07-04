/* eslint-disable react/jsx-key */
"use client";
import Link from "next/link";
import React from "react";

export const navItemsData = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Courses",
    url: "/courses",
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "Policy",
    url: "/policy",
  },
  {
    name: "FAQ",
    url: "/faq",
  },
];

type Props = {
  activeItem: number;
  isMobile: boolean;
};

const NavItems: React.FC<Props> = ({ activeItem, isMobile }) => {
  return (
    <>
      <div className="hidden 800px:flex ">
        {navItemsData &&
          navItemsData.map((i, index) => (
            <Link href={`${i.url}`} key={index} passHref>
              <span
                className={`${
                  activeItem === index
                    ? "text-[crimson] dark:text-[#37a39a]"
                    : "text-black dark:text-white"
                } text-[18px] px-4 font-Poppins font-[400]`}
              >
                {i.name}
              </span>
            </Link>
          ))}
      </div>
      {isMobile && (
        <div className="800px:hidden mt-5">
         
            {navItemsData &&
              navItemsData.map((i, index) => (
                <Link href={`${i.url}`} passHref>
                  <span
                    className={` ${
                      activeItem === index
                        ? "text-[crimson] dark:text-[#37a39a]"
                        : "text-black dark:text-white"
                    } text-[16px] px-6  py-5 block font-Poppins font-[400]`}
                  >

                  {i.name}</span>
                </Link>
              ))}
          
        </div>
      )}
    </>
  );
};

export default NavItems;
