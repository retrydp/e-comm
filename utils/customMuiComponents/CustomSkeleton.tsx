import React from 'react';
import {
  DefaultComponentProps,
  OverridableTypeMap,
} from '@mui/material/OverridableComponent';
import { Skeleton } from '@mui/material';

const CustomSkeleton: React.FC = (
  props: DefaultComponentProps<OverridableTypeMap>
) => {
  return <Skeleton {...props} sx={{ borderRadius: '5px' }} animation="wave" />;
};

export default CustomSkeleton;
