import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import React from 'react';
import {
  ShoppingCart,
  People,
  Dashboard,
  ArrowBack,
} from '@mui/icons-material';
import styles from '../utils/styles';
import NextLink from 'next/link';

const menuItemsSettings = [
  { title: 'dashboard', icon: <Dashboard /> },
  { title: 'products', icon: <ShoppingCart /> },
  { title: 'users', icon: <People /> },
] as const;

interface AdminSidebarProps {
  activeTab: typeof menuItemsSettings[number]['title'];
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeTab }) => {
  return (
    <Grid item sx={styles.adminSidebar} xl={2} lg={2} md={3} sm={12} xs={12}>
      <List sx={styles.fullWidth} disablePadding>
        <ListItem>
          <ListItemIcon>
            <Image
              src="https://res.cloudinary.com/retrydp/image/upload/v1651478617/xmqphhxdjbtivv8o3lrm.svg"
              width={45}
              height={45}
            />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography sx={styles.mediumFontSize}>
                E-comm Dashboard
              </Typography>
            }
            sx={styles.capitalize}
          />
        </ListItem>
        <Divider />
        {menuItemsSettings.map(({ title, icon }) => (
          <ListItem
            key={title}
            selected={activeTab === title}
            disablePadding
            divider
          >
            <NextLink href={`/admin/${title}`} passHref>
              <ListItemButton component="a">
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={title} sx={styles.capitalize} />
              </ListItemButton>
            </NextLink>
          </ListItem>
        ))}
        <ListItem disablePadding divider>
          <NextLink href="/" passHref>
            <ListItemButton component="a">
              <ListItemIcon>
                <ArrowBack />
              </ListItemIcon>
              <ListItemText
                primary={<Typography>Home</Typography>}
                sx={styles.capitalize}
              />
            </ListItemButton>
          </NextLink>
        </ListItem>
      </List>
    </Grid>
  );
};

export default AdminSidebar;
