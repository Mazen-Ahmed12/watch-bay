import { Tooltip, IconButton } from "@mui/material";

export const Tooltips = ({ platform, icon, link ,color }) => {
  return (
    <Tooltip title={`share on ${platform}`}>
      <IconButton onClick={link} color="primary">
        {icon}
      </IconButton>
    </Tooltip>
  );
};
