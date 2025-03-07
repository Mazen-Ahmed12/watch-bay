import { Dialog, DialogContent, IconButton } from "@mui/material";

import React, { useRef } from "react";
import { IoClose } from "react-icons/io5";

function MainModal({ modalOpen, setModalOpen, children }) {
  const cancelButtonRef = useRef();
  return (
    <Dialog
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      PaperProps={{
        className: "!opacity 0.5 rounded-lg !bg-black !bg-opacity-10 ",
      }}
      fullScreen={true}
    >
      <IconButton
        onClick={() => setModalOpen(false)}
        edge="end"
        color="inherit"
        aria-label="close"
        ref={cancelButtonRef}
        className=" transitions w-10 h-10 flex-colo text-base text-subMain !bg-white rounded-full hover:!bg-subMain hover:text-white !absolute top-3 right-5   "
      >
        <IoClose />
      </IconButton>
      <DialogContent dividers className="flex-colo">
        <div className="w-full h-max flex-colo pt-24 ">{children}</div>
      </DialogContent>
    </Dialog>
  );
}

export default MainModal;
