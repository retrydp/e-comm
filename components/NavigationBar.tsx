import {  AppBar,
  Box,
  Link,
  Toolbar,
  Typography,
  Tabs,
  Tab,
} from '@mui/material';
import React from 'react';
import Image from 'next/image';
import NextLink from 'next/link';
import styles from '../utils/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { SxProps } from '@mui/material/styles';

export type NavTitles = 'home' | 'bags' | 'sneakers' | 'belts' | 'contacts';
type NavPaths =
  | '/'
  | '/loading?category=bags'
  | '/loading?category=sneakers'
  | '/loading?category=belts'
  | '/contacts';

interface NavItems {
  title: NavTitles;
  path: NavPaths;
}

interface NavigationBarProps {
  currentTab: NavTitles;
}

interface LinkTabProps {
  label?: string;
  href?: string;
  sx?: SxProps;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ currentTab }) => {
  const menuItems: NavItems[] = [
    { title: 'home', path: '/' },
    { title: 'bags', path: '/loading?category=bags' },
    { title: 'sneakers', path: '/loading?category=sneakers' },
    { title: 'belts', path: '/loading?category=belts' },
    { title: 'contacts', path: '/contacts' },
  ];
  const sm = useMediaQuery('(min-width:600px)');

  const LinkTab = (props: LinkTabProps) => {
    return (
      <NextLink href={props.href || '/'} passHref>
        <Tab component="a" {...props} />
      </NextLink>
    );
  };

  return (
    <AppBar position="static" sx={styles.appBar}>
      <Toolbar sx={styles.toolBar}>
        <NextLink href="/" passHref>
          <Link sx={styles.plainAnchor} aria-label="Site logo">
            <Box sx={styles.navLogo}>
              <Image
                width={44}
                height={44}
                src="https://res.cloudinary.com/retrydp/image/upload/v1651478617/xmqphhxdjbtivv8o3lrm.svg"
                alt="Site logo"
              ></Image>
              {sm && <Typography sx={styles.logoText}>E-comm</Typography>}
            </Box>
          </Link>
        </NextLink>
        <Box sx={styles.grow}></Box>
        <Box sx={styles.navContainer}>
          <Tabs
            value={menuItems.findIndex(({ title }) => title === currentTab)}
            aria-label="navigation links"
            variant="scrollable"
            sx={{
              '& .MuiTabs-indicator': {
                display: 'none',
              },
            }}
          >
            {menuItems.map(({ title, path }) => (
              <LinkTab
                label={title}
                key={title}
                href={path}
                sx={
                  title === currentTab
                    ? {
                        ...styles.tabLink,
                        ...styles.activeTabLink,
                      }
                    : styles.tabLink
                }
              />
            ))}
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
