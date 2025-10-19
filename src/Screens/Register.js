import React from "react";
import { Link } from "react-router-dom";
import { Input } from "../components/UsedInputs";
import Layout from "../Layout/Layout";
import { FiLogIn } from "react-icons/fi";

function Register() {
  return (
    <Layout>
      <div className="container px-2 mx-auto my-24 flex-colo">
        <div className="gap-8 p-8 w-full rounded-lg border 2xl:w-2/5 flex-colo sm:p-14 md:w-3/5 bg-dry border-border">
          <img
            src={`${process.env.PUBLIC_URL}/watchbay.jpg`}
            alt="logo"
            className="object-fill w-full h-36"
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
            className="gap-4 p-4 w-full text-white rounded-lg bg-subMain transitions hover:bg-main flex-rows"
          >
            <FiLogIn /> Sign Up
          </Link>
          <p className="text-center text-border">
            Already have an account?{" "}
            <Link to="/login" className="ml-2 font-semibold text-dryGray">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default Register;
