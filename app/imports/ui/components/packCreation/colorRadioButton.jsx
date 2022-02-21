import React from 'react';
import { Button } from '@mui/material';

// Style CSS //
const divContainerStyle = {
  display: 'flex',
  justifyContent: 'space-evenly',
  height: 80,
  margin: 5,
};
// End Style //

function ColorRadioButtons(packColor) {
  const currentColor = packColor;
  const [selectedValue, setSelectedValue] = React.useState(currentColor.packColor ? currentColor.packColor : '#e91e63');

  const colors = [
    '#e91e63',
    '#9c27b0',
    '#673ab7',
    '#3f51b5',
    '#2196f3',
    '#03a9f4',
    '#00bcd4',
    '#009688',
    '#4caf50',
    '#8bc34a',
    '#cddc39',
    '#ffeb3b',
    '#ffc107',
    '#ff9800',
    '#ff5722',
    '#f44336',
  ];

  const handleClick = (color) => {
    if (selectedValue !== '') document.getElementById(selectedValue).style.border = 'none';
    setSelectedValue(color);
    localStorage.setItem('color', JSON.stringify(color));
    document.getElementById(color).style.border = '2px solid black';
  };

  return (
    <div style={divContainerStyle}>
      {colors.map((color) => (
        <Button
          key={color}
          id={color}
          sx={{
            backgroundColor: color,
            '&:hover': { backgroundColor: color },
            border: selectedValue === color ? '2px solid black' : 'none',
          }}
          onClick={() => handleClick(color)}
        />
      ))}
    </div>
  );
}

export default ColorRadioButtons;
