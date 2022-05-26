import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ACTION_RESET_SCORE } from '../redux/action';

class Logout extends React.Component {
  render() {
    const { resetScore } = this.props;
    return (
      <Link
        to="/"
      >
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => resetScore() }
        >
          Logout
        </button>
      </Link>
    );
  }
}

Logout.propTypes = {
  resetScore: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  resetScore: () => dispatch(ACTION_RESET_SCORE()),
});

export default connect(null, mapDispatchToProps)(Logout);
