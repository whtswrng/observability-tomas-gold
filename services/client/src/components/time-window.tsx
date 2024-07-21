import React, { useState } from "react";
import { Select, MenuItem, FormControl, InputLabel, Button, Box, Typography } from "@mui/material";
import { addMinutes } from "date-fns";
import { useTimeWindow } from "../contexts/time-window-provider";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";

const TimeWindow: React.FC = () => {
  const { setStartTime } = useTimeWindow();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleTimeChange = (event: any) => {
    const value = event?.target?.value as string;
    setSelectedOption(value);

    const now = new Date();
    let newStartTime;

    switch (value) {
      case "1":
        newStartTime = addMinutes(now, -1);
        break;
      case "5":
        newStartTime = addMinutes(now, -5);
        break;
      case "10":
        newStartTime = addMinutes(now, -10);
        break;
      default:
        newStartTime = now;
    }

    setStartTime(newStartTime);
  };

  return (
    <div style={{ display: "flex", maxWidth: 500, gap: 10 }}>
      <FormControl fullWidth variant="outlined" sx={{ mt: 2}}>
        <InputLabel size="small">Time Window</InputLabel>
        <Select size={"small"} value={selectedOption} onChange={handleTimeChange} label="Time Window">
          <MenuItem value="1">1 minute ago</MenuItem>
          <MenuItem value="5">5 minutes ago</MenuItem>
          <MenuItem value="10">10 minutes ago</MenuItem>
        </Select>
      </FormControl>
      <div>
        <StartStopButton />
      </div>
    </div>
  );
};

const StartStopButton: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);

  const handleButtonClick = () => {
    setIsRunning(!isRunning);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 2.4, minWidth: 150 }}>
      <Button
        variant="contained"
        color={isRunning ? "secondary" : "primary"}
        onClick={handleButtonClick}
        startIcon={isRunning ? <StopIcon /> : <PlayArrowIcon />}
      >
        <Typography sx={{fontSize: 10}}>
            {isRunning ? "Stop live reload" : "Start live reload"}
        </Typography>
      </Button>
    </Box>
  );
};

export default TimeWindow;
