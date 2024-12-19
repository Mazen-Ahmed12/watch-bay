import React, { useEffect, useState } from "react";
import Uploader from "../../../components/Uploader";
import { Input, Message, Select } from "../../../components/UsedInputs";
import SideBar from "../SideBar";
import { CategoriesData } from "../../../Data/CategoriesData";
import { UsersData } from "../../../Data/MovieData";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { ImUpload } from "react-icons/im";
import { TextField, Typography } from "@mui/material";

function AddMovie() {
  
  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Create Movie</h2>
        <div className="w-full  grid md:grid-cols-2 gap-6">
          <div className="w-full flex-row  gap-6">
            <Typography
              variant="button"
              className="text-border align-baseline !normal-case"
            >
              Movie Title
            </Typography>
            <TextField
              placeholder="Game of Thrones"
              type="text"
              variant="outlined" // Options: "outlined", "filled", "standard"
              fullWidth // Adds responsive width (if required)
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#4B5563", // Border color
                    borderWidth: "1px",
                  },
                  "&:hover fieldset": {
                    borderColor: "#4B5563", // Border color on hover
                    borderWidth: "1px",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#4B5563", // Border color when focused
                    borderWidth: "1px",
                  },
                  backgroundColor: "#080A1A",
                },
                "& .MuiInputBase-input": {
                  color: "#FFFFFF", // Text color inside the input
                },
              }}
            />
          </div>
          <div className="w-full flex-row  gap-6">
            <Typography
              variant="button"
              className="text-border align-baseline !normal-case"
            >
              hours
            </Typography>
            <TextField
              placeholder="2hr"
              type="text"
              variant="outlined" // Options: "outlined", "filled", "standard"
              fullWidth // Adds responsive width (if required)
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#4B5563", // Border color
                    borderWidth: "1px",
                  },
                  "&:hover fieldset": {
                    borderColor: "#4B5563", // Border color on hover
                    borderWidth: "1px",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#4B5563", // Border color when focused
                    borderWidth: "1px",
                  },
                  backgroundColor: "#080A1A",
                },
                "& .MuiInputBase-input": {
                  color: "#FFFFFF", // Text color inside the input
                },
              }}
            />
          </div>
        </div>

        <div className="w-full  grid md:grid-cols-2 gap-6">
          <div className="w-full flex-row  gap-6">
            <Typography
              variant="button"
              gutterBottom
              className="text-border align-baseline !normal-case"
            >
              Language Used
            </Typography>
            <TextField
              placeholder="Game of Thrones"
              type="text"
              variant="outlined" // Options: "outlined", "filled", "standard"
              fullWidth // Adds responsive width (if required)
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#4B5563", // Border color
                    borderWidth: "1px",
                  },
                  "&:hover fieldset": {
                    borderColor: "#4B5563", // Border color on hover
                    borderWidth: "1px",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#4B5563", // Border color when focused
                    borderWidth: "1px",
                  },
                  backgroundColor: "#080A1A",
                },
                "& .MuiInputBase-input": {
                  color: "#FFFFFF", // Text color inside the input
                },
              }}
            />
          </div>
          <div className="w-full flex-row  gap-6">
            <Typography
              variant="button"
              className="text-border align-baseline !normal-case"
            >
              Year of Release
            </Typography>
            <TextField
              placeholder="2022"
              type="number"
              variant="outlined" // Options: "outlined", "filled", "standard"
              fullWidth // Adds responsive width (if required)
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#4B5563", // Border color
                    borderWidth: "1px",
                  },
                  "&:hover fieldset": {
                    borderColor: "#4B5563", // Border color on hover
                    borderWidth: "1px",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#4B5563", // Border color when focused
                    borderWidth: "1px",
                  },
                  backgroundColor: "#080A1A",
                },
                "& .MuiInputBase-input": {
                  color: "#FFFFFF", // Text color inside the input
                },
              }}
            />
          </div>
        </div>

        {/* IMAGES */}
        <div className="w-full grid md:grid-cols-2 gap-6">
          {/* img without title */}
          <div className="flex flex-col gap-2">
            <Typography
              variant="button"
              className="text-border align-baseline !normal-case"
            >
              Image without Title
            </Typography>
            <Uploader />
            <div className="w-32 h-32 p-2 bg-main border border-border rounded">
              <img
                src="/movies/14.jpg"
                alt=""
                className="w-full h-full object-cover rounded"
              />
            </div>
          </div>
          {/* image with title */}
          <div className="flex flex-col gap-2">
            <Typography
              variant="button"
              className="text-border align-baseline !normal-case"
            >
              Image with Title
            </Typography>
            <Uploader />
            <div className="w-32 h-32 p-2 bg-main border border-border rounded">
              <img
                src="/movies/13.jpg"
                alt=""
                className="w-full h-full object-cover rounded"
              />
            </div>
          </div>
        </div>
        {/* DESCRIPTION */}
        <Message
          label="Movie Description"
          placeholder="Make it short and sweet"
        />
        {/* CATEGORY */}
        <div className="text-sm w-full">
          <Select label="Movie Category" options={CategoriesData} />
        </div>
        {/* MOVIE VIDEO */}

        <div className="flex flex-col gap-2 w-full ">
          <label className="text-border font-semibold text-sm">
            Movie Video
          </label>
          <Uploader />
        </div>
        {/* CASTS */}
        <div className="w-full grid lg:grid-cols-2 gap-6 items-start ">
          <button className="w-full py-4 bg-main border border-subMain border-dashed text-white rounded">
            Add Cast
          </button>
          <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-4 grid-cols-2 gap-4">
            {UsersData.map((user, i) => (
              <div
                key={i}
                className="p-2 italic text-xs text-text rounded flex-colo bg-main border border-border"
              >
                <img
                  src={`/images/${user.image ? user.image : "user.png"}`}
                  alt={user.fullName}
                  className="w-full h-24 object-cover rounded mb-2"
                />
                <p>{user.fullName}</p>
                <div className="flex-rows mt-2 w-full gap-2">
                  <button className="w-6 h-6 flex-colo bg-dry border border-border text-subMain rounded">
                    <MdDelete />
                  </button>
                  <button className="w-6 h-6 flex-colo bg-dry border border-border text-green-600 rounded">
                    <FaEdit />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* SUBMIT */}
        <button className="bg-subMain w-full flex-rows gap-6 font-medium text-white py-4 rounded">
          <ImUpload /> Publish Movie
        </button>
      </div>
    </SideBar>
  );
}

export default AddMovie;
