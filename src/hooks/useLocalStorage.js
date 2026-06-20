import { useState, useCallback } from 'react';

/**
 * Custom hook to manage state synchronized with localStorage.
 * Handles cases where localStorage is disabled (e.g. private browsing) or encounters JSON parsing errors gracefully.
 *
 * @template T
 * @param {string} key - The key name under which values are stored.
 * @param {T | (() => T)} initialValue - The initial value or state resolver callback function.
 * @returns {[T, (value: T | ((val: T) => T)) => void]} An array containing the persisted state value and its dispatcher updater function.
 */
export default function useLocalStorage(key, initialValue) {
  
  // Initialize state value inside a resolver callback to prevent reading localStorage on every render
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Guard for non-browser runtime environments (e.g. SSR)
      if (typeof window === 'undefined') {
        return typeof initialValue === 'function' ? initialValue() : initialValue;
      }
      
      const item = window.localStorage.getItem(key);
      
      // If key is present in storage, parse and load it; otherwise return initial fallback
      if (item !== null) {
        return JSON.parse(item);
      }
      
      return typeof initialValue === 'function' ? initialValue() : initialValue;
    } catch (error) {
      // Catches JSON.parse failures or browser SecurityErrors (e.g. localStorage disabled in Private Windows)
      console.warn(`Error reading localStorage key "${key}":`, error);
      return typeof initialValue === 'function' ? initialValue() : initialValue;
    }
  });

  /**
   * Dispatches value updates. Sets local React state and synchronizes with localStorage simultaneously.
   * Supports standard dispatcher callbacks: `setValue(prev => !prev)`.
   */
  const setValue = useCallback((value) => {
    try {
      setStoredValue((prevValue) => {
        // Resolve value if it is a functional state updater callback
        const valueToStore = typeof value === 'function' ? value(prevValue) : value;
        
        try {
          if (typeof window !== 'undefined') {
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
          }
        } catch (storageError) {
          // Gracefully logs write blockages (quota issues, block permissions)
          console.warn(`Error writing localStorage key "${key}":`, storageError);
        }
        
        return valueToStore;
      });
    } catch (dispatchError) {
      console.warn(`Error executing state update for key "${key}":`, dispatchError);
    }
  }, [key]);

  return [storedValue, setValue];
}
