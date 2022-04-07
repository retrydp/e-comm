import {
  Button,
  Toolbar,
  Typography,
  Box,
  Tooltip,
  Menu,
  MenuItem,
  NoSsr,
  Link,
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

  const handleMenuClose = (event: React.MouseEvent<HTMLLIElement>) => {
    setAnchorEl(null);
  };

  return (
    <>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <NextLink href="/" passHref>
          <Tooltip title="Menu" followCursor>
            <Button component="a" sx={styles.navLink} aria-label="Menu">
              <MenuIcon />
            </Button>
          </Tooltip>
        </NextLink>
        <Box sx={styles.grow}></Box>
        <Box sx={styles.userActions}>
          <NextLink href="/" passHref>
            <Tooltip title="Search" followCursor>
              <Button component="a" sx={styles.navLink} aria-label="Search">
                <Search />
              </Button>
            </Tooltip>
          </NextLink>
          <NextLink href="/" passHref>
            <Tooltip title="Cart" followCursor>
              <Button component="a" sx={styles.navLink} aria-label="User Cart">
                <ShoppingCartOutlined />
              </Button>
            </Tooltip>
          </NextLink>

          {sm && (
            <Tooltip title="Total price" followCursor>
              <Typography sx={styles.navPrice}>{`$${'0.00'}`}</Typography>
            </Tooltip>
          )}

          {userInfo ? (
            <NoSsr>
              <Tooltip title={userInfo.email} followCursor>
                <Button
                  sx={styles.navLink}
                  id="user-menu-button"
                  aria-controls={open ? 'user-menu-button' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleMenuClick}
                  aria-label="user menu"
                >
                  <PermIdentityOutlined />
                </Button>
              </Tooltip>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                disableScrollLock={true}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={handleMenuClose}>
                  <NextLink href="/profile" passHref>
                    <Link sx={{ textDecoration: 'none', color: 'black' }}>
                      Profile
                    </Link>
                  </NextLink>
                </MenuItem>
                {userInfo?.isAdmin && (
                  <MenuItem onClick={handleMenuClose}>
                    <NextLink href="/admin/dashboard" passHref>
                      <Link sx={{ textDecoration: 'none', color: 'black' }}>
                        Admin Dashboard
                      </Link>
                    </NextLink>
                  </MenuItem>
                )}

                <MenuItem onClick={logoutClickHandler}>
                  <Link
                    component="button"
                    aria-label="Log out"
                    sx={{
                      textDecoration: 'none',
                      color: 'black',
                      fontSize: '1rem',
                      padding: '2px 0',
                    }}
                  >
                    Log out
                  </Link>
                </MenuItem>
              </Menu>
            </NoSsr>
          ) : (
            <NoSsr>
              <NextLink href="/login" passHref>
                <Tooltip title="Log In" followCursor>
                  <Button component="a" aria-label="Log in" variant="contained">
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
