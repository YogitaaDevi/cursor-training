import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';
import { ReportHandler } from 'web-vitals';

// Mock web-vitals
jest.mock('web-vitals', () => ({
  getCLS: jest.fn(),
  getFID: jest.fn(),
  getFCP: jest.fn(),
  getLCP: jest.fn(),
  getTTFB: jest.fn(),
}));

// Import reportWebVitals after mocking web-vitals
import reportWebVitals from './reportWebVitals';

describe('reportWebVitals', () => {
  let mockReportHandler: ReportHandler;

  beforeEach(() => {
    // Clear all mocks
    jest.clearAllMocks();
    
    // Create a mock report handler
    mockReportHandler = jest.fn();
  });

  test('calls all web vitals functions when onPerfEntry is provided', () => {
    // Call reportWebVitals with the mock handler
    reportWebVitals(mockReportHandler);

    // Check if all web vitals functions were called with the handler
    expect(getCLS).toHaveBeenCalledWith(mockReportHandler);
    expect(getFID).toHaveBeenCalledWith(mockReportHandler);
    expect(getFCP).toHaveBeenCalledWith(mockReportHandler);
    expect(getLCP).toHaveBeenCalledWith(mockReportHandler);
    expect(getTTFB).toHaveBeenCalledWith(mockReportHandler);
  });

  test('does not call web vitals functions when onPerfEntry is not provided', () => {
    // Call reportWebVitals without a handler
    reportWebVitals();

    // Check that no web vitals functions were called
    expect(getCLS).not.toHaveBeenCalled();
    expect(getFID).not.toHaveBeenCalled();
    expect(getFCP).not.toHaveBeenCalled();
    expect(getLCP).not.toHaveBeenCalled();
    expect(getTTFB).not.toHaveBeenCalled();
  });
}); 