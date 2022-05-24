import React from 'react';
import { Link } from 'react-router-dom';

export default class Login extends React.Component {
  state = {
    name: '',
    gravatarEmail: '',
    disabled: true,
  }

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
            type="submit"
            disabled={ state.disabled }
            data-testid="btn-play"
          />
        </form>
        <Link to="/settings">
          <button
            data-testid="btn-settings"
            >
            Settings
          </button>
        </Link>
      </>
    );
  }
}


