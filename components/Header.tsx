import {
  Button,
  Toolbar,
  Typography,
  Box,
  Tooltip,
  Menu,
  MenuItem,
  NoSsr,
} from '@mui/material';
import {
  ShoppingCartOutlined,
  PermIdentityOutlined,
  Search,
  Menu as MenuIcon,
} from '@mui/icons-material';
import useMediaQuery from '@mui/material/useMediaQuery';
import React from 'react';
import styles from '../utils/styles';
import NextLink from 'next/link';
import { useAppSelector, useAppDispatch } from '../store';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { userLogout } from '../store/authStore';

const Header: React.FC = () => {
  const sm = useMediaQuery('(min-width:600px)');
  const {
    authStore: { userInfo },
  } = useAppSelector((store) => store);
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const router = useRouter();

  const logoutClickHandler = () => {
    setAnchorEl(null);
    Cookies.remove('userInfo');
    dispatch(userLogout());
    router.push('/');
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <NextLink href="/" passHref>
          <Tooltip title="Menu" arrow>
            <Button component="a" sx={styles.navLink} aria-label="Menu">
              <MenuIcon />
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

          {userInfo ? (
            <NoSsr>
              <Button
                id="user-menu-button"
                aria-controls={open ? 'user-menu-button' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleMenuClick}
              >
                <PermIdentityOutlined />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                <MenuItem onClick={handleMenuClose}>My account</MenuItem>
                <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
              </Menu>
            </NoSsr>
          ) : (
            <NoSsr>
              <NextLink href="/login" passHref>
                <Tooltip title="Profile" arrow>
                  <Button component="a" aria-label="User Profile">
                    Log In
                  </Button>
                </Tooltip>
              </NextLink>
            </NoSsr>
          )}
        </Box>
      </Toolbar>
    </>
  );
};

export default Header;
