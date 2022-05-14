import { Slider, Typography } from '@mui/material';import { Box } from '@mui/system';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { setSliderValue } from '../store/displayInterface';

const SliderSelector: React.FC = () => {
  const [minMax, setMinMax] = React.useState([0, 0]);
  const dispatch = useAppDispatch();
  const {
    display: { sliderValue, minMaxPrice },
  } = useAppSelector((store) => store);

  /**
   * @description Change the slider value.
   * @param newValue
   */
  const sliderHandleChange = (event: Event, newValue: number | number[]) => {
    dispatch(setSliderValue(newValue as number[]));
  };

  const sliderValueText = () => {
    return `Price range: $ ${sliderValue[0]} to $ ${sliderValue[1]}`;
  };
  React.useEffect(() => {
    setMinMax(minMaxPrice);
  }, [minMaxPrice]);

  return (
    <>
      <Typography>
        Range: $ {sliderValue[0]} - $ {sliderValue[1]}
      </Typography>
      <Box sx={{ width: '100%' }}>
        <Slider
          min={minMax[0]}
          max={minMax[1]}
          step={2}
          getAriaLabel={(idx: number) =>
            idx ? 'Maximum price' : 'Minimum price'
          }
          value={sliderValue}
          onChange={sliderHandleChange}
          valueLabelDisplay="off"
          getAriaValueText={sliderValueText}
        />
      </Box>
    </>
  );
};
export default SliderSelector;
