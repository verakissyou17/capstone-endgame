import { useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { languages } from "./languages";
import { words } from "./words";
import Confetti from 'react-confetti';

function App() {
  // State values
  const [currentWord, setCurrentWord] = useState(() => getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState([]);

  // Derived values
  const numGuessesLeft = languages.length - 1;
  const wrongGuessesCount = guessedLetters.filter(
    (letter) => !currentWord.includes(letter)
  ).length;
  const attempsLeft = numGuessesLeft - wrongGuessesCount;
  const isGameLost = wrongGuessesCount >= numGuessesLeft;
  const isGameWon = currentWord
    .split("")
    .every((letter) => guessedLetters.includes(letter));
  const isGameOver = isGameLost || isGameWon;
  const correct = guessedLetters
    .map((letter) => currentWord.includes(letter))
    .pop();
  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
  const farewellText = getLostedLanguage();

  //Static values
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  // Functions
  function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  }

  function handleClick(letter) {
    setGuessedLetters((prevLetter) =>
      prevLetter.includes(letter) ? prevLetter : [...prevLetter, letter]
    );
  }

  function getLostedLanguage() {
    const lostedLanguage = languages.map((lang, index) => {
      return index < wrongGuessesCount ? lang.name : "";
    });

    return lostedLanguage[wrongGuessesCount - 1];
  }

  function handleNewGame() {
    setCurrentWord(getRandomWord());
    setGuessedLetters([]);
  }

  // Render
  return (
    <>
      {isGameWon && <Confetti width={window.innerWidth} height={window.innerHeight}/>}
      <Header
        isGameLost={isGameLost}
        isGameWon={isGameWon}
        isGameOver={isGameOver}
        farewellText={farewellText}
        correct={correct}
      />
      <Main
        alphabet={alphabet}
        currentWord={currentWord}
        handleClick={handleClick}
        wrongGuessesCount={wrongGuessesCount}
        guessedLetters={guessedLetters}
        isGameWon={isGameWon}
        isGameOver={isGameOver}
        isGameLost={isGameLost}
        lastGuessedLetter={lastGuessedLetter}
        attempsLeft={attempsLeft}
      />
      <Footer isGameOver={isGameOver} handleNewGame={handleNewGame} />
    </>
  );
}

export default App;

