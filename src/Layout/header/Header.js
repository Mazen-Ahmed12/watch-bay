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
        <div className="container mx-auto px-2 py-6">
          <div className="flex flex-col gap-4 md:flex-row md:gap-10 md:justify-between md:items-center">
            <div className="flex flex-shrink-0 gap-4 items-center px-2 md:w-3/5">
              <Link to="/">
                <img
                  src={`${process.env.PUBLIC_URL}/watchbay.jpg`}
                  alt="logo"
                  className="object-fill w-full h-10 md:h-16"
                />
              </Link>
              {/* Responsive search bar */}
              <div className="flex-1 md:flex-1">
                <form onSubmit={handleSearch} className="gap-2 md:gap-4 w-full text-sm rounded bg-dryGray flex-btn">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for movies..."
                    className="px-2 md:px-2 w-full md:w-11/12 h-10 md:h-12 text-sm font-medium text-black bg-transparent border-none placeholder:text-border focus:outline-none"
                  />
                  <button
                    type="submit"
                    aria-label="Search"
                    className="w-10 h-10 md:w-12 md:h-12 text-white rounded bg-subMain flex-colo hover:bg-main transitions focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-subMain"
                  >
                    <IoSearch className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </form>
              </div>
            </div>
            {/* Desktop menus - hidden on mobile */}
            <div className="hidden md:flex flex-nowrap gap-10 justify-end items-center text-base">
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
      </div>
    </>
  );
}

export default Header;
