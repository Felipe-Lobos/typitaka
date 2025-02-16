/* eslint-disable react/prop-types */
import './styles/GameModesOptions.css'
export function GameModesOptions({gameMode,updateGameOption}) {
  return (
    <div className="game-options">
      <div className='mode-selector'>
      <button onMouseDown={(e) => updateGameOption(e,{prop:'mode',value:'words'})} className="option-button">Words</button>
      <button onMouseDown={(e) => updateGameOption(e,{prop:'mode',value:'time'})} className="option-button">Time</button>


      </div>
      {gameMode === 'time' &&
       (<div className="time-options">
        <span>Time</span>
        <button onMouseDown={(e) => updateGameOption(e,{prop:'time',value:15})}  className="option-button">15</button>
        <button onMouseDown={(e) => updateGameOption(e,{prop:'time',value:30})} className="option-button">30</button>
        <button onMouseDown={(e) => updateGameOption(e,{prop:'time',value:60})} className="option-button">60</button>
      </div>) }

      {gameMode ==='words' && (<div className="words-options">
        <span>№ Words</span>
        <button onMouseDown={(e) => updateGameOption(e,{prop:'words',value:10})}  className="option-button">10</button>
        <button onMouseDown={(e) => updateGameOption(e,{prop:'words',value:25})}  className="option-button">25</button>
        <button onMouseDown={(e) => updateGameOption(e,{prop:'words',value:50})}  className="option-button">50</button>
      </div>)}
      
    </div>
  );
}
