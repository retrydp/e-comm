import { Button, Toolbar, Typography, Box, Tooltip } from '@mui/material';
import {
  ShoppingCartOutlined,
  PermIdentityOutlined,
  Search,
  Menu,
} from '@mui/icons-material';
import useMediaQuery from '@mui/material/useMediaQuery';
import React from 'react';
import styles from '../utils/styles';
import NextLink from 'next/link';

const Header: React.FC = () => {
  const sm = useMediaQuery('(min-width:600px)');

  return (
    <>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <NextLink href="/" passHref>
          <Tooltip title="Menu" arrow>
            <Button component="a" sx={styles.navLink} aria-label="Menu">
              <Menu />
            </Button>
          </Tooltip>
        </NextLink>
        <Box sx={styles.grow}></Box>
        <Box sx={styles.userActions}>
          <NextLink href="/" passHref>
            <Tooltip title="Search" arrow>
              <Button component="a" sx={styles.navLink} aria-label="Search">
                <Search />
              </Button>
            </Tooltip>
          </NextLink>
          <NextLink href="/" passHref>
            <Tooltip title="Cart" arrow>
              <Button component="a" sx={styles.navLink} aria-label="User Cart">
                <ShoppingCartOutlined />
              </Button>
            </Tooltip>
          </NextLink>

          {sm && (
            <Tooltip title="Total price" arrow>
              <Typography sx={styles.navPrice}>{`$${'0.00'}`}</Typography>
            </Tooltip>
          )}

          <NextLink href="/" passHref>
            <Tooltip title="Profile" arrow>
              <Button
                component="a"
                sx={styles.navLink}
                aria-label="User Profile"
              >
                <PermIdentityOutlined />
              </Button>
            </Tooltip>
          </NextLink>
        </Box>
      </Toolbar>
    </>
  );
};

export default Header;
