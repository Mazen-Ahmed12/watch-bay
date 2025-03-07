import React from "react";
import MainDrawer from "./MainDrawer";
import { IoClose } from "react-icons/io5";
import { IconButton } from "@mui/material";
import { MovieCreation, Info, Phone } from "@mui/icons-material";
import { Link, NavLink } from "react-router-dom";
import { Facebook, Instagram, WhatsApp } from "@mui/icons-material";
import ShareBar from "./ShareBar";


function MenuDrawer({ drawerOpen, toggleDrawer }) {
  const active = "bg-dry text-subMain";
  const hover = "hover:text-white hover:bg-dry";
  const inActive =
    "rounded sm:gap-10 font-medium text-sm transitions flex gap-6 items-center sm:px-8 px-4 py-4 items-center";
  const Hover = ({ isActive }) =>
    isActive ? `${active} ${inActive}` : `${inActive} ${hover}`;

  const WebSitePages = [
    {
      name: "Movies",
      link: "/movies",
      icon: MovieCreation,
    },
    {
      name: "About Us",
      link: "/about-us",
      icon: Info,
    },
    {
      name: "Contact Us",
      link: "/contact-us",
      icon: Phone,
    },
  ];

  return (
    <MainDrawer drawerOpen={drawerOpen} closeDrawer={toggleDrawer}>
      <div className="flex flex-col w-full h-full justify-between items-center bg-main text-white rounded">
        <div className="w-full flex-btn h-16 px-6 py-4 bg-dry">
          <Link to="/" onClick={toggleDrawer}>
            <img
              src={`${process.env.PUBLIC_URL}/moviesPlay.jpg`}
              alt="logo"
              className="w-full h-12 object-contain"
            />
          </Link>
          <IconButton
            onClick={toggleDrawer}
            className=" transitions w-10 h-10 flex-colo text-base text-subMain !bg-white rounded-full hover:!bg-subMain hover:text-white !absolute top-3 right-5   "
          >
            <IoClose />
          </IconButton>
        </div>
        {/* menu links*/}
        <div className="w-full overflow-y-scroll flex-grow max-hight-full">
          {WebSitePages.map((link, index) => (
            <NavLink
              to={link.link}
              key={index}
              onClick={toggleDrawer}
              className={Hover}
            >
              <link.icon className="text-lg" />
              {link.name}
            </NavLink>
          ))}
          <div className="flex-rows gap-6 w-full p6">
          <ShareBar link="https://www.facebook.com/" value={"Facebook"} icon={<Facebook />} style={"!bg-blue-600 hover:!bg-blue-700 !text-white p-3 rounded-full"} />
          <ShareBar link="https://web.whatsapp.com/" value={"whatsapp"} icon={<WhatsApp />} style={"!bg-green-500 !hover:bg-green-600 !text-white p-3 rounded-full"}/>
          <ShareBar link="https://web.whatsapp.com/" value={"whatsapp"} icon={<Instagram />} style={"!bg-pink-500 hover:!bg-pink-600 !text-white p-3 rounded-full"}/>
        </div>
        </div>
      </div>
    </MainDrawer>
  );
}

export default MenuDrawer;
