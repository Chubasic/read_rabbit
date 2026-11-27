import { useEffect } from 'preact/hooks';

export default function useKeyPress(
  key: string,
  callback: (event: KeyboardEvent) => void
) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === key) {
        callback(event);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [key, callback]);
}

// Usage:
// useKeyPress('ArrowRight', () => console.log('Right arrow pressed'));
// useKeyPress('Enter', (e) => { e.preventDefault(); doSomething(); });
