import React from "react";
import { Link, NavLink } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { MdFavorite } from "react-icons/md";
import { CiLogin } from "react-icons/ci";

function NavBar() {
  const hover = 'hover:text-subMain transitions text-white';
  const Hover = ({ isActive }) => (isActive ? 'text-subMain' : hover);

  return (
    <>
      <div className="bg-main shadow-md sticky top-0 z-20">
        <div className="container mx-auto py-6 px-2 lg:grid gap-10 grid-cols-7 justify-between items-center">
          <div className="col-span-1 lg:block hidden">
            <Link to="/">
              <img
                src={`${process.env.PUBLIC_URL}/moviesPlay.jpg`}
                alt="logo"
                className="w-full h-16 object-contain"
              />
            </Link>
          </div>
          {/*search bar*/}
          <div className="col-span-3">
            <form className="w-full text-sm bg-dryGray rounded flex-btn gap-4">
              <input
                type="text"
                placeholder="search from here"
                className="font-medium placeholder:text-border text-sm w-11/12 h-12 bg-transparent border-none px-2 text-black"
              />
              <button
                type="submit"
                className="bg-subMain w-12 h-12 flex-colo rounded text-white"
              >
                <IoSearch />
              </button>
            </form>
          </div>
          {/*menus*/}
          <div className="col-span-3 font-medium text-sm hidden xl:gap-12 2xl:gap-16 justify-between lg:flex xl:justify-end items-center">
            <NavLink to="/Movies" className={Hover}>
              Movies
            </NavLink>
            <NavLink to="/about-us" className={Hover}>
              About Us
            </NavLink>
            <NavLink to="/contact-us" className={Hover}>
              Contact Us
            </NavLink>
            <NavLink to="/Favorities " className={`${Hover} relative`}>
              <MdFavorite className="w-8 h-8 hover:text-subMain" />
              <div className="w-5 h-5 flex-colo rounded-full text-xs bg-subMain text-white absolute -top-5 -right-1">
                2
              </div>
            </NavLink>
            <NavLink to="/login" className={Hover}>
              <CiLogin className="w-8 h-8" />
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
