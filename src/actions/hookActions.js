import axios from "axios";

export const getSecretWord = async (setSecretWord) => {
  const response = await axios.get("http://localehost:3030");
  setSecretWord(response.data);
};

const exportObj = {
  getSecretWord,
};
export default exportObj;
