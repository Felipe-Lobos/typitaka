/* eslint-disable react/prop-types */
import "./styles/CursorComponent.css";
export function CursorComponent({ letterIndex }) {
    console.log("🚀 ~ CursorComponent ~ letterIndex:", letterIndex)
    // 1.075em
  const leftCalc = letterIndex ? (0.54 * letterIndex) : 0;
  console.log("🚀 ~ CursorComponent ~ leftCalc:", leftCalc)

  return (
    <div
       style={{
        // calc(0.54em * 46)
         left: `${leftCalc}em`,
       }}
      className="cursor"
    ></div>
  );
}
