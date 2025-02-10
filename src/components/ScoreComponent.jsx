/* eslint-disable react/prop-types */
import "./styles/ScoreComponent.css";

export function ScoreComponent({
  wordsCount,
  lettersCount,
  timeLeft,
  totalTime,
}) {
  const elapsedTime = totalTime - timeLeft;
  const wpm = elapsedTime ? (wordsCount.correct / elapsedTime).toFixed(0) * 60 : 0;
  const lpm = elapsedTime ? (lettersCount.correct / elapsedTime).toFixed(0) * 60 : 0;
  const getAccuracy = (totalLettersTyped, correctLettersCount) => {
    if (!totalLettersTyped || !correctLettersCount) return 0;
    const newAccuracy = (
      (correctLettersCount / totalLettersTyped) *
      100
    ).toFixed(0);
    return newAccuracy;
  };
  const accuaracy = getAccuracy(lettersCount.total, lettersCount.correct);
  return (
    <div className="score-wrap">
      <div className="score-modal">
        <div className="score-stat">
          <span>wpm:</span>
          <span>{wpm}</span>
        </div>
        <div className="score-stat">
          <span>Words: Correctas/Incorrectas/Saltadas</span>
          <span>{`${wordsCount.correct} / ${wordsCount.incorrect} / ${wordsCount.missed}`}</span>
        </div>
        <div className="score-stat">
          <span>tiempo:</span>
          <span>{elapsedTime}</span>
        </div>
        <div className="score-stat">
          <span>precision:</span>
          <span>{accuaracy}</span>
        </div>
        <div className="score-stat">
          <span>lpm:</span>
          <span>{lpm}</span>
        </div>
      </div>
    </div>
  );
}
