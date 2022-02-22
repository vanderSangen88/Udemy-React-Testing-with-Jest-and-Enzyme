import PropTypes from "prop-types";

const LanguagePicker = ({ setLanguage }) => {
  const languages = [
    {
      code: "en",
      symbol: "🇺🇸",
    },
    { code: "emoji", symbol: "😊" },
  ];

  return (
    <div data-test="component-language-picker">
      {languages.length > 0 &&
        languages.map((lang) => (
          <span
            data-test="language-icon"
            key={lang.code}
            onClick={() => {
              setLanguage(lang.code);
            }}
          >
            {lang.symbol}
          </span>
        ))}
    </div>
  );
};
LanguagePicker.propTypes = {
  setLanguage: PropTypes.func.isRequired,
};
export default LanguagePicker;
