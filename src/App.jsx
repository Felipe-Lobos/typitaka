import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
//import { words as INITIAL_WORDS } from "./data/words";
import { Timer } from "./components/Timer";
import { WordsLetterRenderer } from "./components/WordsLetterRenderer";
import { BlurOverlay } from "./components/BlurOverlay";
import { ScoreComponent } from "./components/ScoreComponent";
import { RiResetLeftLine } from "react-icons/ri";
import { PiTimerLight } from "react-icons/pi";
import { RxTextNone } from "react-icons/rx";

import { GameModesOptions } from "./components/GameModesOptions";
import { WordsTypeSelector } from "./components/WordsTypeSelector";
import { GameOptionsComponent } from "./components/GameOptionsComponent";

function App() {
  const INITIAL_WORDS = ["Something", "wrong", "press", "reset", "..."];
  const DEFAULT_GAMEOPTIONS = {
    mode: "words",
    words: 10,
    time: 15,
    theme: "",
    wordsType: "words", //words,wordsHard,wordsSpanish,wordsRomaji
  };
  const [gameOptions, setGameOptions] = useState(DEFAULT_GAMEOPTIONS);
  const inputRef = useRef();
  const [importedWords, setImportedWords] = useState([]);
  const [wordsList, setWordsList] = useState([]);
  const [remainingTime, setRemainingTime] = useState(gameOptions.time);
  const typedWords = useRef([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const previousCurrentWordIndex = useRef(0);
  const [currentTyping, setCurrentTyping] = useState("");
  const [wordsData, setWordsData] = useState([]);
  const [inputOnBlur, setIntputOnBlur] = useState(false);
  const [gameState, setGameState] = useState("not_started"); //'playing','paused','gameover'
  // const initialGameOptionsLoaded = useRef(false);
  const previousGameOptions = useRef(gameOptions);
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

  const loadWordsType = async (wordsTypeName) => {
    try {
      const module = await import(`./wordsTypes/${wordsTypeName}.js`);
      return module.default;
    } catch (error) {
      console.error("Error al cargar modulo : ", wordsTypeName, error);
      return [];
    }
  };

  const intializeGame = () => {
    const storedGameOptionsString = localStorage.getItem("gameOptions");
    const localGameOptions = storedGameOptionsString
      ? JSON.parse(storedGameOptionsString) ?? DEFAULT_GAMEOPTIONS // Usa ?? para valor por defecto si JSON.parse retorna null
      : DEFAULT_GAMEOPTIONS;

    if (localGameOptions !== gameOptions) {
      console.log("update game options");
      setGameOptions((prev) => {
        previousGameOptions.current = prev;
        return {
          mode: localGameOptions.mode,
          words: localGameOptions.words,
          time: localGameOptions.time,
          theme: localGameOptions.theme,
          wordsType: localGameOptions.wordsType,
        };
      });
    } else {
      console.log("opciones cargadas son iguales a las opciones en sistema");
    }
    loadWordsType(localGameOptions.wordsType)
      .then((newImportedWords) => {
        setImportedWords(() => {
          return newImportedWords;
        });
      })
      .catch((error) => {
        console.error("Error al cargar la lista:", error);
      });
  };

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
    if (importedWords.length === 0) return INITIAL_WORDS;
    const wordsToUse = [...importedWords];
    const numOfWords =
      wordsToUse.length < gameOptions.words
        ? wordsToUse.length - 1
        : gameOptions.words;
    // setGameOptions(prev=>({...prev,words:numOfWords}))
    return wordsToUse.sort(() => Math.random() - 0.5).slice(0, numOfWords);
  };

  //se ejecuta al iniciar o detener el juego
  useEffect(() => {
    intializeGame();
  }, []);

  useEffect(() => {
    if (wordsList.length === 0) return;
    initializeWordsData(wordsList);
    console.log("🚀 ~ useEffect ~ wordsList:", wordsList);
  }, [wordsList]);

  useEffect(() => {
    console.log("change words type", gameOptions.wordsType);
    loadWordsType(gameOptions.wordsType)
      .then((newImportedWords) => {
        if (newImportedWords !== importedWords)
          setImportedWords(newImportedWords);
      })
      .catch((error) => {
        console.error("Error al cargar la lista:", error);
      });
  }, [gameOptions.wordsType]);

  useEffect(() => {
    // Solo ejecutar si gameOptions ya se cargó
    if (gameOptions === DEFAULT_GAMEOPTIONS) return;
    if (gameOptions.wordsType !== previousGameOptions.current.wordsType) return;
    console.log("imported words on useEffect gameOptions", importedWords[0]);
    resetGame();
    localStorage.setItem("gameOptions", JSON.stringify(gameOptions));
    console.log("Game reset with new options:", gameOptions);
    // localStorage.removeItem('gameOptions');
  }, [gameOptions]);
  //renderizar todas las palabras y letras de nuevo

  //reaload WordsList
  useEffect(() => {
    console.log(
      "importedWords changed, getting new WordList: ",
      importedWords[0]
    );
    if (importedWords.length === 0) return;
    const newWords = getNewWordsList();
    setWordsList(newWords);
  }, [importedWords]);

  const startGame = () => {
    setGameState("playing");
  };
  //RESETGAME DEBE SER UN CUSTOMHOOK PARA QUE NO HAYA PROBLEMAS CON LOS RENDEREIZADOS
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
        if (newWordStatus === "correct" && wordIndex === wordsData.length - 1) {
          setGameState("gameover");
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

    // if (key === " ") {
    //   event.preventDefault();
    //   //setwordData
    //   setWordsData((prevWordsData) =>
    //     prevWordsData.map((word, wIndex) => {
    //       // Actualizamos solo la palabra activa, usando el índice global activeWordIndex
    //       if (wIndex !== currentWordIndex) return word;
    //       // Si el valor tipeado es menor que la longitud de la palabra,
    //       // marcamos la palabra y las letras no ingresadas como "missed"
    //       if (currentTyping.length < word.letters.length) {
    //         const updatedLetters = word.letters.map((letter, lIndex) => {
    //           if (lIndex < currentTyping.length) {
    //             // La letra ya fue validada en tiempo real (puede ser correct o incorrect)
    //             return letter;
    //           } else {
    //             // Las letras restantes se marcan como "missed"
    //             return { ...letter, status: "missed" };
    //           }
    //         });
    //         return {
    //           ...word,
    //           status: "missed",
    //           activeLetterIndex: currentTyping.length, // o el índice de la última letra tipeada
    //           letters: updatedLetters,
    //         };
    //       }
    //       // Si el usuario completó la palabra, se manejará en otra lógica
    //       return word;
    //     })
    //   );
    //   //setwordData

    //   typedWords.current[currentWordIndex] = currentTyping;

    //   if (currentWordIndex < wordsData.length - 1) {
    //     setCurrentTyping("");
    //     setCurrentWordIndex((prevWordIndex) => {
    //       previousCurrentWordIndex.current = prevWordIndex;

    //       //UPDATEACTIVEWORDDATA(CURRENTINDEX, NEWINDEX)
    //       setWordsData((prevWordsData) => {
    //         const newWordsData = [...prevWordsData];
    //         newWordsData[prevWordIndex + 1] = {
    //           ...newWordsData[prevWordIndex + 1],
    //           status: "active",
    //         };
    //         return newWordsData;
    //       });

    //       return prevWordIndex + 1;
    //     });
    //   } else {
    //     setGameState("gameover");
    //     console.log("finalizar juego ");
    //   }
    // }
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

  const handleOnTick = useCallback((timeLeft) => {
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

  const handleUpdateGameOptions = (event, payload) => {
    event.preventDefault();
    //SEPARAR ESTO EN UNA FUNCION APARTE UPDATEGAMEOPTIONS() PARA REUTILIZARLA
    const { prop, value } = payload;
    setGameOptions((prev) => {
      previousGameOptions.current = prev;
      const newGameOptions = { ...prev };
      newGameOptions[prop] = value;
      if (prop === "mode" && value === "time") {
        newGameOptions.words = 1000;
        newGameOptions.time = 15;
      }
      if (prop === "mode" && value === "words") {
        newGameOptions.time = 1000;
        newGameOptions.words = 10;
      }
      return newGameOptions;
    });
  };

  const updateImportedWords = (newWordsType) => {
    setGameOptions((prev) => {
      previousGameOptions.current = prev;
      return { ...prev, wordsType: newWordsType };
    });
  };

  const handleBeforeInput = (event)=>{
    
    if (gameState === "gameover" || gameState === "not_started") return;
    const { data } = event;
    console.log("🚀 ~ handleBeforeInput ~ data:", data)
    
    if (data === " ") {
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

      if (currentWordIndex < wordsData.length - 1) {
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
  }

  return (
    <>
      <Header />
      <section className="option-section">
        <GameOptionsComponent
          selectedOptions={gameOptions}
          updateGameOption={handleUpdateGameOptions}
        />
      </section>
      <main>
        <input
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          className="word-input"
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          value={currentTyping}
          onBeforeInput={handleBeforeInput}
          onKeyDown={handleOnKeyDown}
          onChange={handleOnChange}
          autoFocus
          ref={inputRef}
          type="text"
        />
        {/* <GameModesOptions
          gameMode={gameOptions.mode}
          updateGameOption={handleUpdateGameOptions}
        /> */}

        <div
          onMouseDown={(e) => e.preventDefault()}
          className="words-container"
        >
          {/* <WordsTypeSelector updateImportedWords={updateImportedWords} /> */}

          {gameState !== "gameover" && (
            <div className="option-display">
              <div
                className={`timer-option-display ${
                  gameOptions.mode !== "time" ? "option-hidden" : ""
                }`}
              >
                <PiTimerLight />
                <Timer
                  key={timerKeyProp}
                  totalTime={gameOptions.time}
                  onTick={handleOnTick}
                  gameOver={gameState === "gameover"}
                  playing={gameState === "playing"}
                  onTimeEnd={handleOnTimeEnd}
                />
                <span>s</span>
              </div>

              <div
                className={`word-option-display ${
                  gameOptions.mode !== "words" ? "option-hidden" : ""
                }`}
              >
                <RxTextNone />
                <span>{wordsData.length - currentWordIndex}</span>
              </div>
            </div>
          )}

          {gameState !== "gameover" && (
            <>
              {inputOnBlur && <BlurOverlay onClick={handleLostFocusOnCLick} />}
              <WordsLetterRenderer
                currentWordIndex={currentWordIndex}
                wordsData={wordsData}
                inputOnBlur={inputOnBlur}
              />
            </>
          )}

          <button
            className="reset-button"
            onMouseDown={(e) => handleResetButton(e)}
          >
            <RiResetLeftLine />
          </button>
        </div>
        <div className="score-container">
          {gameState === "gameover" && (
            <ScoreComponent
              wordsCount={wordsCount}
              lettersCount={lettersCount}
              timeLeft={remainingTime}
              totalTime={gameOptions.time}
            />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
