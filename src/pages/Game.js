import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ACTION_ADD_SCORE } from '../redux/action';
import Header from '../components/Header';
import './Style.css';

class Game extends React.Component {
  state= {
    perguntas: '',
    shuffledAnswers: [],
    currQuestion: 0,
    answersOptions: true,
    respondido: false,
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

    this.startCountdown();
  }

  componentDidUpdate() {
    const { timer } = this.state;
    if (timer < 0) {
      clearInterval(this.interval);
      this.stopCountdown();
    }
  }

  startCountdown = () => {
    const ONE_SECOND = 1000;
    this.interval = setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    }, ONE_SECOND);
  }

  stopCountdown = () => {
    this.setState({
      timer: 0,
    }, () => clearInterval(this.interval));
  }

  resetCountdown = () => {
    this.setState({
      timer: 30,
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

  handleAnswers = () => this.setState({ answersOptions: false });

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

  getAnswer = () => {
    this.setState({
      respondido: true,
    }, () => clearInterval(this.interval));
  }

  nextQuestion = () => {
    const { currQuestion } = this.state;
    this.setState({
      currQuestion: currQuestion + 1,
      respondido: false,
      answersOptions: true,
    }, () => {
      this.shuffleAnswers();
      this.resetCountdown();
      this.startCountdown();
    });
  }

  render() {
    const { addScore, history } = this.props;
    const { perguntas, shuffledAnswers,
      currQuestion, respondido, timer,
      answersOptions,
    } = this.state;
    const FOUR = 4;
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
                      className={
                        !answersOptions ? 'correctAnswer' : null
                      }
                      type="button"
                      data-testid="correct-answer"
                      disabled={ timer === 0 || respondido }
                      onClick={ () => {
                        addScore(this.calculatePoints(
                          perguntas[currQuestion].difficulty,
                        ));
                        this.getAnswer();
                        this.handleAnswers();
                      } }
                    >
                      {answer}
                    </button>
                  ) : (
                    <button
                      key={ i }
                      className={
                        !answersOptions ? 'wrongAnswer' : null
                      }
                      type="button"
                      data-testid={ `wrong-answer-${i}` }
                      disabled={ timer === 0 || respondido }
                      onClick={ () => {
                        this.getAnswer();
                        this.handleAnswers();
                      } }
                    >
                      { answer }
                    </button>
                  )
              ))
            }
            {(respondido || timer === 0) && (
              <button
                data-testid="btn-next"
                type="button"
                onClick={ currQuestion !== FOUR
                  ? () => this.nextQuestion()
                  : () => history.push('/feedback') }
              >
                Next
              </button>
            ) }
          </section>
          <div className="timer">
            <span>Timer: </span>
            <span>{ timer }</span>
          </div>
        </div>
      </>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }),
  add: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  addScore: (score) => dispatch(ACTION_ADD_SCORE(score)),
});

export default connect(null, mapDispatchToProps)(Game);
