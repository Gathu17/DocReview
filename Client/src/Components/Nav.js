import * as React from 'react';
import {AppBar,Box,Divider,Drawer,IconButton,List,ListItem,ListItemButton,} from '@mui/material/';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useSelector,useDispatch} from 'react-redux';
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router'
import {logout} from '../Redux/userRedux'
import { QueryCache } from "react-query";

const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const name =  useSelector((state)=> state.user.user?.user?.username)
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  function Logout(){
    localStorage.removeItem('jwtToken')
    const queryCache = new QueryCache()
    queryCache.clear();
     dispatch(logout())
     navigate('/login')
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        {name}
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );


  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav" sx={{background: '#00a212'}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            {name}
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          {name ?  <span onClick={Logout} style={{ color:"white", fontSize:"1.6rem", marginLeft:"2em",cursor:"pointer" }}>Logout</span>
                : <Link style={{textDecoration: "none", color:"white", fontSize:"1.6rem" }} to="/login">Login</Link>
          } 
          </Box>
          
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" >
        <Toolbar />
        <Typography>
        </Typography>
      </Box>
    </Box>
  );
}
