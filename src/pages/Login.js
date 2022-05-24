import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import Game from './Game';

class Login extends React.Component {
  state = {
    name: '',
    gravatarEmail: '',
    disabled: true,
  }

handleClick = async () => {
  const {
    history,
  } = this.props;
  try {
    const url = 'https://opentdb.com/api_token.php?command=request';
    const response = await fetch(url);
    const data = await response.json();
    localStorage.setItem('token', data.token);
  } catch (error) {
    console.log(error);
  }
  history.push('/game');
};

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => this.validateLogin());
  }

  validateLogin = () => {
    const { name, gravatarEmail } = this.state;
    if (name !== '' && gravatarEmail !== '') {
      return this.setState({ disabled: false });
    }
    this.setState({ disabled: true });
  }

  render() {
    const { ...state } = this.state;
    return (
      <>
        <h1>Login</h1>
        <form>
          <label htmlFor="name">
            Nome
            <input
              type="text"
              name="name"
              value={ state.name }
              onChange={ this.handleChange }
              data-testid="input-player-name"
              id="name"
              placeholder="Digite seu Nome"
            />
          </label>
          <label htmlFor="gravatarEmail">
            Email
            <input
              type="email"
              name="gravatarEmail"
              value={ state.gravatarEmail }
              onChange={ this.handleChange }
              data-testid="input-gravatar-email"
              id="gravatarEmail"
              placeholder="Digite seu Email"
            />
          </label>
          <input
            value="Play"
            type="button"
            disabled={ state.disabled }
            data-testid="btn-play"
            onClick={ this.handleClick }
          />
        </form>
      </>
    );
  }
}
Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};
export default connect()(Login);
