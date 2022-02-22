import React, { useContext } from "react";
import PropTypes from "prop-types";

import stringsModule from "./helpers/strings";
import languageContext from "./contexts/languageContext";

/**
 * Functional react component for input.
 * @function
 * @param {object} props - React props.
 * @returns {JSX.Element} - Rendered container with input
 */
const Input = ({ success, secretWord }) => {
  const language = useContext(languageContext);
  const [currentGuess, setCurrentGuess] = React.useState("");
  return (
    <div data-test="component-input">
      {!success && (
        <form className="form-inline">
          <input
            data-test="input-box"
            className="mb-2 mx-sm-3"
            type="text"
            placeholder={stringsModule.getStringByLanguage(
              language,
              "guessInputPlaceholder"
            )}
            value={currentGuess}
            onChange={(event) => setCurrentGuess(event.target.value)}
          />
          <button
            data-test="submit-button"
            className="btn btn-primary mb-2"
            onClick={(event) => {
              event.preventDefault();
              // TODO: update guessedWords
              // TODO: check against secretWord and update success if needed
              setCurrentGuess("");
            }}
          >
            {stringsModule.getStringByLanguage(language, "submit")}
          </button>
        </form>
      )}
    </div>
  );
};
Input.propTypes = { secretWord: PropTypes.string.isRequired };
export default Input;
