import React from "react";

import stringsModule from "./helpers/strings";
import languageContext from "./contexts/languageContext";
import guessedWordsContext from "./contexts/guessedWordsContext";

const GuessedWords = () => {
  const [guessedWords] = guessedWordsContext.useGuessedWords();
  const language = React.useContext(languageContext);
  return (
    <div data-test="component-guessed-words">
      {!guessedWords.length && (
        <span data-test="guess-instructions">
          {stringsModule.getStringByLanguage(language, "guessPrompt")}
        </span>
      )}
      {guessedWords.length > 0 && (
        <div data-test="guessed-words">
          <h3>
            {stringsModule.getStringByLanguage(language, "guessColumnHeader")}
          </h3>
          <table className="table table-sm">
            <thead className="thead-light">
              <tr>
                <th>
                  {stringsModule.getStringByLanguage(language, "guessedWords")}
                </th>
                <th>
                  {stringsModule.getStringByLanguage(
                    language,
                    "matchingLettersColumnHeader"
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              {guessedWords.map(({ guessedWord, letterMatchCount }, index) => (
                <tr data-test="guessed-word" key={index}>
                  <td>{guessedWord}</td>
                  <td>{letterMatchCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GuessedWords;
