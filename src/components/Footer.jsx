import React from "react";
import PropTypes from "prop-types";

function Footer(props) {
  return (
    <footer>
      {props.isGameOver && <button className="reset-btn" onClick={props.handleNewGame}>New Game</button>}
    </footer>
  );
}

Footer.proptypes = {
  isGameOver: PropTypes.bool,
  handleNewGame: PropTypes.func
}

export default Footer;
