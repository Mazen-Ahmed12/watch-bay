import React from "react";
import { IconButton } from "@mui/material";

function ShareBar({ link, value, icon, style }) {
  return (
    <IconButton
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={style}
      aria-label={value}
    >
      {icon}
    </IconButton>
  );
}

export default ShareBar;
