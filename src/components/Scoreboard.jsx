import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Scoreboard extends Component {
  render() {
    const { score, assertions } = this.props;

    return (
      <>
        <h3>
          Total de pontos:
        </h3>
        <p data-testid="feedback-total-score">{ score }</p>
        <h3>
          Total de acertos:
        </h3>
        <p data-testid="feedback-total-question">{ assertions }</p>
      </>
    );
  }
}

Scoreboard.propTypes = {
  score: PropTypes.number,
  assertions: PropTypes.number,
}.isRequired;

const mapStateToProps = ({
  player: { score, assertions },
}) => ({
  score,
  assertions,
});

export default connect(mapStateToProps, null)(Scoreboard);
