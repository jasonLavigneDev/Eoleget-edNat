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

export function generateJSONFile(apps, fileName) {
  const initialStr = `{"$schema":"https://aka.ms/winget-packages.schema.1.0.json",
  "WinGetVersion":"0.3.11201",
  "Sources":`;
  let str = '';
  let finalString = '';
  apps.map((app) => {
    let c = '';
    if (app.version === '') c = `{"Id": ${app.identification}}`;
    else c = `{"Id": ${app.identification},Version: ${app.version}}`;
    if (str !== '') str += `,${c}`;
    else str += `[${c}`;

    str += ']';
    return str;
  });

  finalString = initialStr + str;
  return finalString;
}
