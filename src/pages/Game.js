import React from 'react';
import PropTypes from 'prop-types';

class Game extends React.Component {
  state= {
    perguntas: '',
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
      });
    } catch (error) {
      console.log(error);
    }
    history.push('/game');
  }

  render() {
    const { perguntas } = this.state;
    return (
      <div>
        <p
          data-testid="question-category"
        >
          {perguntas && perguntas[0].category}
        </p>
        <p
          data-testid="question-text"
        >
          {perguntas && perguntas[0].question}
        </p>
        <section data-testid="answer-options">
          <button type="button" data-testid="correct-answer">
            { perguntas && perguntas[0].correct_answer }
          </button>
          <button type="button" data-testid={ `wrong-answer-${0}` }>
            { perguntas && perguntas[0].incorrect_answers[0] }
          </button>
          <button type="button" data-testid={ `wrong-answer-${1}` }>
            { perguntas && perguntas[0].incorrect_answers[1] }
          </button>
          <button type="button" data-testid={ `wrong-answer-${2}` }>
            { perguntas && perguntas[0].incorrect_answers[2] }
          </button>
        </section>
      </div>

    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default Game;
