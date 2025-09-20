import { useState, useEffect } from "react";

export function useLocalStorage(
  key: string,
  defaultValue: string | null = null,
) {
  const [value, setValue] = useState<string | null>(defaultValue);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const item = localStorage.getItem(key);
      setValue(item);
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
    } finally {
      setIsLoading(false);
    }
  }, [key]);

  const setStoredValue = (newValue: string | null) => {
    try {
      setValue(newValue);
      if (newValue === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, newValue);
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [value, setStoredValue, isLoading] as const;
}
