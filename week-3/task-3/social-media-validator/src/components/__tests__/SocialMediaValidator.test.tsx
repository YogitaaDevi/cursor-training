import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import SocialMediaValidator from '../SocialMediaValidator';
import { SOCIAL_MEDIA_OPTIONS } from '../../constants';

// Mock window.alert
const mockAlert = jest.fn();
window.alert = mockAlert;

describe('SocialMediaValidator Component', () => {
  beforeEach(() => {
    mockAlert.mockClear();
  });

  // Basic Functionality Tests
  describe('Basic Functionality', () => {
    test('renders without crashing', () => {
      render(<SocialMediaValidator />);
      expect(screen.getByLabelText(/select platform/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/url/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    });

    test('validates correct Facebook URL', () => {
      render(<SocialMediaValidator />);
      const select = screen.getByLabelText(/select platform/i);
      const input = screen.getByLabelText(/url/i);
      const submitButton = screen.getByRole('button', { name: /submit/i });

      fireEvent.change(select, { target: { value: 'Facebook' } });
      fireEvent.change(input, { target: { value: 'https://www.facebook.com/username' } });
      fireEvent.click(submitButton);

      expect(screen.getByTestId('success-message')).toBeInTheDocument();
      expect(mockAlert).toHaveBeenCalledWith('Successfully submitted!');
    });

    test('calls onChange callback when provided', () => {
      const mockOnChange = jest.fn();
      render(<SocialMediaValidator onChange={mockOnChange} />);
      const select = screen.getByLabelText(/select platform/i);
      const input = screen.getByLabelText(/url/i);
      const submitButton = screen.getByRole('button', { name: /submit/i });

      fireEvent.change(select, { target: { value: 'Facebook' } });
      fireEvent.change(input, { target: { value: 'https://www.facebook.com/username' } });
      fireEvent.click(submitButton);

      expect(mockOnChange).toHaveBeenCalledWith(true, 'https://www.facebook.com/username', 'Facebook');
    });
  });

  // Input Validation Tests
  describe('Input Validation', () => {
    test('handles empty platform selection', () => {
      render(<SocialMediaValidator />);
      const submitButton = screen.getByRole('button', { name: /submit/i });
      
      fireEvent.click(submitButton);
      expect(screen.getByTestId('error-message')).toHaveTextContent('Please select a platform');
    });

    test('handles empty URL input', () => {
      render(<SocialMediaValidator />);
      const select = screen.getByLabelText(/select platform/i);
      const submitButton = screen.getByRole('button', { name: /submit/i });

      fireEvent.change(select, { target: { value: 'Facebook' } });
      fireEvent.click(submitButton);
      expect(screen.getByTestId('error-message')).toHaveTextContent('Please enter a URL');
    });

    test('handles invalid URL format', () => {
      render(<SocialMediaValidator />);
      const select = screen.getByLabelText(/select platform/i);
      const input = screen.getByLabelText(/url/i);
      const submitButton = screen.getByRole('button', { name: /submit/i });

      fireEvent.change(select, { target: { value: 'Facebook' } });
      fireEvent.change(input, { target: { value: 'invalid-url' } });
      fireEvent.click(submitButton);

      expect(screen.getByTestId('error-message')).toHaveTextContent('Please enter a valid Facebook URL');
    });
  });

  // Special Characters and Unicode Tests
  describe('Special Characters and Unicode', () => {
    test('handles URLs with special characters', () => {
      render(<SocialMediaValidator />);
      const select = screen.getByLabelText(/select platform/i);
      const input = screen.getByLabelText(/url/i);
      const submitButton = screen.getByRole('button', { name: /submit/i });

      const specialChars = 'https://www.facebook.com/user@name!$%^&*()';
      fireEvent.change(select, { target: { value: 'Facebook' } });
      fireEvent.change(input, { target: { value: specialChars } });
      fireEvent.click(submitButton);

      expect(screen.getByTestId('error-message')).toHaveTextContent('Please enter a valid Facebook URL');
    });

    test('handles Unicode characters in URLs', () => {
      render(<SocialMediaValidator />);
      const select = screen.getByLabelText(/select platform/i);
      const input = screen.getByLabelText(/url/i);
      const submitButton = screen.getByRole('button', { name: /submit/i });

      const unicodeUrl = 'https://www.facebook.com/ユーザー名';
      fireEvent.change(select, { target: { value: 'Facebook' } });
      fireEvent.change(input, { target: { value: unicodeUrl } });
      fireEvent.click(submitButton);

      expect(screen.getByTestId('error-message')).toHaveTextContent('Please enter a valid Facebook URL');
    });
  });

  // Security Tests
  describe('Security Tests', () => {
    test('handles XSS attempts in URL', () => {
      render(<SocialMediaValidator />);
      const select = screen.getByLabelText(/select platform/i);
      const input = screen.getByLabelText(/url/i);
      const submitButton = screen.getByRole('button', { name: /submit/i });

      const xssUrl = 'https://www.facebook.com/"><script>alert("xss")</script>';
      fireEvent.change(select, { target: { value: 'Facebook' } });
      fireEvent.change(input, { target: { value: xssUrl } });
      fireEvent.click(submitButton);

      expect(screen.getByTestId('error-message')).toHaveTextContent('Please enter a valid Facebook URL');
    });

    test('handles SQL injection attempts', () => {
      render(<SocialMediaValidator />);
      const select = screen.getByLabelText(/select platform/i);
      const input = screen.getByLabelText(/url/i);
      const submitButton = screen.getByRole('button', { name: /submit/i });

      const sqlInjectionUrl = 'https://www.facebook.com/"; DROP TABLE users; --';
      fireEvent.change(select, { target: { value: 'Facebook' } });
      fireEvent.change(input, { target: { value: sqlInjectionUrl } });
      fireEvent.click(submitButton);

      expect(screen.getByTestId('error-message')).toHaveTextContent('Please enter a valid Facebook URL');
    });
  });

  // Protocol Tests
  describe('Protocol Tests', () => {
    test('validates URLs with different protocols', () => {
      render(<SocialMediaValidator />);
      const select = screen.getByLabelText(/select platform/i);
      const input = screen.getByLabelText(/url/i);
      const submitButton = screen.getByRole('button', { name: /submit/i });

      const protocols = [
        'http://www.facebook.com/user',
        'https://www.facebook.com/user',
        'ftp://www.facebook.com/user',
        'ws://www.facebook.com/user'
      ];

      fireEvent.change(select, { target: { value: 'Facebook' } });

      protocols.forEach(protocol => {
        fireEvent.change(input, { target: { value: protocol } });
        fireEvent.click(submitButton);
        if (protocol.startsWith('http')) {
          expect(screen.getByTestId('success-message')).toBeInTheDocument();
        } else {
          expect(screen.getByTestId('error-message')).toHaveTextContent('Please enter a valid Facebook URL');
        }
      });
    });
  });

  // State Management Tests
  describe('State Management', () => {
    test('clears error message when changing platform', () => {
      render(<SocialMediaValidator />);
      const select = screen.getByLabelText(/select platform/i);
      const submitButton = screen.getByRole('button', { name: /submit/i });

      // First, create an error
      fireEvent.click(submitButton);
      expect(screen.getByTestId('error-message')).toHaveTextContent('Please select a platform');

      // Change platform and verify error is cleared
      fireEvent.change(select, { target: { value: 'Facebook' } });
      expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
    });

    test('clears error message when changing URL', () => {
      render(<SocialMediaValidator />);
      const select = screen.getByLabelText(/select platform/i);
      const input = screen.getByLabelText(/url/i);
      const submitButton = screen.getByRole('button', { name: /submit/i });

      // First, create an error
      fireEvent.change(select, { target: { value: 'Facebook' } });
      fireEvent.change(input, { target: { value: 'invalid-url' } });
      fireEvent.click(submitButton);
      expect(screen.getByTestId('error-message')).toHaveTextContent('Please enter a valid Facebook URL');

      // Change URL and verify error is cleared
      fireEvent.change(input, { target: { value: 'https://www.facebook.com/user' } });
      expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
    });

    test('clears success message when changing platform', () => {
      render(<SocialMediaValidator />);
      const select = screen.getByLabelText(/select platform/i);
      const input = screen.getByLabelText(/url/i);
      const submitButton = screen.getByRole('button', { name: /submit/i });

      // First, create a success
      fireEvent.change(select, { target: { value: 'Facebook' } });
      fireEvent.change(input, { target: { value: 'https://www.facebook.com/username' } });
      fireEvent.click(submitButton);
      expect(screen.getByTestId('success-message')).toBeInTheDocument();

      // Change platform and verify success is cleared
      fireEvent.change(select, { target: { value: 'Twitter' } });
      expect(screen.queryByTestId('success-message')).not.toBeInTheDocument();
    });

    test('clears success message when changing URL', () => {
      render(<SocialMediaValidator />);
      const select = screen.getByLabelText(/select platform/i);
      const input = screen.getByLabelText(/url/i);
      const submitButton = screen.getByRole('button', { name: /submit/i });

      // First, create a success
      fireEvent.change(select, { target: { value: 'Facebook' } });
      fireEvent.change(input, { target: { value: 'https://www.facebook.com/username' } });
      fireEvent.click(submitButton);
      expect(screen.getByTestId('success-message')).toBeInTheDocument();

      // Change URL and verify success is cleared
      fireEvent.change(input, { target: { value: 'https://www.facebook.com/newuser' } });
      expect(screen.queryByTestId('success-message')).not.toBeInTheDocument();
    });
  });

  // Platform-specific Tests
  describe('Platform-specific Tests', () => {
    test.each(SOCIAL_MEDIA_OPTIONS)('validates %s URL correctly', (platform) => {
      render(<SocialMediaValidator />);
      const select = screen.getByLabelText(/select platform/i);
      const input = screen.getByLabelText(/url/i);
      const submitButton = screen.getByRole('button', { name: /submit/i });

      fireEvent.change(select, { target: { value: platform.name } });
      fireEvent.change(input, { target: { value: `https://www.${platform.name.toLowerCase()}.com/username` } });
      fireEvent.click(submitButton);

      expect(screen.getByTestId('success-message')).toBeInTheDocument();
    });
  });

  // Performance Tests
  describe('Performance Tests', () => {
    test('handles rapid input changes', () => {
      render(<SocialMediaValidator />);
      const select = screen.getByLabelText(/select platform/i);
      const input = screen.getByLabelText(/url/i);

      // Simulate rapid input changes
      const rapidChanges = Array(100).fill('').map((_, i) => `https://www.facebook.com/user${i}`);
      
      rapidChanges.forEach(url => {
        fireEvent.change(input, { target: { value: url } });
      });

      // Verify component hasn't crashed
      expect(input).toBeInTheDocument();
    });

    test('handles rapid platform changes', () => {
      render(<SocialMediaValidator />);
      const select = screen.getByLabelText(/select platform/i);

      // Simulate rapid platform changes
      const platforms = SOCIAL_MEDIA_OPTIONS.map(opt => opt.name);
      
      platforms.forEach(platform => {
        fireEvent.change(select, { target: { value: platform } });
      });

      // Verify component hasn't crashed
      expect(select).toBeInTheDocument();
    });
  });
});