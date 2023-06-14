import React from 'react'
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import MuiAppBar from '@mui/material/AppBar';
import { useDispatch } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Button, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


import DashboardIcon from '@mui/icons-material/Dashboard';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import BrandingWatermarkOutlinedIcon from '@mui/icons-material/BrandingWatermarkOutlined';
import BalanceIcon from '@mui/icons-material/Balance';
import BalanceOutlinedIcon from '@mui/icons-material/BalanceOutlined';
import CategoryIcon from '@mui/icons-material/Category';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import ProductionQuantityLimitsOutlinedIcon from '@mui/icons-material/ProductionQuantityLimitsOutlined';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ShopIcon from '@mui/icons-material/Shop';
import ShopOutlinedIcon from '@mui/icons-material/ShopOutlined';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import PointOfSaleOutlinedIcon from '@mui/icons-material/PointOfSaleOutlined';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

function Dashboard(props) {
    const dispatch = useDispatch()
    const ref = React.useRef(null);
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const menus = [
        {
            name: 'Dashboard',
            link: '/admin/dashboard'
        },
        {
            name: 'Merk',
            link: '/admin/merk'
        },
        {
            name: 'Satuan',
            link: '/admin/satuan'
        },
        {
            name: 'Kategori',
            link: '/admin/kategori'
        },
        {
            name: 'Produk',
            link: '/admin/produk'
        },
        {
            name: 'Pemasok',
            link: '/admin/pemasok'
        },
        {
            name: 'Pembelian',
            link: '/admin/pembelian'
        },
        {
            name: 'Penjualan',
            link: '/admin/penjualan'
        },
    ]
    const location = useLocation().pathname
    const onClickMenu = menus.filter((data) => location.includes(data.link))

    return (
        <>
            <Box sx={{ display: 'flex' }} ref={ref}>
                <CssBaseline />
                <AppBar position="fixed" open={open} sx={{ backgroundColor: 'white', boxShadow: 'unset', borderBottom: '1px solid #D2D5DA;', py: 1, px: '0 !important' }}>
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', gap: '16px' }}>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                sx={{ mr: 2, ...(open && { display: 'none' }), color: 'black' }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="h6" noWrap component="div" sx={{ fontSize: '24px', color: '#317276', fontFamily: 'Axiforma' }}>
                                    Dashboard Admin
                                </Typography>
                                <Typography noWrap sx={{ fontSize: '14px', color: '#697586', fontFamily: 'Axiforma' }}>
                                    Selamat Datang, Admin!
                                </Typography>
                            </Box>
                        </Box>
                        <Button variant='outlined' color='error' sx={{ textTransform: 'none' }}>Logout</Button>
                    </Toolbar>
                </AppBar>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                            backgroundColor: '#317276'
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}
                >
                    <DrawerHeader sx={{ justifyContent: 'space-between', py: 1.85 }}>
                        {/* <Link to={'/'} style={{ textDecoration: "none", color: "black" }} > */}
                            <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center', cursor: 'pointer' }}>
                                <Box sx={{ display: 'flex' }}>
                                    {/* <Box sx={{ maxWidth: '41px', width: '100%', borderRadius: '50%' }} component={'img'} src={Logo} /> */}haloo
                                </Box>
                                <Box sx={{ display: 'flex' }}>
                                    <Typography sx={{ color: '#FFD12D', fontSize: '18px', fontWeight: 600, lineHeight: '39px', fontFamily: 'Axiforma' }}>Antha</Typography>
                                    <Typography sx={{ color: 'white', fontSize: '18px', fontWeight: 600, lineHeight: '39px', fontFamily: 'Axiforma' }}>Gallery</Typography>
                                </Box>
                            </Box>
                        {/* </Link> */}
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Box sx={{ px: '35px', pt: 2 }}>
                        <Typography sx={{ fontSize: '12px', color: 'white', fontFamily: 'Axiforma' }}>Menu</Typography>
                    </Box>
                    <List sx={{ py: 0 }} >
                        {menus.map((text, index) => {
                            return (
                                <Link key={index} to={text.name === 'Dashboard' ? text.link : text.name === 'Merk' ? text.link : text.name === 'Satuan' ? text.link : text.name === 'Kategori' ? text.link : text.name === 'Produk' ? text.link : text.name === 'Pemasok' ? text.link : text.name === 'Pembelian' ? text.link : text.name === 'Penjualan' ? text.link : ''} style={{ textDecoration: 'none', color: onClickMenu[0].name === text.name ? 'white' : 'rgba(255, 255, 255, 0.5)' }}>
                                    <ListItem disablePadding>
                                        <ListItemButton sx={{ position: 'relative' }} >
                                            <Box sx={{ display: onClickMenu[0].name === text.name ? 'block' : 'none', backgroundColor: 'white', width: '5px', height: '24px', borderRadius: '0px 8px 8px 0px', position: 'absolute', left: 0 }} />
                                            <ListItemIcon sx={{ display: 'flex', justifyContent: 'center' }}>
                                                {text.name === 'Dashboard' ? onClickMenu[0].name === text.name ? <DashboardIcon sx={{ color: 'white' }} /> : <DashboardOutlinedIcon sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                                                    : text.name === 'Merk' ? onClickMenu[0].name === text.name ? <BrandingWatermarkIcon sx={{ color: 'white' }} /> : <BrandingWatermarkOutlinedIcon sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                                                        : text.name === 'Satuan' ? onClickMenu[0].name === text.name ? <BalanceIcon sx={{ color: 'white' }} /> : <BalanceOutlinedIcon sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                                                            : text.name === 'Kategori' ? onClickMenu[0].name === text.name ? <CategoryIcon sx={{ color: 'white' }} /> : <CategoryOutlinedIcon sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                                                                : text.name === 'Produk' ? onClickMenu[0].name === text.name ? <ProductionQuantityLimitsIcon sx={{ color: 'white' }} /> : <ProductionQuantityLimitsOutlinedIcon sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                                                                    : text.name === 'Pemasok' ? onClickMenu[0].name === text.name ? <PeopleAltIcon sx={{ color: 'white' }} /> : <PeopleAltOutlinedIcon sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                                                                        : text.name === 'Pembelian' ? onClickMenu[0].name === text.name ? <ShopIcon sx={{ color: 'white' }} /> : <ShopOutlinedIcon sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                                                                            : text.name === 'Penjualan' ? onClickMenu[0].name === text.name ? <PointOfSaleIcon sx={{ color: 'white' }} /> : <PointOfSaleOutlinedIcon sx={{ color: 'rgba(255, 255, 255, 0.5)' }} /> : ''}
                                            </ListItemIcon>
                                            <ListItemText primary={text.name} />
                                        </ListItemButton>
                                    </ListItem>
                                </Link>
                            )
                        }
                        )}
                    </List>
                </Drawer>
                <Main open={open}>
                    <DrawerHeader />
                    {props.children}
                </Main>
            </Box>
        </>
    )
}


export default Dashboard