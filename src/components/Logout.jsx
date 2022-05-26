import React from 'react';
import { Link } from 'react-router-dom';

class Logout extends React.Component {
  render() {
    return (
      <Link to="/">
        <button
          type="button"
          data-testid="btn-go-home"
        >
          Logout
        </button>
      </Link>
    );
  }
}

export default Logout;
