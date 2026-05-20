import { Typography,TextField } from "@mui/material";

export const TextFields = ({ title, placeholder, type }) => {
  return (
    <div className="w-full flex-row  gap-6">
      <Typography
        variant="button"
        className="text-border align-baseline !normal-case"
      >
        {title}
      </Typography>
      <TextField
        placeholder={placeholder}
        type={type}
        variant="outlined" 
        fullWidth 
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#4B5563", 
              borderWidth: "1px",
            },
            "&:hover fieldset": {
              borderColor: "#4B5563", 
              borderWidth: "1px",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#4B5563", 
              borderWidth: "1px",
            },
            backgroundColor: "#080A1A",
          },
          "& .MuiInputBase-input": {
            color: "#FFFFFF", 
          },
        }}
      />
    </div>
  );
};
