import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [error, setError] = useState(false);

  const incrementHandler = () => {
    if (error) setError(false);
    setCount((prevCount) => {
      return prevCount + 1;
    });
  };
  const decrementHandler = () => {
    if (count > 0) {
      setCount((prevCount) => {
        return prevCount - 1;
      });
    } else {
      setError(true);
    }
  };

  return (
    <div data-test="component-app">
      <h1 data-test="counter-display">
        The counter is currently&nbsp;<span data-test="count">{count}</span>
      </h1>
      {/* Notes: 
      - using ternary on the error state to determine whether or not to hide 
      - the 'error' and 'hidden' classes are defined in App.css
      */}
      <p data-test="error-message" className={`error ${error ? "" : "hidden"}`}>
        The counter cannot go below 0
      </p>
      <button data-test="increment-button" onClick={incrementHandler}>
        Increment counter
      </button>
      <button data-test="decrement-button" onClick={decrementHandler}>
        Increment counter
      </button>
    </div>
  );
}

export default App;
