import React from "react";
import Uploader from "../../components/Uploader";
import { Input } from "../../components/UsedInputs";
import SideBar from "./SideBar";

function Profile() {
  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Profile</h2>
        <Uploader />
        <Input
          label="FullName"
          placeholder="Netflixo React Tailwind"
          type="text"
          bg={true}
        />
        <Input
          label="Email"
          placeholder="netflixo@gmail.com"
          type="email"
          bg={true}
        />
        <div className="flex flex-col-reverse flex-wrap gap-2 justify-between items-center my-4 sm:flex-row">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 w-full font-medium text-white rounded border bg-subMain transitions hover:bg-main border-subMain sm:w-auto"
          >
            Delete Account
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 w-full font-medium text-white rounded border bg-main transitions hover:bg-subMain border-subMain sm:w-auto"
          >
            Update Profile
          </button>
        </div>
      </div>
    </SideBar>
  );
}

export default Profile;
