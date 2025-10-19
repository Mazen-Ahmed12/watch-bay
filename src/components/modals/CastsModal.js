import React from "react";
import MainModal from "./MainModal";
import { Input } from "../UsedInputs";
import Uploader from "components/Uploader";
import { Typography } from "@mui/material";

function CastsModal({ modalOpen, setModalOpen, cast }) {
  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block p-10 w-full h-full text-white align-middle rounded-2xl border border-border bg-main">
        <h2 className="text-3xl font-bold flex-colo">
          {cast ? "Update Cast" : "Create Cast"}
        </h2>
        <form className="flex flex-col gap-6 mt-6 text-left">
          <Input
            label="Cast Name"
            placeholder={cast ? cast.fullName : "jhon doe"}
            type="text"
            bg={false}
          />
          <div className="flex flex-col gap-2">
            <Typography
              variant="button"
              className="text-border align-baseline !normal-case"
            >
              Cast Image
            </Typography>
            <Uploader />
            <div className="p-2 w-32 h-32 rounded border bg-main border-border">
              <img
                src="https://picsum.photos/300/600/300"
                alt=""
                className="object-fill w-full h-full rounded"
              />
            </div>
          </div>
          <button
            onClick={() => setModalOpen(false)}
            className="gap-4 py-3 mt-4 w-full text-lg text-white rounded flex-rows transitions hover:bg-dry border-3 border-subMain bg-subMain"
          >
            {cast ? "Update" : "Add"}
          </button>
        </form>
      </div>
    </MainModal>
  );
}

export default CastsModal;
