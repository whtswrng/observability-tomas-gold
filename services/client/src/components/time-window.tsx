import React, { useEffect, useState } from "react";
import { Select, MenuItem, FormControl, InputLabel, Button, Box, Typography } from "@mui/material";
import { addMinutes } from "date-fns";
import { useTimeWindow } from "../contexts/time-window-provider";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";

export const LIVE_RELOAD_INTERVAL_IN_MS = 10000;

const TimeWindow: React.FC = () => {
  const { setStartTime } = useTimeWindow();
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [liveEnabled, setLiveEnabled] = useState(true);

  const handleTimeChange = (value: string) => {
    setSelectedOption(value);
    const now = new Date();
    const newStartTime = addMinutes(now, -parseInt(value)).getTime();
    setStartTime(newStartTime);
  };

  useEffect(() => {
    if (!selectedOption || ! liveEnabled) return;
    const interval = setInterval(() => {
      handleTimeChange(selectedOption);
    }, LIVE_RELOAD_INTERVAL_IN_MS);
    return () => {
      // graceful shutdown
      clearInterval(interval);
    };
  }, [selectedOption, liveEnabled]);

  return (
    <div style={{ display: "flex", maxWidth: 500, gap: 10 }}>
      <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
        <InputLabel size="small">Time Window</InputLabel>
        <Select
          size={"small"}
          value={selectedOption}
          onChange={(e) => handleTimeChange(e.target.value)}
          label="Time Window"
        >
          <MenuItem value="1">1 minute ago</MenuItem>
          <MenuItem value="5">5 minutes ago</MenuItem>
          <MenuItem value="10">10 minutes ago</MenuItem>
          <MenuItem value="30">30 minutes ago</MenuItem>
          <MenuItem value="60">1 hour ago</MenuItem>
        </Select>
      </FormControl>
      <div>
        <StartStopButton setLiveEnabled={setLiveEnabled} liveEnabled={liveEnabled} />
      </div>
    </div>
  );
};

const StartStopButton = ({
  liveEnabled,
  setLiveEnabled,
}: {
  liveEnabled: boolean;
  setLiveEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleButtonClick = () => {
    setLiveEnabled((s) => !s);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 2.4, minWidth: 150 }}>
      <Button
        variant="contained"
        color={liveEnabled ? "secondary" : "primary"}
        onClick={handleButtonClick}
        startIcon={liveEnabled ? <StopIcon /> : <PlayArrowIcon />}
      >
        <Typography sx={{ fontSize: 10 }}>{liveEnabled ? "Stop live reload" : "Start live reload"}</Typography>
      </Button>
    </Box>
  );
};

export default TimeWindow;