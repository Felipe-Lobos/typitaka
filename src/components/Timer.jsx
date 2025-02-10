import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
export function Timer({ totalTime = 60, onTimeEnd, onTick, gameOver,playing }) {
  //onTick: pfunciona Callback para manejar los tick en el componente padre
  //gameOver: boolean
  //onTimeEnd, funcion callback para manejar cuando se acaba el tiempo
  //totalTime: es el timpo inicial del timeer

  const [timeLeft, SetTimeLeft] = useState(totalTime);
  useEffect(() => {
    if (gameOver) return;
    if(!playing)return;
    const intervalId = setInterval(() => {
      SetTimeLeft((prevTime) => {
        const newTime = prevTime - 1;
        return newTime;
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, [ gameOver,playing]);

  useEffect(()=>{
    if (onTick) onTick(timeLeft);
    if(timeLeft <=0 && onTimeEnd){
      onTimeEnd();
    }
  },[timeLeft, onTimeEnd, onTick])

  return <span>{timeLeft}</span>;
}
