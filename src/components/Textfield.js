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
  );
};
