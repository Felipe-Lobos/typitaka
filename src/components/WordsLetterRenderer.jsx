/* eslint-disable react/prop-types */
import { WordComponent } from "./WordComponent";
import { LetterComponent } from "./LetterComponent";
import { CursorComponent } from "./CursorComponent";
export function WordsLetterRenderer({ wordsData, inputOnBlur, currentWordIndex }) {
  const innerWords = wordsData.map((word, wordIndex) => {
    const innerLetters = word.letters;
    return (
      <WordComponent key={`${word.id}${wordIndex}`} wordStatus={word.status}>
        {wordIndex===currentWordIndex ? <CursorComponent letterIndex={word.activeLetterIndex} /> : ''}
        {innerLetters.map((letter, letterIndex) => {
          return (
            <LetterComponent
              letterChar={letter.char}
              letterStatus={letter.status}
              key={`${word.id}${wordIndex}-${letter.char}${letterIndex}`}
            />
          );
        })}
      </WordComponent>
    );
  });

  return <div className={`paragraph ${inputOnBlur ? 'blurry-paragraph' : ''} `}>{innerWords}</div>;
}

// return (
//   <div
//     className={`word ${word.status ? word.status : ""}`}
//     key={`${word.id}${wordIndex}`}
//   >
//     {innerLetters.map((letter, letterIndex) => {
//       return (
//         <span
//           className={`letter ${letter.status ? letter.status : ""}`}
//           key={`${word.id}${wordIndex}-${letter.char}${letterIndex}`}
//         >
//           {letter.char}
//         </span>
//       );
//     })}
//   </div>
// );
