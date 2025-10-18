import { BsFillGridFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { RiLockPasswordLine, RiMovie2Fill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import Layout from "../../Layout/Layout";

function SideBar({ children }) {
  const SideLinks = [
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: BsFillGridFill,
    },
    {
      name: "Favorites Movies",
      link: "/favorites",
      icon: FaHeart,
    },
    {
      name: "Add Movie",
      link: "/addmovie",
      icon: RiMovie2Fill,
    },
    {
      name: "Update Profile",
      link: "/profile",
      icon: FiSettings,
    },
    {
      name: "Change Password",
      link: "/password",
      icon: RiLockPasswordLine,
    },
  ];
  const active = "bg-dryGray text-subMain";
  const hover = "hover:text-white hover:bg-main";
  const inActive =
    "rounded font-medium text-sm transitions flex gap-3 items-center p-4";
  const Hover = ({ isActive }) =>
    isActive ? `${active} ${inActive}` : `${inActive} ${hover}`;

  return (
    <Layout>
      <div className="container px-2 mx-auto min-h-screen">
        <div className="grid-cols-8 gap-10 items-start py-6 xl:grid md:py-12">
          <div className="sticky col-span-2 p-6 mb-5 rounded-md border border-gray-800 bg-dry xl:mb-0">
            {
              // SideBar Links
              SideLinks.map((link, index) => (
                <NavLink to={link.link} key={index} className={Hover}>
                  <link.icon /> <p>{link.name}</p>
                </NavLink>
              ))
            }
          </div>
          <div
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="10"
            data-aos-offset="200"
            className="col-span-6 p-4 rounded-md border border-gray-800 bg-dry"
          >
            {children}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default SideBar;
