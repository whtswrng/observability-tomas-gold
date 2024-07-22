import NotificationsIcon from "@mui/icons-material/Notifications";
import { Badge, Box, IconButton, Popover } from "@mui/material";
import isEqual from "lodash/isEqual";
import { useEffect, useRef, useState } from "react";
import { useGetAlerts } from "../../queries/alerts";
import { Alerts } from "./alerts";

const FETCH_ALERTS_INTERVAL_IN_MS = 5000;

export const AlertBudge = () => {
  const [open, setOpen] = useState(false);
  const anchorEl = useRef<HTMLButtonElement>(null);
  const previousAlerts = useRef<Array<unknown>>([]);
  const { data, refetch } = useGetAlerts();
  // TODO This flag should be stored on the BE
  const [hasNewAlerts, setHasNewAlerts] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, FETCH_ALERTS_INTERVAL_IN_MS);

    return () => {
      clearInterval(interval);
    };
  }, [refetch]);

  useEffect(() => {
    const currentAlerts = data?.notifications ?? [];
    if (!isEqual(previousAlerts.current, currentAlerts)) {
      setHasNewAlerts(true);
    }
    previousAlerts.current = currentAlerts;
  }, [data]);

  const openAlerts = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setHasNewAlerts(false);
  };

  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <IconButton color="inherit" onClick={openAlerts} ref={anchorEl}>
        <Badge ref={anchorEl} badgeContent={hasNewAlerts ? "!": undefined} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Popover
        id={id}
        open={hasNewAlerts || open}
        anchorEl={anchorEl?.current}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box>
          <Alerts data={data} />
        </Box>
      </Popover>
    </div>
  );
};
