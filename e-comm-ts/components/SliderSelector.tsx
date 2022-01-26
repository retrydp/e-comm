import { Slider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
interface SliderProps {
  getSliderValues: (values: number[]) => void;
}

export const SliderSelector: React.FC<SliderProps> = ({ getSliderValues }) => {
  const [sliderValue, setSliderValue] = React.useState<number[]>([0, 331]);
  const sliderHandleChange = (event: Event, newValue: number | number[]) => {
    setSliderValue(newValue as number[]);
  };

  const sliderValueText = () => {
    return `Price range: $ ${sliderValue[0]} to $ ${sliderValue[1]}`;
  };

  return (
    <>
      <Typography>
        Ranger: $ {sliderValue[0]} - $ {sliderValue[1]}
      </Typography>
      <Box sx={{ width: '100%' }}>
        <Slider
          min={0}
          max={331}
          step={10}
          getAriaLabel={(idx: number) =>
            Boolean(idx) ? 'Maximum price' : 'Minimum price'
          }
          value={sliderValue}
          onChange={sliderHandleChange}
          //TODO API request according to folowing methods to prevent unnecessary calls
          onMouseUp={() => getSliderValues(sliderValue)}
          onTouchEnd={() => getSliderValues(sliderValue)}
          valueLabelDisplay="off"
          getAriaValueText={sliderValueText}
        />
      </Box>
    </>
  );
};
