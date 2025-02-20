/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import "./styles/CursorComponent.css";
export function CursorComponent({ letterIndex,wordIndex, wordRefs }) {
  // 1.075em
  const leftCalcEM = letterIndex ? 0.54 * letterIndex : 0;
  const leftCalcRem = letterIndex ? 1.1 * letterIndex : 0;
  const leftCalcPx = letterIndex ? 1.1 * letterIndex * 16 : 0;
  const letterWidthPx  = useRef(0);
  useEffect(() => {
    if (wordRefs.current[wordIndex]) {
      console.dir(wordRefs.current[wordIndex]);
      const totalLetters = wordRefs.current[wordIndex].childNodes.length - 1
      
      const rect = wordRefs.current[wordIndex].getBoundingClientRect();
      const wordWidth =  rect.width
      letterWidthPx.current = wordWidth / totalLetters;
      console.log("🚀 ~ useEffect ~ letterWidthPx.current:", letterWidthPx.current)

    }
  }, [wordRefs, wordIndex]);



  return (
    <div
      style={{
        // calc(0.54em * 46) `translateX(leftCalc)`
        transform: `translateX(${letterWidthPx.current * letterIndex}px)`,
        //  left: `${leftCalc}em`,
      }}
      className="cursor"
    ></div>
  );
}
