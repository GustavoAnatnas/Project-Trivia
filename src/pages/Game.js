import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ACTION_ADD_SCORE } from '../redux/action';
import Header from '../components/Header';

class Game extends React.Component {
  state= {
    perguntas: '',
    shuffledAnswers: [],
    currQuestion: 0,
    timer: 30,
  }

  async componentDidMount() {
    const {
      history,
    } = this.props;
    try {
      const token = localStorage.getItem('token');
      const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.response_code !== 0) {
        localStorage.removeItem('token');
        return history.push('/');
      } this.setState({
        perguntas: data.results,
      }, () => this.shuffleAnswers());
    } catch (error) {
      console.log(error);
    }
    history.push('/game');

    this.countdown();
  }

  componentDidUpdate() {
    const { timer } = this.state;
    if (timer < 0) {
      clearInterval(this.interval);
      this.resetCountdown();
    }
  }

  countdown = () => {
    const ONE_SECOND = 1000;
    this.interval = setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    }, ONE_SECOND);
  }

  resetCountdown = () => {
    this.setState({
      timer: 0,
    });
  }

  shuffleAnswers = () => {
    const { perguntas, currQuestion } = this.state;
    const answers = [
      ...perguntas[currQuestion].incorrect_answers,
      perguntas[currQuestion].correct_answer,
    ];
    const answersArray = answers.map((answer) => {
      if (answer === perguntas[currQuestion].correct_answer) {
        return { certa: true, answer };
      }
      return { certa: false, answer };
    });

    // Utilizada uma solução de https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    const ROUND = 0.5;
    const shuffledAnswers = answersArray.sort(() => Math.random() - ROUND);
    this.setState({
      shuffledAnswers,
    });
  }

  calculatePoints = (difficulty) => {
    const { timer } = this.state;
    const TEN = 10;
    const ONE = 1;
    const TWO = 2;
    const THREE = 3;
    let difficultyRate = 1;
    if (difficulty === 'easy') {
      difficultyRate = ONE;
    } else if (difficulty === 'medium') {
      difficultyRate = TWO;
    } else {
      difficultyRate = THREE;
    }
    return TEN + (timer * difficultyRate);
  }

  render() {
    const { addScore } = this.props;
    const { perguntas, shuffledAnswers, currQuestion, timer } = this.state;
    return (
      <>
        <Header />
        <div>
          <p
            data-testid="question-category"
          >
            {perguntas && perguntas[currQuestion].category}
          </p>
          <p
            data-testid="question-text"
          >
            {perguntas && perguntas[currQuestion].question}
          </p>
          <section data-testid="answer-options">
            {
              shuffledAnswers.map(({ certa, answer }, i) => (
                certa
                  ? (
                    <button
                      key={ i }
                      type="button"
                      data-testid="correct-answer"
                      disabled={ timer === 0 }
                      onClick={
                        () => addScore(this.calculatePoints(
                          perguntas[currQuestion].difficulty,
                        ))
                      }
                    >
                      {answer}
                    </button>
                  ) : (
                    <button
                      key={ i }
                      type="button"
                      data-testid={ `wrong-answer-${i}` }
                      disabled={ timer === 0 }
                    >
                      { answer }
                    </button>
                  )
              ))
            }
          </section>
          <span>Timer: </span>
          <span>{ timer }</span>
        </div>
      </>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }),
  add: PropTypes.func,
}.isRequired;

// const mapStateToProps = ({ player: { score } }) => ({
//   score,
// });

const mapDispatchToProps = (dispatch) => ({
  addScore: (score) => dispatch(ACTION_ADD_SCORE(score)),
});

export default connect(null, mapDispatchToProps)(Game);
