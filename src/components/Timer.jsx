import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
export function Timer({ initialTime }) {
  const [time, setTime] = useState(initialTime);
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(interval);
          return 0;
        } else {
          return prevTime - 1;
        }
      }); // ✅ Usa siempre el valor más reciente
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return <span>{time}</span>;
}
