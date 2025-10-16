import {
  Facebook,
  Info,
  Instagram,
  MovieCreation,
  Phone,
  WhatsApp,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { IoClose } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import MainDrawer from "./MainDrawer";
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
      <div className="flex flex-col justify-between items-center w-full h-full text-white rounded bg-main">
        <div className="px-6 py-4 w-full h-16 flex-btn bg-dry">
          <Link to="/" onClick={toggleDrawer}>
            <img
              src={`${process.env.PUBLIC_URL}/watchbay.jpg`}
              alt="logo"
              className="object-contain w-full h-12"
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
        <div className="overflow-y-scroll flex-grow w-full max-hight-full">
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
          <div className="flex flex-row gap-6 justify-center p-6 w-full">
            <ShareBar
              link="https://www.facebook.com/"
              value="Facebook"
              icon={
                <Facebook className="!w-10 !h-10 text-blue-600 hover:text-blue-700" />
              }
            />
            <ShareBar
              link="https://web.whatsapp.com/"
              value="whatsapp"
              icon={
                <WhatsApp className="!w-10 !h-10 text-green-500 hover:text-green-600" />
              }
            />
            <ShareBar
              link="https://www.instagram.com/"
              value="Instagram"
              icon={<Instagram className="!w-10 !h-10 text-pink-500 hover:text-pink-600" />}
            />
          </div>
        </div>
      </div>
    </MainDrawer>
  );
}

export default MenuDrawer;
