import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
//import { words as INITIAL_WORDS } from "./data/words";
// import { palabrasBasicasRomajiSinSimbolos as INITIAL_WORDS } from "./data/wordsRomaji";
import { palabrasBasicasEspanolSinSimbolos as INITIAL_WORDS } from "./data/wordsSpanish";
import { Timer } from "./components/Timer";
import { WordsLetterRenderer } from "./components/WordsLetterRenderer";
import { BlurOverlay } from "./components/BlurOverlay";
import { ScoreComponent } from "./components/ScoreComponent";

function App() {
  const [totalTime, setTotalTime] = useState(15);
  const inputRef = useRef();
  const [cantOfWords, setCantOfWords] = useState(50);
  const [wordsList, setWordsList] = useState(
    INITIAL_WORDS.sort(() => Math.random() - 0.5).slice(0, cantOfWords)
  );
  // const [gameOver, setGameOver] = useState(false);
  const [remainingTime, setRemainingTime] = useState(15);
  const typedWords = useRef([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const previousCurrentWordIndex = useRef(0);
  const [currentTyping, setCurrentTyping] = useState("");
  const [wordsData, setWordsData] = useState([]);
  const [inputOnBlur, setIntputOnBlur] = useState(false);
  const [gameState, setGameState] = useState("not_started"); //'playing','paused','gameover'

  const [timerKeyProp, setTimerKeyProp] = useState(0);
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

  //ESTO PUEDE SER UN REACT CUSTOM HOOK
  const { wordsCount, lettersCount } = useMemo(() => {
    let wordsCount = { correct: 0, incorrect: 0, missed: 0, total: 0 };
    let lettersCount = { correct: 0, incorrect: 0, missed: 0, total: 0 };
    wordsData.slice(0, currentWordIndex + 1).forEach((word) => {
      word.status === "correct" && wordsCount.correct++;
      word.status === "incorrect" && wordsCount.incorrect++;
      word.status === "missed" && wordsCount.missed++;
      //wordsCount.total++;
      word.letters.forEach((letter) => {
        letter.status === "correct" && lettersCount.correct++;
        letter.status === "incorrect" && lettersCount.incorrect++;
        letter.status === "missed" && lettersCount.missed++;
        letter.typed && lettersCount.total++;
      });
      //console.log('word.letters',word.letters)
    });
    return { wordsCount: wordsCount, lettersCount: lettersCount };
  }, [wordsData, currentWordIndex]);

  const initializeWordsData = (currentWords) => {
    const newWordsData = [];
    currentWords.forEach((word) => {
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
  const getNewWordsList = () => {
    return INITIAL_WORDS.sort(() => Math.random() - 0.5).slice(0, cantOfWords);
  };

  //se ejecuta al iniciar o detener el juego
  useEffect(() => {
    //setWords(INITIAL_WORDS.sort(() => Math.random() - 0.5).slice(0, 50))
    initializeWordsData(wordsList);
  }, []);

  useEffect(() => {
    resetGame();
  }, [totalTime, cantOfWords]);
  //renderizar todas las palabras y letras de nuevo

  const startGame = () => {
    setGameState("playing");
  };
  const resetGame = () => {
    console.log("reset");
    setGameState("not_started");
    setTimerKeyProp((prevKey) => prevKey + 1);
    const newWords = getNewWordsList();
    setWordsList(newWords);
    initializeWordsData(newWords);
    inputRef.current.focus();
    setCurrentTyping("");
    setCurrentWordIndex(0);
  };

  const handleOnChange = (event) => {
    if (gameState === "gameover") return;
    const wordLegnth = wordsData[currentWordIndex].id.length;
    inputRef.current.maxLength = wordLegnth;
    const value = event.target.value.toLowerCase();
    setCurrentTyping(value);

    if (gameState === "not_started") startGame();

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
          value.length <= word.letters.length
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
    if (gameState === "gameover" || gameState === "not_started") return;
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
        setCurrentWordIndex((prevWordIndex) => {
          previousCurrentWordIndex.current = prevWordIndex;

          //UPDATEACTIVEWORDDATA(CURRENTINDEX, NEWINDEX)
          setWordsData((prevWordsData) => {
            const newWordsData = [...prevWordsData];
            newWordsData[prevWordIndex + 1] = {
              ...newWordsData[prevWordIndex + 1],
              status: "active",
            };
            return newWordsData;
          });

          return prevWordIndex + 1;
        });
      } else {
        setGameState("gameover");
        console.log("finalizar juego ");
      }
    }
    if (key === "Backspace") {
      if (currentTyping === "" && currentWordIndex > 0) {
        setCurrentWordIndex((prevWordIndex) => {
          previousCurrentWordIndex.current = prevWordIndex;
          setCurrentTyping(typedWords.current[prevWordIndex - 1]);

          //UPDATEACTIVEWORDDATA(CURRENTINDEX, NEWINDEX)
          setWordsData((prevWordsData) => {
            const newWordsData = [...prevWordsData];
            newWordsData[prevWordIndex] = {
              ...newWordsData[prevWordIndex],
              status: "",
            };
            newWordsData[prevWordIndex - 1] = {
              ...newWordsData[prevWordIndex - 1],
              status: "active",
            };

            return newWordsData;
          });

          return prevWordIndex - 1;
        });
      }
    }
  };

  const getAccuracy = (totalLettersTyped, correctLettersCount) => {
    if (!totalLettersTyped || !correctLettersCount) return 0;
    const accuracy = ((correctLettersCount / totalLettersTyped) * 100).toFixed(
      0
    );
    return accuracy;
  };

  const handleOnTick = useCallback((timeLeft) => {
    console.log("🚀 ~ handleOnTick ~ timeLeft:", timeLeft);
    setRemainingTime(timeLeft);
  }, []);
  const handleOnTimeEnd = useCallback(() => {
    console.log("GameOver");
    setGameState("gameover");
  }, []);

  const handleOnBlur = () => {
    setIntputOnBlur(true);
  };
  const handleOnFocus = () => {
    setIntputOnBlur(false);
  };
  const handleLostFocusOnCLick = () => {
    inputRef.current.focus();
  };
  const handleResetButton = (event) => {
    event.preventDefault();
    resetGame();
  };
  const handleSetTimeButton = (event, time) => {
    event.preventDefault();
    setTotalTime(time);
  };
  const handleSetCantWordsButton = (event, cant) => {
    event.preventDefault();
    setCantOfWords(cant);
  };
  return (
    <>
      <Header />
      <main>
        <div className="timer-wrap">
          <span>Tiempo restante:</span>
          <Timer
            key={timerKeyProp}
            totalTime={totalTime}
            onTick={handleOnTick}
            gameOver={gameState === "gameover"}
            playing={gameState === "playing"}
            onTimeEnd={handleOnTimeEnd}
          />
        </div>

        <input
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          className="word-input"
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          value={currentTyping}
          onKeyDown={handleOnKeyDown}
          onChange={handleOnChange}
          autoFocus
          ref={inputRef}
          type="text"
        />
        <div className="button-wraper">
          <button onMouseDown={(e) => handleResetButton(e)}>reset Game</button>
          <div className="time-buttons">
            <button onMouseDown={(e) => handleSetTimeButton(e, 15)}>15</button>
            <button onMouseDown={(e) => handleSetTimeButton(e, 30)}>30</button>
            <button onMouseDown={(e) => handleSetTimeButton(e, 45)}>45</button>
          </div>
          <div className="word-buttons">
            <button onMouseDown={(e) => handleSetCantWordsButton(e, 10)}>
              10
            </button>
            <button onMouseDown={(e) => handleSetCantWordsButton(e, 25)}>
              25
            </button>
            <button onMouseDown={(e) => handleSetCantWordsButton(e, 50)}>
              50
            </button>
          </div>
        </div>

        <div
          onMouseDown={(e) => e.preventDefault()}
          className="words-container"
        >
          {inputOnBlur && <BlurOverlay onClick={handleLostFocusOnCLick} />}

          <WordsLetterRenderer
            currentWordIndex={currentWordIndex}
            wordsData={wordsData}
            inputOnBlur={inputOnBlur}
          />
        </div>
        <div className="score-container">
          {gameState === "gameover" && (
            <ScoreComponent
              wordsCount={wordsCount}
              lettersCount={lettersCount}
              timeLeft={remainingTime}
              totalTime={totalTime}
            />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
