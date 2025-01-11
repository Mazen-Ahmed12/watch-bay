import { Drawer } from "@mui/material";
import React from "react";

function MainDrawer({ children, drawerOpen, closeDrawer }) {
  return (
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={closeDrawer}
    >
      <div className="w-screen h-screen">{children}</div>
    </Drawer>
  );
}

export default MainDrawer;
