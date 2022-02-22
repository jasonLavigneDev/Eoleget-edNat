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

export function generateGradiant(selectedColor) {
  console.log(selectedColor);
  let gradiantColor = [];
  switch (selectedColor) {
    // Light purple
    case '#9c27b0':
      gradiantColor = ['#9c27b0', '#ff536f'];
      break;
    // Deep purple
    case '#673ab7':
      gradiantColor = ['#673ab7', '#ff855d'];
      break;
    // Deep blue
    case '#3f51b5':
      gradiantColor = ['#3f51b5', '#006cc6'];
      break;
    // Water blue
    case '#2196f3':
      gradiantColor = ['#2196f3', '#6483de'];
      break;
    // Light blue
    case '#03a9f4':
      gradiantColor = ['#03a9f4', '#30ebb4'];
      break;
    // Cyan
    case '#00bcd4':
      gradiantColor = ['#00bcd4', '#42deb9'];
      break;
    // Dark green
    case '#009688':
      gradiantColor = ['#009688', '#61c284'];
      break;
    // Green
    case '#4caf50':
      gradiantColor = ['#4caf50', '#00897b'];
      break;
    // Light Green
    case '#8bc34a':
      gradiantColor = ['#8bc34a', '#41b068'];
      break;
    // Light yellow
    case '#cddc39':
      gradiantColor = ['#cddc39', '#adac9a'];
      break;
    // Yellow
    case '#ffeb3b':
      gradiantColor = ['#ffeb3b', '#bdb17a'];
      break;
    // Dark yellow
    case '#ffc107':
      gradiantColor = ['#ffc107', '#97bb30'];
      break;
    // Orange
    case '#ff9800':
      gradiantColor = ['#ff9800', '#ff675b'];
      break;
    // Dark orange
    case '#ff5722':
      gradiantColor = ['#ff5722', '#88503d'];
      break;
    // Red
    case '#f44336':
      gradiantColor = ['#f44336', '#f0a99b'];
      break;
    // Pink
    default:
      gradiantColor = ['#e91e63', '#d14c1c'];
      break;
  }
  return gradiantColor;
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
