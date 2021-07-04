import React from 'react';

import styled from 'styled-components';
import { NavLink } from 'react-router-dom'

import { makeStyles, useTheme, Theme, createStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';

import {
  Home as HomeIcon,
  Filter2 as Filter2Icon,
  SupervisorAccount as SupervisorAccountIcon,
  ContactSupport as ContactSupportIcon
} from '@material-ui/icons';

const drawerWidth = '13.5rem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
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
        width: drawerWidth,
        marginTop: '66px',
        zIndex: 1
      },
    },
  },
});

function PersistentDrawerLeft(props: any) {
  const { isOpen, className } = props;
  const menuItems = [
    {
      key: 1,
      icon: <HomeIcon />,
      text: 'Home',
      link: '/home',
    },
    {
      key: 2,
      icon: <Filter2Icon />,
      text: 'Check Duplicate',
      link: '/check-duplicate',
    },
    {
      key: 3,
      icon: <ContactSupportIcon />,
      text: 'Self-generate Question',
      link: '/self-generate',
    },
    {
      key: 4,
      icon: <SupervisorAccountIcon />,
      text: 'Manage Staffs',
      link: '/admin/manage-staffs',
    },
    {
      key: 5,
      text: '🔨 Create Exam',
      link: '/create-exam',
    },
    {
      key: 6,
      text: '📝 Update Exam',
      link: '/update-exam',
    },
  ]

  return (
    <ThemeProvider theme={customTheme}>
      <Drawer
        className={className}
        variant="persistent"
        anchor="left"
        open={isOpen}
      >
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.key}>
              <NavLink to={item.link} activeClassName="active-li">
                {item.icon}
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
  width: ${drawerWidth};
  margin-top: 77px;
  border-top: 0;
  .active-li {
    background: #cdcdcd;
    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, rgb(234,234,234)), color-stop(1, rgb(177,177,177)));
    font-weight: bold;
    border-radius: 5px;
  }
  li {
    height: 70px;
    line-height: 70px;
    padding: 0;
    font-size: 0.9rem;
    a {
      width: 100%;
      height: 100%;
      padding: 0 10px;
      text-decoration: none;
      display: flex;
      align-items: center;
      svg {
        margin-right: 0.8rem;
      }
    }
  }
  li:hover {
    background-color: #f5f5f5;
    border-radius: 5px;
  }
`
