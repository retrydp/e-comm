import React from 'react';
import { Pagination as MuiPagination, Stack } from '@mui/material';
import { useSharedContext } from '../context/SharedContext';
import { useAppSelector } from '../store';
import { withRouter, useRouter } from 'next/router';
import commonConst from '../constants/common';

const Pagination: React.FC = () => {
  const {
    display: { productsQuantity },
  } = useAppSelector((store) => store);
  const { filterQuery } = useSharedContext();
  const router = useRouter();

  const pageChangeHandler = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPage(page);
    filterQuery({ page: page.toString() });
  };
  const [pagesCount, setPagesCount] = React.useState<number>();
  const [page, setPage] = React.useState<number>(1);
  const { page: queryPage, quantity } = router.query;

  const pagesCountHandler = () => {
    const pages = Math.ceil(
      productsQuantity /
        parseInt((quantity as string) || commonConst.DEFAULT_LIMIT)
    );
    const parsedPage = parseInt(queryPage as string);
    setPagesCount(pages);

    if (isNaN(parsedPage) || parsedPage < 0 || parsedPage > pages) {
      setPage(1);

      return;
    }

    setPage(parsedPage);
  };

  React.useEffect(() => {
    pagesCountHandler();
  }, [productsQuantity, quantity]);

  return (
    <Stack spacing={2}>
      <MuiPagination
        page={page}
        count={pagesCount}
        color="primary"
        variant="outlined"
        shape="rounded"
        onChange={pageChangeHandler}
        sx={{ m: '0, auto', p: '24px' }}
      />
    </Stack>
  );
};

export default withRouter(Pagination);
