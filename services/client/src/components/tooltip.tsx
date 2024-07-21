import React from "react";
import { IconButton, Box } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from '@mui/material/Tooltip';


interface IconWithTooltipProps {
  description: string;
}

export const IconWithTooltip: React.FC<IconWithTooltipProps> = ({ description }) => {
  return (
    <Tooltip title={description}>
      <IconButton>
        <InfoIcon />
      </IconButton>
    </Tooltip>
  );
};
