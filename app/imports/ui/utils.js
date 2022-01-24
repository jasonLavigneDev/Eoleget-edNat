import { useLocation } from 'react-router-dom';
import { useState } from 'react';

export function debounce(func, wait) {
  // let timeout;
  const [timeout, settimeout] = useState(null);
  return (...args) => {
    const later = () => {
      settimeout(null);
      func(...args);
    };
    clearTimeout(timeout);
    settimeout(setTimeout(later, wait));
  };
}

const useQuery = () => {
  const searchParams = new URLSearchParams(useLocation().search);
  const params = {};

  /* eslint-disable-next-line no-restricted-syntax */
  for (const p of searchParams) {
    const [key, value] = p;
    params[key] = value;
  }
  return params;
};

export default useQuery;
