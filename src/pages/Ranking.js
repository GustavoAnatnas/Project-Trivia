import React from 'react';
import { connect } from 'react-redux';
import Logout from '../components/Logout';

class Ranking extends React.Component {
  state = {
    ranking: [],
  }

  componentDidMount() {
    this.saveRankingOnState(this.getRanking());
  }

  getRanking = () => JSON.parse(localStorage.getItem('ranking'));

  saveRankingOnState = (ranking) => {
    this.setState({
      ranking,
    }, () => this.orderRankingByScore());
  }

  orderRankingByScore = () => {
    const { ranking } = this.state;
    const sortedRanking = ranking.sort((a, b) => b.score - a.score);
    this.setState({
      ranking: sortedRanking,
    });
  }

  render() {
    const { ranking } = this.state;
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        {
          ranking.map(({ name, score, gravatarHash }, index) => (
            <div key={ index }>
              <img
                src={ gravatarHash }
                alt="avatar"
              />
              <p data-testid={ `player-name-${index}` }>
                {name}
              </p>
              <span>Score: </span>
              <span data-testid={ `player-score-${index}` }>
                {score}
              </span>
            </div>
          ))
        }
        <Logout />
      </>
    );
  }
}

const mapStateToProps = ({ player: { name, score, gravatarHash } }) => ({
  name,
  score,
  gravatarHash,
});

export default connect(mapStateToProps, null)(Ranking);
