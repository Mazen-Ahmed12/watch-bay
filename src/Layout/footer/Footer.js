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
      <div className="container px-2 mx-auto">
        <div className="flex flex-col gap-5 justify-between py-10 sm:gap-9 lg:gap-11 xl:gap-7 md:flex-row lg:flex-row">
          {links.map((link, index) => (
            <div
              key={index}
              className="pb-3.5 w-full md:w-1/2 lg:w-1/4 xl:w-1/5 sm:pb-0"
            >
              <h3 className="pb-0.5 mb-4 font-medium text-md lg:leading-7 sm:mb-5 lg:mb-6">
                {link.title}
              </h3>
              <ul className="flex flex-col space-y-3 text-sm">
                {link.links.map((text, index) => (
                  <li key={index} className="flex items-baseline">
                    <Link
                      to={text.link}
                      className="inline-block w-full text-border hover:text-subMain"
                    >
                      {text.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="pb-3.5 w-full md:w-1/2 lg:w-1/3 sm:pb-0">
            <Link to="/">
              <img
                src={`${process.env.PUBLIC_URL}/watchbay.jpg`}
                alt="logo"
                className="object-fill w-2/4 h-15"
              />
            </Link>
            <p className="mt-3 text-sm leading-7 text-border">
              <span>
                 cairo, Egypt
              </span>
              <br />
              <span>tell" +21848613512</span>
              <br />
              <span>Email: watch-bay@gmail.com</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
