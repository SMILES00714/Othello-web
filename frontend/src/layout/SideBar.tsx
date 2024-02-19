import { Box, ListItemButton, ListItemIcon } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 240,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box', position: 'relative' },
            }}
        >
            {/* <Toolbar /> */}
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    <ListItem key={"Users"} disablePadding>
                        <ListItemButton onClick={() => { navigate('/main-area/users') }}>
                            <ListItemIcon>
                                <PersonRoundedIcon></PersonRoundedIcon>
                            </ListItemIcon>
                            <ListItemText primary={"Users"} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={"Clients"} disablePadding>
                        <ListItemButton onClick={() => { navigate('/main-area/clients') }}>
                            <ListItemIcon>
                                <PersonRoundedIcon></PersonRoundedIcon>
                            </ListItemIcon>
                            <ListItemText primary={"Clients"} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    );
};

export default Sidebar;
