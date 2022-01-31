/**
 * Functional react component for congratulatory message.
 * @function
 * @param {object} props - React props.
 * @returns {JSX.Element} - Rendered component (or null if `success` prop is falsy)
 */
const Congrats = ({ success }) => {
  return (
    <>
      {success && (
        <div data-test="component-congrats">
          <span data-test="congrats-message">
            Congratulations! You guessed the word!
          </span>
        </div>
      )}
      {!success && <div data-test="component-congrats" />}
    </>
  );
};

export default Congrats;
