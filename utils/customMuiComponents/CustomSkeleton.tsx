import React from 'react';
import {
  DefaultComponentProps,
  OverridableTypeMap,
} from '@mui/material/OverridableComponent';
import { Skeleton } from '@mui/material';
import styles from 'utils/styles';

interface AddedProps {
  variant: 'text' | 'rectangular' | 'circular' | undefined;
  height: number;
}

type InnerProps = AddedProps &
  Omit<DefaultComponentProps<OverridableTypeMap>, keyof AddedProps>;

const CustomSkeleton: React.FC<InnerProps> = (props) => {
  return <Skeleton {...props} sx={styles.skeletonCustom} animation="wave" />;
};

export default CustomSkeleton;
