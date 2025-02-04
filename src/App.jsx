import { useEffect, useRef, useState } from "react";
import "./App.css";
import { words as INITIAL_WORDS } from "./data/words";
import { Timer } from "./components/Timer";

function App() {
  const inputRef = useRef();
  const [cantOfWords, setCantOfWords] = useState(50);
  const [words, setWords] = useState(
    INITIAL_WORDS.sort(() => Math.random() - 0.5).slice(0, cantOfWords)
  );
  const [playing, setPlaying] = useState(false);
  const typedWords = useRef([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const previousCurrentWordIndex = useRef(0);
  const [currentTyping, setCurrentTyping] = useState("");
  const [renderWords, setRenderWords] = useState(null);
  const lettersClassList = useRef([]);
  const wordsClassList = useRef([]);

  //se ejecuta al iniciar o detener el juego
  useEffect(() => {
    //setWords(INITIAL_WORDS.sort(() => Math.random() - 0.5).slice(0, 50))
    setInitialClasses();
    addClassToWord(currentWordIndex, "active");
    setRenderWords(getRenderWords());
  }, []);

  //renderizar todas las palabras y letras de nuevo

  useEffect(() => {
    setRenderWords(getRenderWords());
  }, [currentTyping, currentWordIndex]);

  useEffect(() => {
    removeClassToWord(previousCurrentWordIndex.current, "active");
    addClassToWord(currentWordIndex, "active");
    setRenderWords(getRenderWords());
  }, [currentWordIndex]);

  const addClassToLetter = (wordIndex, letterIndex, classToAdd) => {
    const currentClasses = lettersClassList.current[wordIndex][letterIndex];
    if (!currentClasses.includes(classToAdd)) {
      lettersClassList.current[wordIndex][letterIndex].push(classToAdd);
    }
  };
  const removeClassToLetter = (wordIndex, letterIndex, classToRemove) => {
    const currentClasses = lettersClassList.current[wordIndex][letterIndex];
    if (currentClasses.includes(classToRemove)) {
      lettersClassList.current[wordIndex][letterIndex] =
        lettersClassList.current[wordIndex][letterIndex].filter(
          (cls) => cls !== classToRemove
        );
    }
  };
  const addClassToWord = (wordIndex, classToAdd) => {
    const currentClasses = wordsClassList.current[wordIndex];
    if (!currentClasses.includes(classToAdd)) {
      wordsClassList.current[wordIndex].push(classToAdd);
    }
  };
  const removeClassToWord = (wordIndex, classToRemove) => {
    const currentClasses = wordsClassList.current[wordIndex];
    if (currentClasses.includes(classToRemove)) {
      wordsClassList.current[wordIndex] = wordsClassList.current[
        wordIndex
      ].filter((cls) => cls !== classToRemove);
    }
  };
  const checkLetter = (wordIndex, letterIndex, typedLetter) => {
    // removeClassToLetter(wordIndex,letterIndex,'incorrect');
    // removeClassToLetter(wordIndex,letterIndex,'correct');
    if (typedLetter === words[wordIndex][letterIndex]) {
      addClassToLetter(wordIndex, letterIndex, "correct");
    } else {
      addClassToLetter(wordIndex, letterIndex, "incorrect");
    }
  };

  const setInitialClasses = () => {
    lettersClassList.current = [];
    const wordClasses = Array.from({ length: words.length }, () => ["word"]);
    wordsClassList.current = wordClasses;
    words.map((word) => {
      const letterClasses = Array.from({ length: word.length }, () => [
        "letter",
      ]);
      lettersClassList.current.push(letterClasses);
    });
  };

  const getRenderWords = () => {
    const innerWords = words.map((word, wordIndex) => {
      const innerLetters = word.split("");
      return (
        <div
          className={
            (wordsClassList.current[wordIndex] &&
              wordsClassList.current[wordIndex].join(" ")) ||
            "word"
          }
          key={`${word}${wordIndex}`}
        >
          {innerLetters.map((letter, letterIndex) => {
            return (
              <span
                className={
                  (lettersClassList.current[wordIndex] &&
                    lettersClassList.current[wordIndex][letterIndex] &&
                    lettersClassList.current[wordIndex][letterIndex].join(
                      " "
                    )) ||
                  "letter"
                }
                key={`${word}${wordIndex}-${letter}${letterIndex}`}
              >
                {letter}
              </span>
            );
          })}
        </div>
      );
    });

    return innerWords;
  };

  const handleOnChange = (event) => {
    const wordLegnth = words[currentWordIndex].length;
    inputRef.current.maxLength = wordLegnth;
    const value = event.target.value;
    setCurrentTyping(value);

    //clean letters classes
    for (let i = 0; i < wordLegnth; i++) {
      removeClassToLetter(currentWordIndex, i, "incorrect");
      removeClassToLetter(currentWordIndex, i, "correct");
    }

    //check y compare letters
    for (let i = 0; i < value.length; i++) {
      checkLetter(currentWordIndex, i, value[i]);
    }
  };
  const handleOnKeyDown = (event) => {
    const { key } = event;

    if (key === " ") {
      event.preventDefault();
      typedWords.current[currentWordIndex] = currentTyping;
      if (currentWordIndex < cantOfWords - 1) {
        setCurrentTyping("");
        setCurrentWordIndex((prev) => {
          previousCurrentWordIndex.current = prev;
          return prev + 1;
        });
      }else{
        console.log('finalizar juego ')
      }
    }
    if (key === "Backspace") {
      if (currentTyping === "" && currentWordIndex > 0) {
        console.log("volver a la palabra anterior");
        setCurrentWordIndex((prev) => {
          previousCurrentWordIndex.current = prev;
          setCurrentTyping(typedWords.current[prev - 1]);
          return prev - 1;
        });
      }
    }
  };
  return (
    <>
      <main>
        <h1>Monkeytype -V2</h1>
        <Timer initialTime={10}></Timer>
        <input
          value={currentTyping}
          onKeyDown={handleOnKeyDown}
          onChange={handleOnChange}
          autoFocus
          ref={inputRef}
          // onKeyDown={onKeyDown}
          // onKeyUp={onKeyUp}
          type="text"
        />
        <button onClick={() => setPlaying(!playing)}>start</button>
        <div className="paragraph">{renderWords}</div>
      </main>
    </>
  );
}

export default App;
