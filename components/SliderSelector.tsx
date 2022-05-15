import { Slider, Typography } from '@mui/material';import { Box } from '@mui/system';
import React, { SyntheticEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { setSliderValue } from '../store/displayInterface';

const SliderSelector: React.FC = () => {
  const [minMax, setMinMax] = React.useState<number[]>([0, 0]);
  const dispatch = useAppDispatch();
  const {
    display: { sliderValue, minMaxPrice },
  } = useAppSelector((store) => store);
  const [value, setValue] = React.useState<number[]>(sliderValue);

  /**
   * @description Change the slider value.
   * @param newValue
   */
  const sliderHandleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };
  const commitedChangeHandler = (
    event: Event | SyntheticEvent<Element, Event>,
    newValue: number | number[]
  ) => {
    dispatch(setSliderValue(newValue as number[]));
  };
  const sliderValueText = () => {
    return `Price range: $ ${sliderValue[0]} to $ ${sliderValue[1]}`;
  };
  React.useEffect(() => {
    setMinMax(minMaxPrice);
    setValue(minMaxPrice);
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
          value={value}
          onChange={sliderHandleChange}
          onChangeCommitted={commitedChangeHandler}
          valueLabelDisplay="off"
          getAriaValueText={sliderValueText}
        />
      </Box>
    </>
  );
};
export default SliderSelector;
