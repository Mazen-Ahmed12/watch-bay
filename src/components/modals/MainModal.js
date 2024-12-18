import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";

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
      maxWidth="md"
      fullWidth
    >
      <DialogTitle
        id="modal-title"
        className="flex justify-between items-center"
      >
        <span>Modal Title</span>
        <IconButton
          onClick={() => setModalOpen(false)}
          edge="end"
          color="inherit"
          aria-label="close"
          ref={cancelButtonRef}
        >
          <IoClose />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <div className="min-h-screen px-4">{children}</div>
      </DialogContent>
      <DialogActions>
        <button
          onClick={() => setModalOpen(false)}
          type="button"
          className="text-base text-subMain bg-white rounded-full hover:bg-subMain hover:text-white p-5"
        >
          Close
        </button>
      </DialogActions>
    </Dialog>
  );
}

export default MainModal;
