import { LinearProgress, linearProgressClasses, styled } from "@mui/material";
import React, { useEffect } from "react";

const BorderLinearProgress = styled(LinearProgress)((props) => {
  console.log(props);

  const theme = props.theme;
  const progress = props.value ?? 100

  let barColor = '#5ce37a'; // green

  if(progress < 50) {
    barColor = '#f3a738'; // orange
  }

  if(progress < 25) {
    barColor = '#d84b3b'; // red
  }

  return{
  marginTop: 10,
  height: 10,
  borderRadius: 5,
  animation: progress < 10 ? 'shake 0.2s infinite' : undefined,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: `hsla(271, 98%, 80%, 0.2)`,
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: barColor,
    ...theme.applyStyles('dark', {
      backgroundColor: barColor,
    }),
  },
}});

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