import React, { useEffect } from "react";
import hookActions from "./actions/hookActions";
import "./App.css";
import Input from "./input";
import LanguageContext from "./contexts/languageContext";
import LanguagePicker from "./languagePicker";

const reducer = (state, action) => {
  switch (action.type) {
    case "setSecretWord":
      return {
        ...state,
        secretWord: action.payload,
      };
    case "setLanguage":
      return {
        ...state,
        language: action.payload,
      };
    default:
      throw new Error();
  }
};

const App = () => {
  const [state, dispatch] = React.useReducer(reducer, { secretWord: null, language: "en" });

  const setSecretWord = (secretWord) => {
    dispatch({ type: "setSecretWord", payload: secretWord });
  };
  const setLanguage = (language) => {
    dispatch({ type: "setLanguage", payload: language });
  };
  useEffect(() => {
    hookActions.getSecretWord();
  }, []);

  if (!state.secretWord) {
    return (
      <div className="container" data-test="spinner">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p>Loading secret word</p>
      </div>
    );
  }

  return (
    <div data-test="component-app">
      <h1>Jotto</h1>
      <LanguageContext.Provider value={state.language}>
        <LanguagePicker setLanguage={setLanguage} />
        <Input secretWord={state.secretWord} />
      </LanguageContext.Provider>
    </div>
  );
};

export default App;
