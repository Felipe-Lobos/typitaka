export function WordListSelector(){

    const wordsOptions = ['words','wordsRomaji','wordsSpanish'];
    return(
        <div className="selector-container">
            <div className="wordlist-item">
                ingles
            </div>
            <div className="wordlist-item">
                español
            </div>
            <div className="wordlist-item">
                romaji
            </div>
        </div>
    );
}