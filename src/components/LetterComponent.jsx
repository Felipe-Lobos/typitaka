/* eslint-disable react/prop-types */
export function LetterComponent({letterChar,letterStatus}){
    return (
        <span
          className={`letter ${letterStatus || ""}`}
        >
          {letterChar}
        </span>
      );
}