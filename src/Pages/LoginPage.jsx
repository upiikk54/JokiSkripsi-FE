import { Box, Button, Divider, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material'
import React from 'react'
import imageLogin from '../Assets/LoginPage/Background.png'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LoginUsers } from '../Redux/slices/AuthReducer';
import { useDispatch } from 'react-redux';

function LoginPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [loginValue, setLoginValue] = React.useState({
        emailValueLogin: '',
        passwordValueLogin: '',
    });

    const handleChangeLogin = (prop) => (event) => {
        setLoginValue({ ...loginValue, [prop]: event.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault()
        const user = {
            email: loginValue.emailValueLogin,
            password: loginValue.passwordValueLogin,
        }

        dispatch(LoginUsers(user)).then((res) => {
            if (res.payload.status === true || res.payload.statusCode === 201) {
                localStorage.setItem("token", res.payload.data.token)
                enqueueSnackbar(`${res.payload.message}`, { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 1500 });
                navigate('/admin/dashboard')
            } else if (res.payload.status === false || res.payload.statusCode === 500) {
                enqueueSnackbar(`${res.payload.message}`, { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 1500 });
            }
        })
    }

    return (
        <>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Box sx={{
                    display: 'flex',
                    width: '100vw',
                    maxWidth: '1440px',
                    height: '100vh',
                    maxHeight: '1440px',
                    backgroundImage: `url(${imageLogin})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    position: 'relative'
                }}>
                    <Box sx={{
                        display: 'flex',
                        width: { xs: '621px', sm: '710px', xxs: '100vw' },
                        maxHeight: { xs: '500px' },
                        borderRadius: '25px',
                        backgroundColor: 'white',
                        position: 'absolute',
                        top: { xl: '256px', md: '204px', sm: '244px', xs: '251px', xxs: '191px' },
                        left: { xl: '355px', md: '290px', sm: '165px', xs: '70px' },
                        justifyContent: 'center'
                    }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '31px', pt: '10px' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Typography sx={{ fontFamily: 'axiforma', fontSize: '35px', fontWeight: 400, color: 'black' }}>LOGIN</Typography>
                                <Divider sx={{ backgroundColor: '#608F97', height: '2px', width: '116px' }} />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '22px', alignItems: 'center' }}>
                                <TextField
                                    onChange={handleChangeLogin('emailValueLogin')}
                                    sx={{ width: { xs: '466px', xxs: '80vw' } }}
                                    id="outlined-password-input"
                                    label="Email"
                                    type="Email"
                                    autoComplete="current-password"
                                />
                                <TextField
                                    onChange={handleChangeLogin('passwordValueLogin')}
                                    fullWidth
                                    required
                                    id="standard-adornment-password"
                                    placeholder='password'
                                    type={showPassword ? 'text' : 'password'}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <Button onClick={handleLogin} variant="contained" sx={{
                                    color: 'white', backgroundColor: '#669197', width: '224px', height: '40px', mb: '40px', ":hover": {
                                        bgcolor: "#317276"
                                    }
                                }}>LOGIN</Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default LoginPage