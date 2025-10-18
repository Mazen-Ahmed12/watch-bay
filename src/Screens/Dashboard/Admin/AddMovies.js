import { Typography } from "@mui/material";
import { TextFields } from "components/Textfield";
import CastsModal from "components/modals/CastsModal";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { ImUpload } from "react-icons/im";
import { MdDelete } from "react-icons/md";
import { CategoriesData } from "../../../Data/CategoriesData";
import { UsersData } from "../../../Data/MovieData";
import Uploader from "../../../components/Uploader";
import { Message, Select } from "../../../components/UsedInputs";
import SideBar from "../SideBar";

function AddMovie() {
  const [modalOpen, setModalOpen] = useState(false);
  const [cast, setCast] = useState(null);

  useEffect(() => {
    if (modalOpen === false) {
      setCast();
    }
  }, [modalOpen]);

  return (
    <SideBar>
      <CastsModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        cast={cast}
      />
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Create Movie</h2>
        <div className="grid gap-6 w-full md:grid-cols-2">
          <TextFields
            title="Movie Title"
            placeholder="Game of Thrones"
            type="text"
          />
          <TextFields title="Hours" placeholder="2hr" type="text" />
        </div>

        <div className="grid gap-6 w-full md:grid-cols-2">
          <TextFields title="Language Used" placeholder="English" type="text" />
          <TextFields
            title="Year of Release"
            placeholder="2022"
            type="number"
          />
        </div>

        {/* IMAGES */}
        <div className="grid gap-6 w-full md:grid-cols-2">
          {/* img without title */}
          <div className="flex flex-col gap-2">
            <Typography
              variant="button"
              className="text-border align-baseline !normal-case"
            >
              Image without Title
            </Typography>
            <Uploader />
            <div className="p-2 w-32 h-32 rounded border bg-main border-border">
              <img
                src={`${process.env.PUBLIC_URL}/images/14.jpg`}
                alt=""
                className="object-contain w-full h-full rounded"
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
            <div className="p-2 w-32 h-32 rounded border bg-main border-border">
              <img
                src={`${process.env.PUBLIC_URL}/images/13.jpg`}
                alt=""
                className="object-contain w-full h-full rounded"
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
        <div className="w-full text-sm">
          <Select label="Movie Category" options={CategoriesData} />
        </div>
        {/* MOVIE VIDEO */}

        <div className="flex flex-col gap-2 w-full">
          <label className="text-sm font-semibold text-border">
            Movie Video
          </label>
          <Uploader />
        </div>
        {/* CASTS */}
        <div className="grid gap-6 items-start w-full lg:grid-cols-2">
          <button
            onClick={() => setModalOpen(true)}
            className="py-4 w-full text-white rounded border border-dashed bg-main border-subMain"
          >
            Add Cast
          </button>
          <div className="grid grid-cols-2 gap-4 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-4">
            {UsersData.map((user, i) => (
              <div
                key={i}
                className="p-2 text-xs italic rounded border text-text flex-colo bg-main border-border"
              >
                <img
                  src={`${process.env.PUBLIC_URL}/images/${user.image ? user.image : "user.png"}`}
                  alt={user.fullName}
                  className="object-contain mb-2 w-full h-24 rounded"
                />
                <p>{user.fullName}</p>
                <div className="gap-2 mt-2 w-full flex-rows">
                  <button className="w-6 h-6 rounded border flex-colo bg-dry border-border text-subMain">
                    <MdDelete />
                  </button>
                  <button
                    onClick={() => {
                      setCast(user);
                      setModalOpen(true);
                    }}
                    className="w-6 h-6 text-green-600 rounded border flex-colo bg-dry border-border"
                  >
                    <FaEdit />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* SUBMIT */}
        <button className="gap-6 py-4 w-full font-medium text-white rounded bg-subMain flex-rows">
          <ImUpload /> Publish Movie
        </button>
      </div>
    </SideBar>
  );
}

export default AddMovie;
