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
  const wpm = elapsedTime
    ? ((wordsCount.correct / elapsedTime) * 60).toFixed(0)
    : 0;
  const lpm = elapsedTime
    ? ((lettersCount.correct / elapsedTime) * 60).toFixed(0)
    : 0;
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
        <div className="score-stat wpm-stat">
          <span>WPM</span>
          <span>{wpm}</span>
        </div>
        <div className="score-stat words-stat">
          <span>Words</span>
          <div className="stat-wrap">
            <div><span>Correct:</span> <span>{wordsCount.correct} </span></div>
            <div><span>Incorrect:</span> <span>{wordsCount.incorrect}</span> </div>
            <div><span>Missed:</span> <span>{wordsCount.missed}</span> </div>
          </div>
        </div>
        <div className="score-stat letters-stat">
          <span>Letters</span>
          <div className="stat-wrap">
            <div><span>Correct:</span> <span>{lettersCount.correct}</span> </div>
            <div><span>Incorrect:</span> <span>{lettersCount.incorrect}</span> </div>
            <div><span>Missed:</span> <span>{lettersCount.missed}</span> </div>
          </div>
        </div>
        <div className="score-stat time-stat">
          <span>Time</span>
          <span>{elapsedTime}s</span>
        </div>
        <div className="score-stat accuaracy-stat">
          <span>Accuaracy</span>
          <span>{accuaracy}%</span>
        </div>
        <div className="score-stat lpm-stat">
          <span>LPM</span>
          <span>{lpm}</span>
        </div>
      </div>
    </div>
  );
}
