/* eslint-disable react/prop-types */
import { wordsTypes } from "../wordsTypes/wordsTypes";
import "./styles/WordsTypeSelector.css";

export function WordsTypeSelector({ updateImportedWords }) {
  const handleSelection = (e, typeName) => {
    e.preventDefault();
    updateImportedWords(typeName);
  };

  return (
    <div className="words-type-selector">
      {wordsTypes.map((wordType) => {
        return (
          <button
            onMouseDown={(e) => handleSelection(e, wordType)}
            key={wordType}
          >
            {wordType}
          </button>
        );
      })}
    </div>
  );
}
