import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { ACTION_SAVE_HASH } from '../redux/action';
import '../css/header.css';
import logo from '../trivia.png';

class Header extends Component {
  componentDidMount() {
    this.generateGravatarHash();
  }

  generateGravatarHash = () => {
    const { gravatarEmail, saveGravatarHash } = this.props;
    const gravatarHash = md5(gravatarEmail).toString();
    saveGravatarHash(gravatarHash);
  }

  render() {
    const { name, score, gravatarHash } = this.props;
    return (
      <>
        <img className="logo-game" width="200px" src={ logo } alt="logo" />
        <div className="header">
          <img
            src={ `https://www.gravatar.com/avatar/${gravatarHash}` }
            alt="avatar"
            data-testid="header-profile-picture"
            className="photo"
          />
          <h4 data-testid="header-player-name">
            {name}
          </h4>
          {/* <span>Score: </span> */}
          <p data-testid="header-score">
            {`Score: ${score}`}
          </p>
        </div>

      </>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string,
  gravatarEmail: PropTypes.string,
}.isRequired;

const mapStateToProps = ({ player: { name, score, gravatarEmail, gravatarHash } }) => ({
  name,
  score,
  gravatarEmail,
  gravatarHash,
});

const mapDispatchToProps = (dispatch) => ({
  saveGravatarHash: (gravatarHash) => dispatch(ACTION_SAVE_HASH(gravatarHash)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
