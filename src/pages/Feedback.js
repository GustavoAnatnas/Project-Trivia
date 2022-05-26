import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Scoreboard from '../components/Scoreboard';

class Feedback extends Component {
  render() {
    const { assertions } = this.props;
    const THREE = 3;
    return (
      <>
        <Header />
        <h1 data-testid="feedback-text">
          {assertions >= THREE ? 'Well Done!' : 'Could be better...'}
        </h1>
        <Scoreboard />
        <Link to="/">
          <button
            type="submit"
            data-testid="btn-play-again"
          >
            Play Again
          </button>
        </Link>
      </>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number,
}.isRequired;

const mapStateToProps = ({ player: { assertions } }) => ({
  assertions,
});

export default connect(mapStateToProps, null)(Feedback);
