import { useEffect, useState } from 'react';

declare global {
  interface Window {
    frameworkReady?: () => void;
  }
}

export function useFrameworkReady() {
  const [initialized, setInitialized] = useState(false);

  // Initialize framework once
  useEffect(() => {
    if (typeof window !== 'undefined' && window.frameworkReady) {
      window.frameworkReady();
    }
    setInitialized(true);
  }, []);

  // Additional initialization logic can go here
  useEffect(() => {
    if (initialized) {
      // Any post-initialization logic
      console.log('Framework ready and initialized');
    }
  }, [initialized]);
}