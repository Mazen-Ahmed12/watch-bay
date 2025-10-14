import { useState } from 'react';
import { CiLogin } from "react-icons/ci";
import { IoSearch } from 'react-icons/io5';
import { MdFavorite } from "react-icons/md";
import { Link, NavLink, useNavigate } from 'react-router-dom';

function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const Hover = ({ isActive }) =>
    isActive
      ? 'hover:text-main text-subMain transitions'
      : 'hover:text-subMain transitions text-white';

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
      setSearchQuery('');
    }
  };

  return (
    <>
      <div className="sticky top-0 z-20 shadow-md bg-main">
        <div className="container grid-cols-7 gap-10 justify-between items-center px-2 py-6 mx-auto lg:grid">
          <div className="hidden col-span-1 lg:block">
            <Link to="/">
              <img
                src={`${process.env.PUBLIC_URL}/watchbay.jpg`}
                alt="logo"
                className="object-cover w-full h-16"
              />
            </Link>
          </div>
          {/*search bar*/}
          <div className="col-span-3">
            <form onSubmit={handleSearch} className="gap-4 w-full text-sm rounded bg-dryGray flex-btn">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for movies..."
                className="px-2 w-11/12 h-12 text-sm font-medium text-black bg-transparent border-none placeholder:text-border focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Search"
                className="w-12 h-12 text-white rounded bg-subMain flex-colo hover:bg-main transitions focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-subMain"
              >
                <IoSearch className="w-5 h-5" />
              </button>
            </form>
          </div>
          {/*menus*/}
          <div className="hidden col-span-3 justify-between items-center text-sm font-medium xl:gap-12 2xl:gap-16 lg:flex xl:justify-end">
            <NavLink to="/Movies" className={Hover}>
              Movies
            </NavLink>
            <NavLink to="/about-us" className={Hover}>
              About Us
            </NavLink>
            <NavLink to="/contact-us" className={Hover}>
              Contact Us
            </NavLink>
            <NavLink to="/favorites" className={Hover}>
              <MdFavorite className={`w-8 h-8`} />
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

export default Header;
