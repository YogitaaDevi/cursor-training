import React, { useState } from 'react';
import { SOCIAL_MEDIA_OPTIONS, SocialMediaOption } from '../constants';

interface SocialMediaValidatorProps {
  onChange?: (isValid: boolean, url: string, platform: string) => void;
}

const SocialMediaValidator: React.FC<SocialMediaValidatorProps> = ({ onChange }) => {
  const [selectedPlatform, setSelectedPlatform] = useState<SocialMediaOption | null>(null);
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handlePlatformChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const platform = SOCIAL_MEDIA_OPTIONS.find(opt => opt.name === event.target.value);
    setSelectedPlatform(platform || null);
    setError('');
    setSuccess(false);
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
    setError('');
    setSuccess(false);
  };

  const validateUrl = (url: string, platform: SocialMediaOption): boolean => {
    // Basic URL format validation
    try {
      new URL(url);
    } catch {
      return false;
    }
    
    // Platform-specific validation
    return platform.urlPattern.test(url);
  };

  const handleSubmit = () => {
    if (!selectedPlatform) {
      setError('Please select a platform');
      return;
    }

    if (!url) {
      setError('Please enter a URL');
      return;
    }

    const isValid = validateUrl(url, selectedPlatform);
    if (isValid) {
      setSuccess(true);
      setError('');
      if (typeof window !== 'undefined') {
        window.alert('Successfully submitted!');
      }
    } else {
      setSuccess(false);
      setError(`Please enter a valid ${selectedPlatform.name} URL`);
    }
    onChange?.(isValid, url, selectedPlatform.name);
  };

  return (
    <div className="social-media-validator">
      <div className="form-group">
        <label htmlFor="platform">Select Platform:</label>
        <select
          id="platform"
          value={selectedPlatform?.name || ''}
          onChange={handlePlatformChange}
          className="form-control"
        >
          <option value="">Select a platform</option>
          {SOCIAL_MEDIA_OPTIONS.map((option) => (
            <option key={option.name} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="url">URL:</label>
        <input
          id="url"
          type="text"
          value={url}
          onChange={handleUrlChange}
          className="form-control"
          placeholder="Enter URL"
        />
        {error && <div className="error-message" data-testid="error-message">{error}</div>}
        {success && <div className="success-message" data-testid="success-message">URL is valid!</div>}
      </div>

      <button 
        onClick={handleSubmit}
        className="submit-button"
      >
        Submit
      </button>

      <style>{`
        .social-media-validator {
          max-width: 400px;
          margin: 20px auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 8px;
          background-color: white;
        }
        .form-group {
          margin-bottom: 15px;
        }
        .form-group label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }
        .form-control {
          width: 100%;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
        }
        .error-message {
          color: #dc3545;
          font-size: 14px;
          margin-top: 5px;
        }
        .success-message {
          color: #28a745;
          font-size: 14px;
          margin-top: 5px;
        }
        .submit-button {
          background-color: #61dafb;
          color: #282c34;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          font-size: 16px;
          cursor: pointer;
          width: 100%;
          font-weight: bold;
          transition: background-color 0.3s;
        }
        .submit-button:hover {
          background-color: #4fa8c7;
        }
      `}</style>
    </div>
  );
};

export default SocialMediaValidator;