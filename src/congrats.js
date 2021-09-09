import React from "react";
import PropTypes from "prop-types";
import LanguageContext from "./contexts/languageContext";
import languageStrings from "./helper/strings";

const Congrats = ({ success }) => {
  const languageCtx = React.useContext(LanguageContext);
  return success ? (
    <div data-test="component-congrats" className="alert alert-success">
      <span data-test="congrats-message">
        {languageStrings.getStringByLanguage(languageCtx, "congrats")}
      </span>
    </div>
  ) : (
    <div data-test="component-congrats"></div>
  );
};

Congrats.propTypes = {
  success: PropTypes.bool.isRequired,
};

export default Congrats;
