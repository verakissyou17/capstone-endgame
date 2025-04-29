import PropTypes from "prop-types";
import clsx from "clsx";
import { getFarewellText } from "../utils";

function Header(props) {
  const gameStatusClass = clsx("message-container", {
    "game-won": props.isGameWon,
    "game-lost": props.isGameLost,
    "language-lost": !props.correct && props.farewellText,
    "correct-letter": !props.isGameOver && props.correct,
  });

  function renderGameStatus() {
    if (props.isGameWon)
      return (
        <>
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
        </>
      );
    if (props.isGameLost)
      return (
        <>
          <h2>Game over!</h2>
          <p>You lose! Better start learning Assembly 😭</p>
        </>
      );
    if (!props.isGameOver && !props.correct && props.farewellText)
      return (
        <>
          <h2>{getFarewellText(props.farewellText)}</h2>
        </>
      );
    if (!props.isGameOver && props.correct)
      return (
        <>
          <h2>Good job !!!</h2>
        </>
      );
    return null;
  }

  return (
    <header>
      <h1>Assembly: Endgame</h1>
      <p>
        Guess the word in under 8 attempts to keep the programming world safe
        from Assembly!
      </p>
      <section 
          aria-live="polite" 
          role="status" 
          className={gameStatusClass}
      >
        {renderGameStatus()}
      </section>
    </header>
  );
}

Header.propTypes = {
  isGameLost: PropTypes.bool.isRequired,
  isGameWon: PropTypes.bool.isRequired,
  isGameOver: PropTypes.bool.isRequired,
  farewellText: PropTypes.string.isRequired,
  correct: PropTypes.bool.isRequired,
};

export default Header;
