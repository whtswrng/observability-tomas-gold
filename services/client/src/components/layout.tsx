import { Typography } from "@mui/material";

export const Layout = ({ title, children }) => {
  return (
    <div>
      <Typography variant="h3" gutterBottom>
        {" "}
        {title}{" "}
      </Typography>
      <div>{children}</div>
    </div>
  );
};
