import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../redux/action';

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
    const { name, gravatarEmail, disabled } = this.state;
    const { ACTION_LOGIN } = this.props;
    return (
      <>
        <h1>Login</h1>
        <form>
          <label htmlFor="name">
            Nome
            <input
              type="text"
              name="name"
              value={ name }
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
              value={ gravatarEmail }
              onChange={ this.handleChange }
              data-testid="input-gravatar-email"
              id="gravatarEmail"
              placeholder="Digite seu Email"
            />
          </label>
          <input
            value="Play"
            type="button"
            disabled={ disabled }
            data-testid="btn-play"
            onClick={ () => {
              ACTION_LOGIN(name, gravatarEmail);
              this.handleClick();
            } }
          />
        </form>
        <Link to="/settings">
          <button
            type="submit"
            data-testid="btn-settings"
          >
            Settings
          </button>
        </Link>
      </>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }),
  ACTION_LOGIN: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  ACTION_LOGIN: (name, gravatarEmail) => dispatch(login(name, gravatarEmail)),
});

export default connect(null, mapDispatchToProps)(Login);
