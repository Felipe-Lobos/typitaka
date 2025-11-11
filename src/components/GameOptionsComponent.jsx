/* eslint-disable react/prop-types */
import "./styles/GameOptionsComponent.css";
import { wordsTypes } from "../wordsTypes/wordsTypes";
export function GameOptionsComponent({ selectedOptions, updateGameOption }) {
  return (
    <div className="game-options-container">
      
      <div className="wordsType-container">
        <span>words list</span>
        {wordsTypes.map((wordType) => {
          return (
            <button
              key={wordType.id}
              className={`option-button ${
                selectedOptions.wordsType === wordType.id && "selected-option"
              }`}
              onMouseDown={(e) =>
                updateGameOption(e, { prop: "wordsType", value: wordType.id })
              }
            >
              {wordType.name}
            </button>
          );
        })}
       
      </div>
      <div className="gameMode-container">
        <div className="mode-selector">
          <span>mode</span>
          <button
            onMouseDown={(e) =>
              updateGameOption(e, { prop: "mode", value: "words" })
            }
            className={`option-button ${
                selectedOptions.mode === 'words' && "selected-option"
              }`}
          >
            Words
          </button>
          <button
            onMouseDown={(e) =>
              updateGameOption(e, { prop: "mode", value: "time" })
            }
            className={`option-button ${
                selectedOptions.mode === 'time' && "selected-option"
              }`}
          >
            Time
          </button>
        </div>
        {selectedOptions.mode === "time" && (
          <div className="gamemode-suboptions">
            <span>Time</span>
            <button
              onMouseDown={(e) =>
                updateGameOption(e, { prop: "time", value: 15 })
              }
              className={`option-button ${
                selectedOptions.time === 15 && "selected-option"
              }`}
            >
              15
            </button>
            <button
              onMouseDown={(e) =>
                updateGameOption(e, { prop: "time", value: 30 })
              }
              className={`option-button ${
                selectedOptions.time === 30 && "selected-option"
              }`}
            >
              30
            </button>
            <button
              onMouseDown={(e) =>
                updateGameOption(e, { prop: "time", value: 60 })
              }
              className={`option-button ${
                selectedOptions.time === 60 && "selected-option"
              }`}
            >
              60
            </button>
          </div>
        )}

        {selectedOptions.mode === "words" && (
          <div className="gamemode-suboptions">
            <span>№ Words</span>
            <button
              onMouseDown={(e) =>
                updateGameOption(e, { prop: "words", value: 10 })
              }
              className={`option-button ${
                selectedOptions.words === 10 && "selected-option"
              }`}
            >
              10
            </button>
            <button
              onMouseDown={(e) =>
                updateGameOption(e, { prop: "words", value: 25 })
              }
              className={`option-button ${
                selectedOptions.words === 25 && "selected-option"
              }`}
            >
              25
            </button>
            <button
              onMouseDown={(e) =>
                updateGameOption(e, { prop: "words", value: 50 })
              }
              className={`option-button ${
                selectedOptions.words === 50 && "selected-option"
              }`}
            >
              50
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
