/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import "./styles/CursorComponent.css";
export function CursorComponent({ letterIndex,wordIndex, wordRefs }) {
  // 1.075em
  /*
  El movimiento del cursor ( | barra vertical entre las letras)
  se calcula en base al ancho de la palabra actual activa
  utilizando getBoundingClientRect(), funcion js html que devuelve 
  el rectangulo de espacio que utiliza un elemento en el dom,
  este se divide por el numero de letras lo que da el ancho de cada letra.
  el cursor se renderiza como hijo del componente WordComponent.jsx
  por lo que no es necesario calcular la distancia entre palabras y los saltos de linea
  */

  const letterWidthPx  = useRef(0);
  useEffect(() => {
    if (wordRefs.current[wordIndex]) {
      // console.dir(wordRefs.current[wordIndex]);
      const totalLetters = wordRefs.current[wordIndex].childNodes.length - 1
      const rect = wordRefs.current[wordIndex].getBoundingClientRect();
      const wordWidth =  rect.width
      letterWidthPx.current = wordWidth / totalLetters;
      // console.log("🚀 ~ CursorComponent ~ wordWidth:", wordWidth)
      // console.log("🚀 ~ useEffect ~ letterWidthPx.current:", letterWidthPx.current)
    }
  }, [wordRefs, wordIndex]);

  return (
    <div
      style={{
        transform: `translateX(${letterWidthPx.current * letterIndex}px)`,
      }}
      className="cursor"
    ></div>
  );
}
