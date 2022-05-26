import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Feedback extends Component {
  render() {
    const { assertions } = this.props;
    const THREE = 3;
    return (
      <h1 data-testid="feedback-text">
        {
          assertions >= THREE
            ? 'Well Done!'
            : 'Could be better...'
        }
      </h1>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number,
}.isRequired;

const mapStateToProps = ({ player: { assertions } }) => ({
  assertions,
});

export default connect(mapStateToProps, null)(Feedback);
