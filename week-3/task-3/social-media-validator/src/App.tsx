import React from 'react';
import SocialMediaValidator from './components/SocialMediaValidator';
import './App.css';

function App() {
  const handleValidationChange = (isValid: boolean, url: string, platform: string) => {
    console.log(`Validation result for ${platform}:`, { isValid, url });
  };

  return (
    <div className="App" data-testid="app-container">
      <header className="App-header">
        <h1>Social Media URL Validator</h1>
        <div data-testid="social-media-validator">
          <SocialMediaValidator onChange={handleValidationChange} />
        </div>
      </header>
    </div>
  );
}

export default App;
