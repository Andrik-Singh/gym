'use client'; 
export function storeSessionStorage(key: string, value: unknown): boolean {
  if (typeof window === 'undefined') {
    console.warn(`sessionStorage is not available in this environment`);
    return false;
  }
  try {
    if (value === undefined || value === null) {
      console.warn(`Cannot store ${value} in sessionStorage`);
      return false;
    }
    const serializedValue = JSON.stringify(value);
    window.sessionStorage.setItem(key, serializedValue);
    console.log(`Data stored in sessionStorage under key: ${key}`);
    return true;
  } catch (error) {
    console.error(`Error storing data in sessionStorage for key ${key}:`, error);
    return false;
  }
}
export function getSessionStorage<T = unknown>(key: string): T | null {
  if (typeof window === 'undefined') {
    console.warn(`sessionStorage is not available in this environment`);
    return null;
  }
  try {
    const serializedValue = window.sessionStorage.getItem(key);
    if (serializedValue === null) {
      console.warn(`No data found in sessionStorage for key: ${key}`);
      return null;
    }
    const value = JSON.parse(serializedValue) as T;
    return value;
  } catch (error) {
    console.error(`Error retrieving data from sessionStorage for key ${key}:`, error);
    return null;
  }
}
export function clearSessionStorage(key: string): boolean {
  if (typeof window === 'undefined') {
    console.warn(`sessionStorage is not available in this environment`);
    return false;
  }
  try {
    window.sessionStorage.removeItem(key);
    console.log(`Data cleared from sessionStorage for key: ${key}`);
    return true;
  } catch (error) {
    console.error(`Error clearing data from sessionStorage for key ${key}:`, error);
    return false;
  }
}