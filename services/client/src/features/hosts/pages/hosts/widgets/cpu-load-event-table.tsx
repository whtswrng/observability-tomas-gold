import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import HeavyLoadIcon from "@mui/icons-material/BrokenImage";
import RecoveredIcon from "@mui/icons-material/Favorite";
import { CpuLoadEvent } from "../../../queries/cpu-load-events";
import { CpuState } from "../details";

export const CpuLoadEventsTable: React.FC<{ data: Array<CpuLoadEvent> }> = ({ data }) => {
  const renderIcon = (type: string) => {
    switch (type) {
      case CpuState.HeavyLoad:
        return <HeavyLoadIcon sx={{ color: "#f85d5d" }} />;
      case CpuState.Recovered:
        return <RecoveredIcon sx={{ color: "#34d034" }} />;
      default:
        return null;
    }
  };

  const rows = data.map((event, index) => ({
    icon: renderIcon(event.type),
    type: event.type,
    started: new Date(event.startTimestamp).toLocaleString(), // Adjust format as needed
  }));

  if (rows.length === 0) return <Typography>No records</Typography>;

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 800, margin: "auto", marginTop: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Event</TableCell>
            <TableCell>Occured</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.icon}</TableCell>
              <TableCell>CPU_{row.type}</TableCell>
              <TableCell>{row.started}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
