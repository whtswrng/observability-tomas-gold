import InfoIcon from "@mui/icons-material/Info";
import { IconButton } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import React from "react";


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
