import React from 'react';
import Logout from '../components/Logout';

export default class Ranking extends React.Component {
  render() {
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        <Logout />
      </>
    );
  }
}
