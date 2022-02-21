import { useEffect, useReducer } from "react";
import "./App.css";

import Congrats from "./Congrats";
import GuessedWords from "./GuessedWords";
import Input from "./Input";
import { getSecretWord } from "./actions";

/**
 * @function reducer to update state, automatically called by dispatch
 * @param state {object} - previous state
 * @param action {object} - "type" and "payload" properties
 * @return {object} - new state
 */
// example action: { type: "setSecretWord", payload: "party" }
const reducer = (state, action) => {
  switch (action.type) {
    case "setSecretWord":
      return { ...state, secretWord: action.payload };
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, {
    secretWord: null,
  });

  // TODO: get props from shared state
  const success = false;
  const guessedWords = [];

  const setSecretWord = (secretWord) => {
    dispatch({
      type: "setSecretWord",
      payload: secretWord,
    });
  };

  useEffect(() => {
    getSecretWord(setSecretWord);
  }, []);

  return (
    <>
      {state.secretWord === null && (
        <div className="container" data-test="spinner">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <p>Loading secret word...</p>
        </div>
      )}
      {state.secretWord && (
        <div className="container" data-test="component-app">
          <h1>Jotto</h1>
          <Congrats success={success} />
          <Input success={success} secretWord={state.secretWord} />
          <GuessedWords guessedWords={guessedWords} />
        </div>
      )}
    </>
  );
}

export default App;
