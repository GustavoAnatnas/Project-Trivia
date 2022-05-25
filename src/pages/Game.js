import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Game extends React.Component {
  state= {
    perguntas: '',
    shuffledAnswers: [],
    currQuestion: 0,
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

getAnswer = () => {
  this.setState({
    respondido: true,
  });
}

nextQuestion = () => {
  const { currQuestion } = this.state;
  this.setState({
    currQuestion: currQuestion + 1,
    respondido: false,
  });
}

render() {
  const { perguntas, shuffledAnswers, currQuestion, respondido, timer } = this.state;
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
                    onClick={ () => this.getAnswer() }
                  >
                    {answer}
                  </button>
                ) : (
                  <button
                    key={ i }
                    type="button"
                    data-testid={ `wrong-answer-${i}` }
                    disabled={ timer === 0 }
                    onClick={ () => this.getAnswer() }
                  >
                    { answer }
                  </button>
                )
            ))
          }
          {respondido && (
            <button
              data-testid="btn-next"
              type="button"
              onClick={ () => this.nextQuestion() }
            >
              Next
            </button>
          )}

        </section>
        <span>Timer: </span>
        <span>{ timer }</span>
      </div>
    </>
  );
}
}

Game.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default Game;
