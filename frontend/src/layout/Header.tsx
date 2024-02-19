import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar, Box, IconButton, Menu, MenuItem, Stack, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Header = () => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');

    const logOut = () => {
        sessionStorage.removeItem('token');
        localStorage.removeItem('token');
        navigate('/');
    };

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const Profile = () => {
        return (
            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                    </IconButton>
                </Tooltip>
                <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    {settings.map((setting) => {
                        if (setting === 'Logout') {
                            return (
                                <MenuItem key={setting} onClick={() => { handleCloseUserMenu(); logOut(); }}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            );
                        }
                        else {
                            return (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            );
                        }
                    })}
                </Menu>
            </Box>
        );
    }
    return (
        <AppBar position='relative' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: "lightblue" }}>
            <Toolbar>
                <Stack direction={"row"} spacing={2} sx={{ display: 'flex', justifyContent: 'space-between', width: "100%" }}>
                    <Stack direction={"row"}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block', alignSelf: "center" } }}
                        >
                            Othello
                        </Typography>
                    </Stack>
                    <Box sx={{ alignSelf: 'center' }}>
                        {/* <Link to="/">Home</Link> */}
                        {token ? (
                            Profile()
                        ) : (
                            <Box sx={{ alignSelf: 'center' }}>
                                <Link to="/login">Login</Link>
                                <Link to="/signup">Sign Up</Link>
                            </Box>
                        )}
                    </Box>
                </Stack>
            </Toolbar>
        </AppBar>
    );
};

export default Header;