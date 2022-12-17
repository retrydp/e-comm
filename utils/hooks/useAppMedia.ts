import { useMediaQuery } from '@mui/material';

const useAppMedia = () => {
  const smMin = useMediaQuery('(min-width:600px)');
  const smList = useMediaQuery('(max-width:670px)');
  const mdMin = useMediaQuery('(min-width:900px)');
  const mdMax = useMediaQuery('(max-width:900px)');

  return { smMin, smList, mdMin, mdMax };
};

export default useAppMedia;
