import React from "react";

const successContext = React.createContext();

/**
 * @function useSuccess
 * @returns {array} successContext value, which is a state of [value, setter].
 */
const useSuccess = () => {
  const context = React.useContext(successContext);
  if (!context) {
    throw new Error(`useSuccess must be used within a SuccessProvider`);
  }

  return context;
};

/**
 * @function SuccessProvider
 * @param {object} props - props to pass through from declared component
 * @returns {JSX.Element} Provider component
 */
const SuccessProvider = (props) => {
  const [success, setSuccess] = React.useState(false);

  const value = React.useMemo(() => [success, setSuccess], [success]);
  return <successContext.Provider value={value} {...props} />;
};

const context = { SuccessProvider, useSuccess };
export default context;
