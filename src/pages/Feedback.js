import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Scoreboard from '../components/Scoreboard';

class Feedback extends Component {
  componentDidMount() {
    this.checkLocalStorage();
  }

  getRanking = () => JSON.parse(localStorage.getItem('ranking'));

  saveRanking = () => {
    const { name, score, gravatarHash } = this.props;
    const playerRank = {
      name,
      score,
      gravatarHash: `https://www.gravatar.com/avatar/${gravatarHash}`,
    };
    const prevRanking = this.getRanking();
    const ranking = [...prevRanking, playerRank];
    localStorage.setItem('ranking', JSON.stringify(ranking));
  }

  checkLocalStorage() {
    if (!JSON.parse(localStorage.getItem('ranking'))) {
      localStorage.setItem('ranking', JSON.stringify([]));
    } this.saveRanking();
  }

  render() {
    const { assertions } = this.props;
    const THREE = 3;
    return (
      <>
        <Header />
        <div>
          <Link
            to="/ranking"
            data-testid="btn-ranking"
          >
            Ranking
          </Link>
        </div>
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

const mapStateToProps = ({ player: { name, assertions, score, gravatarHash } }) => ({
  name,
  assertions,
  score,
  gravatarHash,
});

export default connect(mapStateToProps, null)(Feedback);
