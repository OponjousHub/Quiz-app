import { useEffect, useState } from "react";
import classes from "./quiz.module.css";

function Timer({ timeout, onTimeout }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    const timer = setTimeout(onTimeout, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [onTimeout, timeout]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevRemaining) => prevRemaining - 100);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <progress
      className={`${classes.progress}`}
      max={timeout}
      value={remainingTime}
    />
  );
}

export default Timer;
