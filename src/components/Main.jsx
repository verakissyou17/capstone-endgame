import PropTypes from "prop-types";
import { languages } from "../languages";
import clsx from "clsx";

function Main(props) {

  return (
    <main>
      <section className="buttons-container">
        {languages.map((lang, index) => {
          const styles = {
            backgroundColor: lang.backgroundColor,
            color: lang.color,
          };
          const isLanguageLost = index < props.wrongGuessesCount;

          return (
            <button
              key={index}
              style={styles}
              className={clsx("", isLanguageLost && "lost")}
            >
              {lang.name}
            </button>
          );
        })}
      </section>
      <section className="word-container">
        {props.currentWord.split("").map((letter, index) => {
          const revealWord = props.isGameLost || props.guessedLetters.includes(letter);
          const letterClassName = clsx(
            props.isGameLost && !props.guessedLetters.includes(letter) && "missed-letter"
        )

          return (
            <span key={index} className={letterClassName} >{revealWord ? letter.toUpperCase() : ""}</span>
          );
        })}
      </section>
      <section className="sr-only" aria-live="polite" role="status">
        <p>
          {props.currentWord.includes(props.lastGuessedLetter)
            ? `Correct! The letter ${props.lastGuessedLetter} is in the word.`
            : `Sorry, the letter ${props.lastGuessedLetter} is not in the word.`}
          You have {props.attempsLeft} attempts left.
        </p>
        <p>
          Current word:{" "}
          {props.currentWord
            .split("")
            .map((letter) =>
              props.guessedLetters.includes(letter) ? letter + "." : "blank."
            )
            .join(" ")}
        </p>
      </section>
      <div className="keyboard-container">
        {props.alphabet.split("").map((letter) => {
          const isGuessed = props.guessedLetters.includes(letter);
          const isCorrect = isGuessed && props.currentWord.includes(letter);
          const isWrong = isGuessed && !props.currentWord.includes(letter);

          const keyboardBtn = clsx({
            correct: isCorrect,
            wrong: isWrong,
          });

          return (
            <button
              key={letter}
              aria-disabled={props.guessedLetters.includes(letter)}
              aria-label={`Letter ${letter.toUpperCase()}`}
              type="button"
              disabled={props.isGameOver}
              className={keyboardBtn}
              onClick={() => props.handleClick(letter)}
            >
              {letter.toUpperCase()}
            </button>
          );
        })}
      </div>
    </main>
  );
}

Main.propTypes = {
  alphabet: PropTypes.string.isRequired,
  currentWord: PropTypes.string.isRequired,
  guessedLetters: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleClick: PropTypes.func.isRequired,
  wrongGuessesCount: PropTypes.number.isRequired,
  isGameWon: PropTypes.bool.isRequired,
  isGameLost: PropTypes.bool.isRequired,
  isGameOver: PropTypes.bool.isRequired,
  lastGuessedLetter: PropTypes.string.isRequired,
  attemptsLeft: PropTypes.number.isRequired,
};

export default Main;
