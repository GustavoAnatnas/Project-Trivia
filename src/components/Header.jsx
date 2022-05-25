import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  state = {
    gravatarHash: '',
  }

  componentDidMount() {
    this.generateGravatarHash();
  }

  generateGravatarHash = () => {
    const { gravatarEmail } = this.props;
    const gravatarHash = md5(gravatarEmail).toString();
    this.setState({
      gravatarHash,
    });
  }

  render() {
    const { gravatarHash } = this.state;
    const { name, score } = this.props;
    return (
      <>
        <img
          src={ `https://www.gravatar.com/avatar/${gravatarHash}` }
          alt="avatar"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">
          {name}
        </p>
        <span>Score: </span>
        <span data-testid="header-score">
          {score}
        </span>
      </>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string,
  gravatarEmail: PropTypes.string,
}.isRequired;

const mapStateToProps = ({ player: { name, score, gravatarEmail } }) => ({
  name,
  score,
  gravatarEmail,
});

export default connect(mapStateToProps, null)(Header);
