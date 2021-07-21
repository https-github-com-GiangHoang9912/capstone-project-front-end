import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

import {
  makeStyles,
  Theme,
  createStyles,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles'

import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'

import {
  Home as HomeIcon,
  Filter2 as Filter2Icon,
  SupervisorAccount as SupervisorAccountIcon,
  ContactSupport as ContactSupportIcon,
  NoteAdd as NoteAddIcon,
  Build as BuildIcon,
} from '@material-ui/icons'

const drawerWidth = '15rem'

makeStyles((theme: Theme) =>
  createStyles({
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
  })
)

const customTheme = createMuiTheme({
  overrides: {
    // Style sheet name ⚛️
    MuiDrawer: {
      // Name of the rule
      paper: {
        // Some CSS
        width: drawerWidth,
        marginTop: '73px',
        zIndex: 1,
        backgroundColor: '#1f2937',
        color: '#c5c5c5',
        padding: '0 0.5rem',
      },
    },
  },
})

function PersistentDrawerLeft(props: any) {
  const { isOpen, className } = props
  const menuItems = [
    {
      key: 1,
      icon: <HomeIcon fontSize="small" />,
      text: 'Home',
      link: '/home',
    },
    {
      key: 2,
      icon: <Filter2Icon fontSize="small" />,
      text: 'Check Duplicate',
      link: '/check-duplicate',
    },
    {
      key: 3,
      icon: <ContactSupportIcon fontSize="small" />,
      text: 'Self-generate Question',
      link: '/self-generate',
    },
    {
      key: 4,
      icon: <SupervisorAccountIcon fontSize="small" />,
      text: 'Manage Staffs',
      link: '/manage-staffs',
    },
    {
      key: 5,
      icon: <NoteAddIcon fontSize='small' />,
      text: 'Manage Exam',
      link: '/exam',
    }
  ]

  return (
    <ThemeProvider theme={customTheme}>
      <Drawer
        className={className}
        variant="persistent"
        anchor="left"
        transitionDuration={500}
        open={isOpen}
      >
        <List>
          {menuItems.map((item) => {
            const role = Number(localStorage.getItem('role') ? localStorage.getItem('role') : 3)

            // if (item.key === 4 && role !== 1) return ""

            return (
              <ListItem key={item.key}>
                <NavLink to={item.link} activeClassName="active-li">
                  {item.icon}
                  {item.text}
                </NavLink>
              </ListItem>
            )
          })}
        </List>
        <Divider />
      </Drawer>
    </ThemeProvider>
  )
}

export default styled(PersistentDrawerLeft)`
  width: ${drawerWidth};
  margin-top: 77px;
  border-top: 0;
  .active-li {
    background: #374151;
    font-weight: bold;
    color: #f2f4f6;
    border-radius: 10px;
  }
  li {
    height: 50px;
    padding: 0;
    margin: 10px 0;
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
    background-color: #374151;
    border-radius: 10px;
  }
`
