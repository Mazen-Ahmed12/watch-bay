import React from "react";
import { Link } from "react-router-dom";
import { Input } from "../components/UsedInputs";
import Layout from "../Layout/Layout";
import { FiLogIn } from "react-icons/fi";

function Register() {
  return (
    <Layout>
      <div className="container mx-auto px-2 my-24 flex-colo">
        <div className="w-full 2xl:w-2/5 gap-8 flex-colo p-8 sm:p-14 md:w-3/5 bg-dry  rounded-lg border border-border">
          <img
            src={`${process.env.PUBLIC_URL}/moviesPlay.jpg`}
            alt="logo"
            className="w-full h-12 object-contain"
          />
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
          <Input
            label="Password"
            placeholder="*******"
            type="password"
            bg={true}
          />
          <Link
            to="/dashboard"
            className="bg-subMain transitions hover:bg-main flex-rows gap-4 text-white p-4 rounded-lg w-full"
          >
            <FiLogIn /> Sign Up
          </Link>
          <p className="text-center text-border">
            Already have an account?{" "}
            <Link to="/login" className="text-dryGray font-semibold ml-2">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default Register;
