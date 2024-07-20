import { Box, CircularProgress } from "@mui/material";

export function Spinner() {
  return (
    <Box sx={{ width: 300, padding: 40 }}>
      <CircularProgress />
    </Box>
  );
}
