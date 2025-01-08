import React from "react";
import {
  Subscriptions,
  Favorite,
  Login,
  Menu,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";

function MobileFooter() {
  const active = "bg-white !text-main";
  const inActive =
    "transitions text-2xl flex-colo hover:bg-white hover:text-main text-white rounded-md px-4 py-3";

  const Hover = ({ isActive }) =>
    isActive ? `${active} ${inActive}` : inActive;
  return (
    <>
      <div className="flex-btn h-full bg-white rounded cursor-pointer overflow-y-scroll flex-grow w-full">
        {/* Drawer */}
      </div>
      <footer className="lg:hidden fixed z-50 bottom-0 w-full px-1">
        <div className="bg-dry rounded-md flex-btn w-full p-1">
          <NavLink to="/movies" className={Hover}>
            <Subscriptions />
          </NavLink>
          <NavLink to="/favorities" className={Hover}>
            <div className="relative">
            <div className="w-5 h-5 flex-colo rounded-full text-xs bg-subMain text-white absolute -top-5 -right-1">
              2
            </div>
            <Favorite />
            </div>
          </NavLink>
          <NavLink to="/login" className={Hover}>
            <Login />
          </NavLink>
          <Button className={`${inActive} hover:!text-main !text-white`}>
            <Menu />
          </Button>
        </div>
      </footer>
    </>
  );
}

export default MobileFooter;
