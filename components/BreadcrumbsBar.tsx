import { Breadcrumbs, Button, Typography } from '@mui/material';
import React from 'react';
import { withRouter, useRouter } from 'next/router';
import NextLink from 'next/link';
import { Home } from '@mui/icons-material';
import { useAppSelector } from '../store';
import styles from '../utils/styles';

const BreadcrumbsBar: React.FC = () => {
  const router = useRouter();
  const { category, slug } = router.query;
  const {
    display: { currentProduct },
  } = useAppSelector((store) => store);

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={styles.defaultP}>
      <NextLink href="/" passHref>
        <Button color="primary" sx={styles.breadcrumbHomeButton}>
          <Home fontSize="inherit" />
        </Button>
      </NextLink>
      {category && (
        // FIXME: incorrect display in contacts
        <NextLink href={`/loading?category=${category}`} passHref>
          <Button color="primary" sx={styles.breadcrumbsButton}>
            {category}
          </Button>
        </NextLink>
      )}
      {currentProduct && slug && (
        <Typography sx={styles.breadcrumbsText}>{currentProduct}</Typography>
      )}
    </Breadcrumbs>
  );
};

export default withRouter(BreadcrumbsBar);
