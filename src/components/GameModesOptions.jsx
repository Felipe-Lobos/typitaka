/* eslint-disable react/prop-types */
import './styles/GameModesOptions.css'
export function GameModesOptions({handleTimeButton,HandleWordsButton}) {
  return (
    <div className="game-options">
      <div className="time-options">
        <span>Time</span>
        <button onMouseDown={(e) => handleTimeButton(e, 15)} className="time-button">15</button>
        <button onMouseDown={(e) => handleTimeButton(e, 30)} className="time-button">30</button>
        <button onMouseDown={(e) => handleTimeButton(e, 60)} className="time-button">60</button>
      </div>
      <div className="words-options">
        <span>№ Words</span>
        <button onMouseDown={(e) => HandleWordsButton(e, 10)} className="words-button">10</button>
        <button onMouseDown={(e) => HandleWordsButton(e, 25)} className="words-button">25</button>
        <button onMouseDown={(e) => HandleWordsButton(e, 50)}  className="words-button">50</button>
      </div>
    </div>
  );
}
