import React from "react";
import PropTypes from "prop-types";

const Input = ({ secretWord }) => {
  const [currentGuess, setCurrentGuess] = React.useState("");

  const onSubmit = () => {
    // update guessedWords context
    //check secretWord and compare with current guess, if are equal update success context
    setCurrentGuess("");
  };
  return (
    <div data-test="component-input">
      <form className="form-inline">
        <input
          data-test="input-box"
          type="text"
          className="mb2 mx-sm-3"
          placeholder="Enter guess"
          value={currentGuess}
          onChange={(e) => setCurrentGuess(e.target.value)}
        />
        <button data-test="submit-button" className="btn btn-primary mb-2" onClick={onSubmit}>
          submit
        </button>
      </form>
    </div>
  );
};

Input.propTypes = {
  secretWord: PropTypes.string.isRequired,
};

export default Input;
