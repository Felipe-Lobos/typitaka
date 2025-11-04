/* eslint-disable react/prop-types */
import { WordComponent } from "./WordComponent";
import { LetterComponent } from "./LetterComponent";
import { CursorComponent } from "./CursorComponent";
import { useEffect, useRef, useState } from "react";
export function WordsLetterRenderer({
  wordsData,
  inputOnBlur,
  currentWordIndex,
}) {
  // Un ref para el contenedor de las letras
  const paragraphRef = useRef(null);
  // Estado para almacenar el índice de la línea activa
  const [activeLine, setActiveLine] = useState(0);
  //TODO: Hacer que el lineHeigth se calcule en base al alto de las letras que tiene el navegador
  const lineHeight = 48;
  const wordRefs = useRef([]);

  //Funcion para mover el parrafo hacia arriba (Simulando el scroll de un texto)
  useEffect(() => {
    // Solo procedemos si tenemos el contenedor y hay hijos
    if (paragraphRef.current && paragraphRef.current.children.length > 0) {
      // Accedemos a la letra activa usando el índice
      const activeWordEL = paragraphRef.current.children[currentWordIndex];
      if (activeWordEL) {
        // Suponiendo que todas las líneas tienen la misma altura,
        // calculamos la línea dividiendo el offsetTop de la letra activa por la altura de línea.
        const offsetTop = activeWordEL.offsetTop;
        const lineIndex = Math.ceil(offsetTop / lineHeight);
        setActiveLine(lineIndex - 1);
      }
    }
  }, [currentWordIndex, lineHeight]);

  return (
    <div className={`paragraph ${inputOnBlur ? "blurry-paragraph" : ""} `}>
      <div
        ref={paragraphRef}
        style={{
          transform: `translateY(-${activeLine * lineHeight}px)`,
          transition: "transform 0.3s ease-out",
        }}
        className="words-wrapper"
      >
        {wordsData.map((word, wordIndex) => {
          
          const innerLetters = word.letters;
          return (
            <WordComponent
              ref={(el) => (wordRefs.current[wordIndex] = el)}
              key={`${word.id}${wordIndex}`}
              wordStatus={word.status}
            >
              {wordIndex === currentWordIndex ? (
                <CursorComponent 
                wordRefs={wordRefs}
                wordIndex={wordIndex}
                letterIndex={word.activeLetterIndex} />
              ) : (
                ""
              )}
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
        })}
      </div>
    </div>
  );
}
