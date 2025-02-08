import { useEffect, useMemo, useRef, useState } from "react";
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

  const [wordsData, setWordsData] = useState([]);
  //estructura de datos
  /**
   * [
   * {id:number, o string de la palabra en lugar de nombre
   * word:string,
   * activeLetterIndex: null,
   * status:  active , '' , 'correct','missed, 'incorrect...
   * letters:[{char:'x', status:('pending','correct',incorrect,'missed'), typed:'c'}]
   * },
   * {...}
   * ]
   */

  const { wordsCount, lettersCount } = useMemo(() => {
    let wordsCount = { correct: 0, incorrect: 0, missed: 0 };
    let lettersCount = { correct: 0, incorrect: 0, missed: 0 };
    wordsData.slice(0, currentWordIndex).forEach((word) => {
      word.status === "correct" && wordsCount.correct++;
      word.status === "incorrect" && wordsCount.incorrect++;
      word.status === "missed" && wordsCount.missed++;
      word.letters.forEach((letter) => {
        letter.status === "correct" && lettersCount.correct++;
        letter.status === "incorrect" && lettersCount.incorrect++;
        letter.status === "missed" && lettersCount.missed++;
      });
    }); 
    return wordsCount, lettersCount;
  }, [wordsData]);

  const initializeWordsData = () => {
    const newWordsData = [];
    words.forEach((word) => {
      newWordsData.push({
        id: word,
        status: "",
        activeLetterIndex: null,
        letters: word
          .split("")
          .map((char) => ({ char: char, status: "pending", typed: "" })),
      });
    });
    newWordsData[0].status = "active";
    setWordsData(newWordsData);
  };

  //se ejecuta al iniciar o detener el juego
  useEffect(() => {
    //setWords(INITIAL_WORDS.sort(() => Math.random() - 0.5).slice(0, 50))
    setInitialClasses();
    initializeWordsData();
    addClassToWord(currentWordIndex, "active");
    //setRenderWords(getRenderWords2());
  }, []);

  //renderizar todas las palabras y letras de nuevo
  useEffect(() => {
    setRenderWords(getRenderWords2());
  }, [currentTyping, currentWordIndex]);

  useEffect(() => {
    removeClassToWord(previousCurrentWordIndex.current, "active");
    addClassToWord(currentWordIndex, "active");
    setRenderWords(getRenderWords2());
  }, [currentWordIndex, wordsData]);

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

  const getRenderWords2 = () => {
    const innerWords = wordsData.map((word, wordIndex) => {
      const innerLetters = word.letters;
      return (
        <div
          className={`word ${word.status ? word.status : ""}`}
          key={`${word.id}${wordIndex}`}
        >
          {innerLetters.map((letter, letterIndex) => {
            return (
              <span
                className={`letter ${letter.status ? letter.status : ""}`}
                key={`${word}${wordIndex}-${letter.char}${letterIndex}`}
              >
                {letter.char}
              </span>
            );
          })}
        </div>
      );
    });
    return innerWords;
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
      // removeClassToLetter(currentWordIndex, i, "letter-active");
    }
    //check y compare letters
    for (let i = 0; i < value.length; i++) {
      checkLetter(currentWordIndex, i, value[i]);
    }
    // if(currentTyping.length>0){
    //   console.log(currentTyping.length)
    //   addClassToLetter(currentWordIndex,currentTyping.length,'letter-active');
    // }
  };

  const handleOnChange2 = (event) => {
    const wordLegnth = wordsData[currentWordIndex].id.length;
    inputRef.current.maxLength = wordLegnth;
    const value = event.target.value;
    setCurrentTyping(value);

    setWordsData((prevData) => {
      return prevData.map((word, wordIndex) => {
        // Solo actualizamos la palabra cuyo índice coincida con activeWordIndex
        if (wordIndex !== currentWordIndex) return word;

        //word.status = "active";

        // Actualizamos las letras de la palabra activa
        const newLetters = word.letters.map((letter, letterIndex) => {
          const typedLetter = value[letterIndex] || "";
          // Se asigna el estado 'correct' o 'incorrect', o se mantiene 'pending'
          const newStatus = typedLetter
            ? typedLetter === letter.char
              ? "correct"
              : "incorrect"
            : "pending";
          return { ...letter, typed: typedLetter, status: newStatus };
        });
        // Calcula el índice de la letra activa. Si value.length es mayor que la longitud,
        // se selecciona el último índice.
        const activeLetterIndex =
          value.length < word.letters.length
            ? value.length
            : word.letters.length - 1;

        // Calculamos el nuevo status de la palabra:
        // - Si el usuario aún no terminó de escribir, el estado es "active".
        // - Si terminó (value.length === word.letters.length), y todas las letras son correctas, marcamos la palabra como "correct".
        // - Si terminó y alguna letra es incorrecta, puedes marcarla como "incorrect" (o dejarla "active", según tu lógica).
        let newWordStatus = "active";
        if (value.length >= word.letters.length) {
          const allCorrect = newLetters.every(
            (letter) => letter.status === "correct"
          );
          newWordStatus = allCorrect ? "correct" : "incorrect";
        }
        return {
          ...word,
          letters: newLetters,
          activeLetterIndex,
          status: newWordStatus,
        };
      });
    });
  };
  //--------------
  const handleOnKeyDown = (event) => {
    const { key } = event;

    if (key === " ") {
      event.preventDefault();
      //setwordData
      setWordsData((prevWordsData) =>
        prevWordsData.map((word, wIndex) => {
          // Actualizamos solo la palabra activa, usando el índice global activeWordIndex
          if (wIndex !== currentWordIndex) return word;

          // Si el valor tipeado es menor que la longitud de la palabra,
          // marcamos la palabra y las letras no ingresadas como "missed"
          if (currentTyping.length < word.letters.length) {
            const updatedLetters = word.letters.map((letter, lIndex) => {
              if (lIndex < currentTyping.length) {
                // La letra ya fue validada en tiempo real (puede ser correct o incorrect)
                return letter;
              } else {
                // Las letras restantes se marcan como "missed"
                return { ...letter, status: "missed" };
              }
            });
            return {
              ...word,
              status: "missed",
              activeLetterIndex: currentTyping.length, // o el índice de la última letra tipeada
              letters: updatedLetters,
            };
          }
          // Si el usuario completó la palabra, se manejará en otra lógica
          return word;
        })
      );
      //setwordData

      typedWords.current[currentWordIndex] = currentTyping;
      if (currentWordIndex < cantOfWords - 1) {
        setCurrentTyping("");
        setCurrentWordIndex((prev) => {
          previousCurrentWordIndex.current = prev;

          //UPDATEACTIVEWORDDATA(CURRENTINDEX, NEWINDEX)
          setWordsData((prevWordsData) => {
            const newWordsData = [...prevWordsData];
            newWordsData[prev + 1] = {
              ...newWordsData[prev + 1],
              status: "active",
            };
            return newWordsData;
          });

          return prev + 1;
        });
      } else {
        console.log("finalizar juego ");
      }
    }
    if (key === "Backspace") {
      if (currentTyping === "" && currentWordIndex > 0) {
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
          onChange={handleOnChange2}
          autoFocus
          ref={inputRef}
          type="text"
        />
        <button onClick={() => setPlaying(!playing)}>start</button>
        <div className="paragraph">{renderWords}</div>
      </main>
    </>
  );
}

export default App;
