import React from 'react';
import '../css/settings.css';
import settings from '../settings.png';

class Settings extends React.Component {
  render() {
    return (
      <>
        <h1 className="seth1" data-testid="settings-title">Settings</h1>
        <div className="maintenance">
          <h1>
            Under Maintenance
          </h1>
          <img src={ settings } className="settings" alt="logo" />
        </div>
      </>
    );
  }
}

export default Settings;
