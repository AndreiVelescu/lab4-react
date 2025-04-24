import { useEffect, useState } from "react";

const useTimer = (initialTime, onExpire, resetKey) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    setTime(initialTime);
  }, [resetKey, initialTime]);

  useEffect(() => {
    if (initialTime <= 0) return;

    if (time <= 0) {
      onExpire();
      return;
    }

    const interval = setInterval(
      () => setTime((prevTime) => prevTime - 1),
      1000
    );
    return () => clearInterval(interval);
  }, [time, initialTime, onExpire]);

  return initialTime <= 0 ? "infinit" : time;
};

export default useTimer;
