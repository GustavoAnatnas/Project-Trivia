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
          <p data-testid="feedback-total-score">{ score }</p>
        </h3>
        <h3>
          Total de acertos:
          <p data-testid="feedback-total-question">{ assertions }</p>
        </h3>
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
