import React from 'react';

export default class Login extends React.Component {
  state = {
    name: '',
    gravatarEmail: '',
    disabled: true,
  }

  fetchAPI = async () => {
    const perguntas = '5';
    const token = '6d3dd1c6f1e74953a7209f71fa99128702b57479ff27a1ea528f94b1fdd30f19';
    const response = await fetch(`https://opentdb.com/api.php?amount=${perguntas}&token=${token}`);
    const data = await response.json();
    console.log(data);
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
            onClick={ this.fetchAPI }
          />
        </form>
      </>
    );
  }
}
