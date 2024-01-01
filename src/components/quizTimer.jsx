import { useEffect, useState } from "react";

function Timer({ timeout, onTimeout }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    setTimeout(onTimeout, timeout);
  }, [onTimeout, timeout]);

  useEffect(() => {
    setInterval(() => {
      setRemainingTime((prevRemaining) => prevRemaining - 100);
    }, 100);
  }, []);

  return <progress max={timeout} value={remainingTime} />;
}

export default Timer;
