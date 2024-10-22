import { LinearProgress, linearProgressClasses, styled } from "@mui/material";
import React, { useEffect } from "react";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  marginTop: 10,
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
    ...theme.applyStyles('dark', {
      backgroundColor: '#308fe8',
    }),
  },
}));

function TimerBar({expiryTime, handleTimeOut}:{expiryTime?:Date, handleTimeOut:()=>void}) {

  const [progress, setProgress] = React.useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      if(!expiryTime) return;
      const expiry = new Date(expiryTime);
      const now = new Date();
      const timeDiff = expiry.getTime() - now.getTime();
      const progress = (timeDiff / 30000) * 100;
      setProgress(progress);
      // if the time has expired, clear the interval
      if(progress <= 0) {
        handleTimeOut();
        clearInterval(interval);
      }
    }, 250);

    return () => {
      clearInterval(interval);
    }
  }, [expiryTime])

  return (
    <BorderLinearProgress variant="determinate" value={progress} />
  );



}

export default TimerBar;