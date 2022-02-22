import { useContext } from "react";
import PropTypes from "prop-types";

import languageContext from "./contexts/languageContext";
import stringsModule from "./helpers/strings";

/**
 * Functional react component for congratulatory message.
 * @function
 * @param {object} props - React props.
 * @returns {JSX.Element} - Rendered component (or null if `success` prop is falsy)
 */
const Congrats = ({ success }) => {
  const language = useContext(languageContext);
  return (
    <>
      {success && (
        <div data-test="component-congrats" className="alert alert-success">
          <span data-test="congrats-message">
            {stringsModule.getStringByLanguage(language, "congrats")}
          </span>
        </div>
      )}
      {!success && <div data-test="component-congrats" />}
    </>
  );
};

Congrats.propTypes = { success: PropTypes.bool.isRequired };

export default Congrats;
