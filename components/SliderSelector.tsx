import { Slider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { SyntheticEvent } from 'react';
import { useSharedContext } from '../context/SharedContext';
import { useAppSelector } from '../store';

const SliderSelector: React.FC = () => {
  const { filterQuery } = useSharedContext();
  const [minMax, setMinMax] = React.useState<number[]>([0, 0]);
  const {
    display: { minMaxPrice },
  } = useAppSelector((store) => store);
  const [value, setValue] = React.useState<number[]>(minMaxPrice);

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
    setValue(newValue as number[]);
    //TODO need to throttle this, or steal form rozetka:DD
    filterQuery('minPrice', newValue[0]);
    filterQuery('maxPrice', newValue[1]);
  };

  const sliderValueText = () => {
    return `Price range: $ ${value[0]} to $ ${value[1]}`;
  };

  React.useEffect(() => {
    setMinMax(minMaxPrice);
    setValue(minMaxPrice);
  }, [minMaxPrice]);

  return (
    <>
      <Typography>
        Range: $ {value[0]} - $ {value[1]}
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
