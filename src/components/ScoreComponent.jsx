/* eslint-disable react/prop-types */
import "./styles/ScoreComponent.css";

export function ScoreComponent({
  wordsCount,
  lettersCount,
  timeLeft,
  totalTime,
}) {
  const elapsedTime = totalTime - timeLeft;
  //WordsPerMinute, LetterPerMinute
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
          <span>WPM:</span>
          <span>{wpm}</span>
        </div>
        <div className="score-stat">
          <span>Words: C/I/S<span></span></span>
          <span>{`${wordsCount.correct} / ${wordsCount.incorrect} / ${wordsCount.missed}`}</span>
        </div>
        <div className="score-stat">
          <span>Letters: C/I/S</span>
          <span>{`${lettersCount.correct} / ${lettersCount.incorrect} / ${lettersCount.missed}`}</span>
        </div>
        <div className="score-stat">
          <span>Time:</span>
          <span>{elapsedTime}s</span>
        </div>
        <div className="score-stat">
          <span>Accuaracy:</span>
          <span>{accuaracy}%</span>
        </div>
        <div className="score-stat">
          <span>LPM:</span>
          <span>{lpm}</span>
        </div>
      </div>
    </div>
  );
}
