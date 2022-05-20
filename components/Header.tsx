import {
  Button,
  Toolbar,
  Box,
  Tooltip,
  Menu,
  MenuItem,
  NoSsr,
  Link,
  Avatar,
  Badge,
} from '@mui/material';
import {
  ShoppingCartOutlined,
  FavoriteBorder,
  Menu as MenuIcon,
} from '@mui/icons-material';
import React from 'react';
import styles from '../utils/styles';
import NextLink from 'next/link';
import { useAppSelector, useAppDispatch } from '../store';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { userLogout } from '../store/authStore';
import { useSharedContext } from '../context/SharedContext';

const Header: React.FC = () => {
  const { userInfo } = useSharedContext();
  const [totalProducts, setTotalProducts] = React.useState<number>(0);
  const {
    cart: { cartProducts },
  } = useAppSelector((store) => store);
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const logoutClickHandler = () => {
    setAnchorEl(null);
    Cookies.remove('userInfo');
    dispatch(userLogout());
    router.push('/');
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const totalProductsInCartHandler = () => {
    return cartProducts.reduce((prev, { count }) => prev + count, 0);
  };

  const totalProductsInCart = totalProductsInCartHandler();

  React.useEffect(() => {
    setTotalProducts(totalProductsInCart);
  }, [totalProductsInCart]);

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
          <NextLink href="/favorites" passHref>
            <Tooltip title="Favorites" arrow>
              <Button component="a" sx={styles.navLink} aria-label="Favorites">
                <FavoriteBorder />
              </Button>
            </Tooltip>
          </NextLink>
          <NextLink href="/cart" passHref>
            <Tooltip title="Cart" arrow>
              <Button component="a" sx={styles.navLink} aria-label="User Cart">
                <NoSsr>
                  <Badge badgeContent={totalProducts} color="primary">
                    <ShoppingCartOutlined />
                  </Badge>
                </NoSsr>
              </Button>
            </Tooltip>
          </NextLink>
          {userInfo ? (
            <NoSsr>
              <Tooltip title={userInfo.email} arrow>
                <Button
                  sx={styles.navLink}
                  id="user-menu-button"
                  aria-controls={open ? 'user-menu-button' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleMenuClick}
                  aria-label="user menu"
                >
                  <Avatar sx={{ bgcolor: '#BCDDFE' }}>
                    {userInfo.name[0]}
                  </Avatar>
                </Button>
              </Tooltip>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
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
                <Tooltip title="Log In" arrow>
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
