import React from 'react';

import styled from 'styled-components';
import { NavLink } from 'react-router-dom'

import { makeStyles, useTheme, Theme, createStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';


const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    hide: {
      display: 'none',
    },
    drawer: {
      width: '240px',
      flexShrink: 0,
    },
  })
);

const customTheme = createMuiTheme({
  overrides: {
    // Style sheet name ⚛️
    MuiDrawer: {
      // Name of the rule
      paper: {
        // Some CSS
        width: '240px',
        marginTop: '66px'
      },
    },
  },
});

function PersistentDrawerLeft(props: any) {
  const { isOpen, className } = props;
  const menuItems = [
    {
      key: 1,
      text: '🏡  Home',
      link: '/home',
    },
    {
      key: 2,
      text: '🍣  Check Duplicate',
      link: '/check-duplicate',
    },
    {
      key: 3,
      text: '🎰  Self-generate Question',
      link: '/self-generate',
    },
    {
      key: 4,
      text: '⛑  Manage Staffs',
      link: '/admin/manage-staffs',
    },
  ]

  return (
    <ThemeProvider theme={customTheme}>
      <Drawer
        className={className}
        variant="persistent"
        anchor="left"
        open={true}
      >
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.key}>
              <NavLink to={item.link} activeClassName="active-li">
                {item.text}
              </NavLink>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
  
    </ThemeProvider>

  );
}

export default styled(PersistentDrawerLeft) `
  width: 240px;
  margin-top: 77px;
  border-top: 0;
  .active-li {
    background: lightgray;
    font-weight: bold;
  }
  li {
    height: 70px;
    line-height: 70px;
    padding: 0;
    font-size: large;
    a {
      width: 100%;
      height: 100%;
      padding: 0 10px;
      text-decoration: none;
    }
  }
`
