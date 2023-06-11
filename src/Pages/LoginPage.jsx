import { Box, Button, Divider, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material'
import React from 'react'
import imageLogin from '../Assets/LoginPage/Background.png'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function LoginPage() {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
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
                        left: { xl: '355px', md: '290px', sm: '165px', xs: '70px'},
                        justifyContent: 'center'
                    }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '31px', pt: '10px' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Typography sx={{ fontFamily: 'axiforma', fontSize: '35px', fontWeight: 400, color: 'black' }}>LOGIN</Typography>
                                <Divider sx={{ backgroundColor: '#608F97', height: '2px', width: '116px' }} />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '22px', alignItems: 'center' }}>
                                <TextField
                                    sx={{ width: { xs: '466px', xxs: '80vw' } }}
                                    id="outlined-password-input"
                                    label="Email"
                                    type="Email"
                                    autoComplete="current-password"
                                />
                                <FormControl sx={{ width: { xs: '466px', xxs: '80vw' } }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        endAdornment={
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
                                        }
                                        label="Password"
                                    />
                                </FormControl>
                                <Button variant="contained" sx={{ color: 'white', backgroundColor: '#669197', width: '224px', height: '40px', mb: '40px' }}>LOGIN</Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default LoginPage