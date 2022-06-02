import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ACTION_RESET_SCORE } from '../redux/action';
import Header from '../components/Header';
import Scoreboard from '../components/Scoreboard';
import '../css/feedback.css';
import rankingpng from '../ranking.png';

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
    const { assertions, resetScore } = this.props;
    const THREE = 3;
    return (
      <>
        <Header />
        <div>
          <Link
            to="/ranking"
            data-testid="btn-ranking"
          >
            {/* Ranking */}
            <img src={ rankingpng } className="ranking-png" alt="logo" />
          </Link>
        </div>
        <main className="mainFeedback">
          <h1 data-testid="feedback-text">
            {assertions >= THREE ? 'Well Done!' : 'Could be better...'}
          </h1>
          <Scoreboard />

          <Link to="/">
            <button
              className="restart-btn"
              type="submit"
              data-testid="btn-play-again"
              onClick={ () => resetScore() }
            >
              Play Again
            </button>
          </Link>
        </main>
      </>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number,
  resetScore: PropTypes.func,

}.isRequired;

const mapStateToProps = ({ player: { name, assertions, score, gravatarHash } }) => ({
  name,
  assertions,
  score,
  gravatarHash,
});

const mapDispatchToProps = (dispatch) => ({
  resetScore: () => dispatch(ACTION_RESET_SCORE()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
