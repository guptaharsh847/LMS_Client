"use client";

import { FC, useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import "react-pro-sidebar/dist/css/styles.css";
import {
  HomeOutlinedIcon,
  ArrowForwardIosIcon,
  ArrowBackIosIcon,
  PeopleOutlinedIcon,
  ReceiptOutlinedIcon,
  BarChartoutlinedIcon,
  MapoutlinedIcon,
  GroupsIcon,
  OndemandVideoIcon,
  VideoCallIcon,
  WebIcon,
  QuizIcon,
  WysiwygIcon,
  ManageHistoryIcon,
  SettingsIcon,
  ExitToAppIcon,
} from "./Icon";

import avatarDefault from "../../../../public/assets/avatar.png";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { redirect } from "next/navigation";

interface itemProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: any;
}

const Item: FC<itemProps> = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      icon={icon}
      onClick={() => setSelected(title)}
    >
      <Typography className="!text-[16px] !font-Poppins">{title}</Typography>
      <Link href={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [logout, setlogout] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return null;
  }
  const logoutHandler = () => {
    setlogout(true);
  };
  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${
            theme === "dark" ? "#111C43 !important" : "#fff !important"
          }`,
        },

        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },

        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },

        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },

        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",

          opacity: 1,
        },

        "& pro-menu-item": {
          color: `${theme != "dark" && "#000"}`,
        },
      }}
      className="!bg-white dark:bg-[#111C43]"
    >
      <ProSidebar
        collapsed={isCollapsed}
        style={{
          position: "fixed",

          top: 0,

          left: 0,

          height: "100vh",
          width: isCollapsed ? "0%" : "16%",
        }}
      >
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}

          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <ArrowForwardIosIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
            }}
            className=" font-[500] dark:text-white ☐ text-black"
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Link href="/">
                  <h3 className="text-[25px] !font-Poppins font-[500] uppercase dark:text-white ☐ text-black">
                    Elearning
                  </h3>
                </Link>

                <IconButton
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="inline-block"
                >
                  <ArrowBackIosIcon className="text-black dark:text-[#ffffffc1]" />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex"  justifyContent="center" alignItems="center">
                <Image
                  alt="profile-user"
                  width={100}
                  height={90}
                  src={user.avatar ? user.avatar.url : avatarDefault}
                  
                  className="cursor-pointer w-[120px] h-[120px] mt-2 border-[3px]  border-[#ddd540] rounded-full"
                  // style={{
                  //   cursor: "pointer",
                  //   borderRadius: "100%",
                  //   border: "3px solid #5b6fe6",s  
                  // }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  color="#000"
                  fontWeight="bold"
                  className=" text-black dark:text-[#ffffffc1] !font-Poppins capitalize"
                 
                  sx={{ m: "7px 0 0 0" }}
                  >
                  {user?.name} 
                </Typography>
                <Typography
                  variant="h6"
                  className="!text-[20px] text-black dark:text-[#ffffffc1] !font-Poppins capitalize"
                  sx={{ m: "7px 0 0 0" }}
                >
                   {user.role}
                </Typography>
              </Box>
            </Box>
          )}

          {/* MENU ITEMS */}
          <Box paddingLeft={isCollapsed ? undefined : "10%"} className=" font-[300] dark:text-[#ffffff93] text-black">
            <Item
              title="Dashboard"
              to="/admin"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h5"
              className="!text-[18px] text-black dark:text-[#ffffffc1] !font-Poppins !font-[400] capitalize"
              sx={{ m: "15px 0 5px 25px" }}
            >
              {!isCollapsed && "Data"}
            </Typography>
            <Item
              title="Users"
              to="/admin/users"
              icon={<GroupsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Invoices"
              to="/admin/invoices"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h5"
              className="!text-[18px] text-black dark:text-[#ffffffc1] !font-Poppins !font-[400] capitalize"
              sx={{ m: "15px 0 5px 25px" }}
            >
              {!isCollapsed && "Content"}
            </Typography>
            <Item
              title="Create Course"
              to="/admin/create-course"
              icon={<VideoCallIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Live Courses"
              to="/admin/courses"
              icon={<OndemandVideoIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h5"
              className="!text-[18px] text-black dark:text-[#ffffffc1] !font-Poppins !font-[400] capitalize"
              sx={{ m: "15px 0 5px 25px" }}
            >
              {!isCollapsed && "Customization"}
            </Typography>
            <Item
              title="hero"
              to="/admin/hero"
              icon={<WebIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ"
              to="/admin/faq"
              icon={<QuizIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Categories"
              to="/admin/categories"
              icon={<WysiwygIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h5"
              className="!text-[18px] text-black dark:text-[#ffffffc1] !font-Poppins !font-[400] capitalize"
              sx={{ m: "15px 0 5px 25px" }}
            >
              {!isCollapsed && "Controllers"}
            </Typography>
            <Item
              title="Manage Team"
              to="/admin/manage-team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h5"
              className="!text-[18px] text-black dark:text-[#ffffffc1] !font-Poppins !font-[400] capitalize"
              sx={{ m: "15px 0 5px 25px" }}
            >
              {!isCollapsed && "Analytics"}
            </Typography>
            <Item
              title="Course Analytics"
              to="/admin/course-analytics"
              icon={<BarChartoutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Order Analytics"
              to="/admin/order-analytics"
              icon={<MapoutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="User Analytics"
              to="/admin/user-analytics"
              icon={<ManageHistoryIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h5"
              className="!text-[18px] text-black dark:text-[#ffffffc1] !font-Poppins !font-[400] capitalize"
              sx={{ m: "15px 0 5px 25px" }}
            >
              {!isCollapsed && "Extras"}
            </Typography>
            <Item
              title="Settings"
              to="/admin/settings"
              icon={<SettingsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Log Out"
              to="/admin/logout"
              icon={<ExitToAppIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};
export default Sidebar;
