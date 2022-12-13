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
  AppBar,
  Slide,
  useScrollTrigger,
} from '@mui/material';
import {
  ShoppingCartOutlined,
  FavoriteBorder,
  Menu as MenuIcon,
} from '@mui/icons-material';
import React from 'react';
import styles from '../utils/styles';
import NextLink from 'next/link';
import { useAppSelector } from '../store';
import { signOut, useSession } from 'next-auth/react';

import { useRouter } from 'next/router';

interface HeaderProps {
  window?: () => Window;
  children: React.ReactElement;
}

function HideOnScroll(props: HeaderProps) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Header: React.FC = (props) => {
  const [totalProducts, setTotalProducts] = React.useState<number>(0);
  const {
    cart: { cartProducts },
  } = useAppSelector((store) => store);
  const { data } = useSession();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const logoutClickHandler = async () => {
    setAnchorEl(null);
    await signOut({ redirect: false }).then(() => {
      router.push('/');
    });
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
      <HideOnScroll {...props}>
        <AppBar position="fixed" sx={styles.headerBar}>
          <Toolbar>
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
                  <Button
                    component="a"
                    sx={styles.navLink}
                    aria-label="Favorites"
                  >
                    <FavoriteBorder />
                  </Button>
                </Tooltip>
              </NextLink>
              <NextLink href="/cart" passHref>
                <Tooltip title="Cart" arrow>
                  <Button
                    component="a"
                    sx={styles.navLink}
                    aria-label="User Cart"
                  >
                    <NoSsr>
                      <Badge badgeContent={totalProducts} color="primary">
                        <ShoppingCartOutlined />
                      </Badge>
                    </NoSsr>
                  </Button>
                </Tooltip>
              </NextLink>
              {data ? (
                <NoSsr>
                  <Tooltip title={data.user.email} arrow>
                    <Button
                      sx={styles.navLink}
                      id="user-menu-button"
                      aria-controls={open ? 'user-menu-button' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      onClick={handleMenuClick}
                      aria-label="user menu"
                    >
                      <Avatar sx={styles.neutralBg}>{data.user.name[0]}</Avatar>
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
                        <Link sx={styles.headerLink}>Profile</Link>
                      </NextLink>
                    </MenuItem>
                    {data.user?.isAdmin && (
                      <MenuItem onClick={handleMenuClose}>
                        <NextLink href="/admin/dashboard" passHref>
                          <Link sx={styles.headerLink}>Admin Dashboard</Link>
                        </NextLink>
                      </MenuItem>
                    )}
                    <MenuItem onClick={logoutClickHandler}>
                      <Link
                        component="button"
                        aria-label="Log out"
                        sx={styles.headerLogoutButton}
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
                      <Button
                        component="a"
                        aria-label="Log in"
                        variant="contained"
                      >
                        Log In
                      </Button>
                    </Tooltip>
                  </NextLink>
                </NoSsr>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </>
  );
};

export default Header;
