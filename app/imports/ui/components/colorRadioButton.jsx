import React from 'react';
import Radio from '@mui/material/Radio';

// Style CSS //
const divContainerStyle = {
  display: 'flex',
  justifyContent: 'space-evenly',
  height: 80,
  margin: 5,
};
// End Style //

export default function ColorRadioButtons() {
  const [selectedValue, setSelectedValue] = React.useState('green');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
  });

  return (
    <div style={divContainerStyle}>
      <Radio
        {...controlProps('green')}
        sx={{
          backgroundImage: 'linear-gradient(0deg,#a8e063,#56ab2f)',
          color: 'transparent',
          width: 80,
          '&.Mui-checked': {
            color: 'transparent',
            border: '3px solid black',
          },
        }}
      />
      <Radio
        {...controlProps('yellow')}
        sx={{
          backgroundImage: 'linear-gradient(0deg,#F6FC14,#E6D107)',
          color: 'transparent',
          width: 80,
          '&.Mui-checked': {
            color: 'transparent',
            border: '3px solid black',
          },
        }}
      />
      <Radio
        {...controlProps('red')}
        sx={{
          backgroundImage: 'linear-gradient(0deg,#ff0844,#ebaf35)',
          color: 'transparent',
          width: 80,
          '&.Mui-checked': {
            color: 'transparent',
            border: '3px solid black',
          },
        }}
      />
      <Radio
        {...controlProps('blue')}
        sx={{
          backgroundImage: 'linear-gradient(0deg,#6a11cb,#2575fc)',
          color: 'transparent',
          width: 80,
          '&.Mui-checked': {
            color: 'transparent',
            border: '3px solid black',
          },
        }}
      />
      <Radio
        {...controlProps('purple')}
        sx={{
          backgroundImage: 'linear-gradient(0deg,#C41CDB,#5B13E8)',
          color: 'transparent',
          width: 80,
          '&.Mui-checked': {
            color: 'transparent',
            border: '3px solid black',
          },
        }}
      />
    </div>
  );
}
