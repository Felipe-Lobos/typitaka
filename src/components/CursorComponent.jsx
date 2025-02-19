/* eslint-disable react/prop-types */
import "./styles/CursorComponent.css";
export function CursorComponent({ letterIndex }) {
    // 1.075em
  const leftCalcEM = letterIndex ? (0.54 * letterIndex) : 0;
  const leftCalcRem = letterIndex ? (1.1* letterIndex) :0;
  const leftCalcPx = letterIndex ? (1.1 * letterIndex * 16) : 0;

  return (
    <div
       style={{
        // calc(0.54em * 46) `translateX(leftCalc)`
        transform: `translateX(${leftCalcPx}px)`
        //  left: `${leftCalc}em`,
       }}
      className="cursor"
    ></div>
  );
}
