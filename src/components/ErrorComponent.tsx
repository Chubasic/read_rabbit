import Button from "./Button.tsx";
import process from "node:process";

type Props = {
  error: unknown;
  className?: string;
  resetError?: () => void;
};

export default function ErrorComponent({ error, resetError, className = '' }: Props) {
  const message = error instanceof Error ? error.message : String(error);
  const stack = process.env.NODE_ENV === 'development' && error instanceof Error
    ? error.stack
    : null;

  return (
    <div className={`error-boundary ${className}`}>
      <div className="error-message">
        <strong>Error:</strong> {message}
      </div>
      {resetError && (
        <Button onClick={resetError} className="error-retry">
          Try again
        </Button>
      )}
      {stack && (
        <details className="error-details">
          <summary>Stack trace</summary>
          <pre>{stack}</pre>
        </details>
      )}
    </div>
  );
}
