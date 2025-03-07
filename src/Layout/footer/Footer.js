import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  const links = [
    {
      title: "company",
      links: [
        {
          name: "Home",
          link: "/",
        },
        {
          name: "About Us",
          link: "/about-us",
        },
        {
          name: "Contact Us",
          link: "/contact-us",
        },
        {
          name: "Movies",
          link: "/movies",
        },
        {
          name: "Series",
          link: "/series",
        },
      ],
    },
    {
      title: "top categories",
      links: [
        {
          name: "Action",
          link: "#",
        },
        {
          name: "Romantic",
          link: "#",
        },
        {
          name: "Drama",
          link: "#",
        },
        {
          name: "horror",
          link: "#",
        },
        {
          name: "comedy",
          link: "#",
        },
      ],
    },
    {
      title: "My Account",
      links: [
        {
          name: "Dashboard",
          link: "/Dashboard",
        },
        {
          name: "My Favourites",
          link: "/favourite",
        },
        {
          name: "Profile",
          link: "/Profile",
        },
        {
          name: "Change Passoword",
          link: "/password",
        },
      ],
    },
  ];
  return (
    <div className="bg-dry py-4 bprder=t-2 border-black ">
      <div className="container mx-auto px-2 ">
        <div className="grid grid-cols-2 md:grid-cols-4 1g:grid-cols-9 gap-5 sm:gap-9 lg:gap-11 xl:gap-7 py-10 justify-between ">
          {links.map((link, index) => (
            <div
              key={index}
              className="col-span-1 md:col-span-1 1g:col-span-2 pb-3.5 sm:pb-0"
            >
              <h3 className="text-md lg:leading-7 font-medium mb-4 sm:mb-5 1g:mb-6 pb-0.5">
                {link.title}
              </h3>
              <ul className="text-sm flex flex-col space-y-3">
                {link.links.map((text, index) => (
                  <li key={index} className="flex items-baseline">
                    <Link
                      to={text.link}
                      className="text-border inline-block w-full  hover:text-subMain"
                    >
                      {text.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="pb-3.5 sm:pb-0 col-span-1 md:col-span-1 1g:col-span-3 m-auto">
            <Link to="/">
              <img
                src={`${process.env.PUBLIC_URL}/moviesPlay.jpg`}
                alt="logo"
                className="w-2/4 h-15 object-contain"
              />
            </Link>
            <p className="leading-7 text-sm text-border mt-3">
              <span>
                75 hamdy street, <br /> cairo, Egypt
              </span>
              <br />
              <span>tell" +21848613512</span>
              <br />
              <span>Email: mgasdfrew@gmail.com</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
