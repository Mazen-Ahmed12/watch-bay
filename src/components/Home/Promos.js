import React from "react";
import { FiUser } from "react-icons/fi";

function Promos() {
  return (
    <div className="px-8 py-10 my-20 md:px-20 bg-dry">
      <div className="items-center lg:flex lg:gap-10">
        <div className="flex flex-col gap-6 lg:gap-10 lg:w-1/2">
          <h1 className="font-sans text-xl font-medium capitalize xl:text-3xl sl:leading-loose">
            Download your movies to watch it offline
          </h1>
          <p className="text-sm leading-6 text-text xl:text-base xl:leading-8">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>
          <div className="flex gap-4 justify-center pb-6 text-sm md:text-lg">
            <div className="px-6 py-3 font-bold bg-black rounded flex-colo text-subMain">
             HD 4k
            </div>
            <div className="gap-4 px-6 py-3 font-bold bg-black rounded flex-rows text-subMain">
              <FiUser /> 2k
            </div>
          </div>
        </div>
        <div className="lg:w-1/2">
          <img src={`${process.env.PUBLIC_URL}/mobileView.jpg`} alt="mobile View" className="object-fill mx-auto w-3/5 h-1/2"/>
        </div>
      </div>
    </div>
  );
}

export default Promos;
