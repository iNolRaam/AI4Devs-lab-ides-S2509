import React from 'react';

export interface ErrorBannerProps {
  message: React.ReactNode;
  onDismiss?: () => void;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
}

/**
 * Accessible error banner for non-field errors.
 * - role="alert" with aria-live="polite" to announce changes
 * - Keyboard-accessible Dismiss button
 * - Optional Retry action
 */
export const ErrorBanner: React.FC<ErrorBannerProps> = ({
  message,
  onDismiss,
  onRetry,
  retryLabel = 'Retry',
  className,
}) => {
  return (
    <div
      role="alert"
      aria-live="polite"
      aria-atomic="true"
      className={className}
      style={{
        border: '1px solid #f5c2c7',
        background: '#f8d7da',
        color: '#842029',
        padding: '12px 16px',
        borderRadius: 4,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}
    >
      <div style={{ flex: 1 }}>{message}</div>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="error-banner-retry"
          style={{
            background: '#ffffff',
            border: '1px solid #842029',
            color: '#842029',
            padding: '6px 10px',
            borderRadius: 4,
            cursor: 'pointer',
          }}
        >
          {retryLabel}
        </button>
      )}
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="error-banner-dismiss"
          aria-label="Dismiss error"
          style={{
            background: 'transparent',
            border: 'none',
            color: '#842029',
            padding: '6px',
            cursor: 'pointer',
          }}
        >
          ×
        </button>
      )}
    </div>
  );
};

export default ErrorBanner;
