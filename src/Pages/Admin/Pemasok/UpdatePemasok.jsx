import React from 'react'
import Dashboard from '../Dashboard'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function UpdatePemasok() {
    const navigate = useNavigate();
    const handleCancelUpdatePemasok = () => {
        navigate('/admin/pemasok')
    }
    return (
        <>
            <Dashboard>
                <Box sx={{ display: 'flex', width: '100%', maxWidth: '1440px', border: '1px solid #101010', borderRadius: '8px', height: '100%', mt: '30px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '25px', width: '100%', maxWidth: '1440px' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '1440px' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', pt: '35px', px: '36px', width: '100%', maxWidth: '1440px', }}>
                                <Typography sx={{ fontSize: '18px', fontWeight: 400, fontFamily: 'Axiforma' }}>Nama Pemasok</Typography>
                                <TextField
                                    // inputRef={productNameValue}
                                    label='nama pemasok'
                                    fullWidth
                                    id="fullWidth" />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', pt: '35px', px: '36px', width: '100%', maxWidth: '1440px', }}>
                                <Typography sx={{ fontSize: '18px', fontWeight: 400, fontFamily: 'Axiforma' }}>Kontak</Typography>
                                <TextField
                                    // inputRef={productNameValue}
                                    label='Kontak'
                                    type='number'
                                    fullWidth
                                    id="fullWidth" />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', pt: '35px', px: '36px', width: '100%', maxWidth: '1440px', }}>
                                <Typography sx={{ fontSize: '18px', fontWeight: 400, fontFamily: 'Axiforma' }}>Alamat Pemasok</Typography>
                                <TextField
                                    // inputRef={productNameValue}
                                    label='alamat pemasok'
                                    fullWidth
                                    id="fullWidth" />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', pt: '35px', px: '36px', width: '100%', maxWidth: '1440px', }}>
                                <Typography sx={{ fontSize: '18px', fontWeight: 400, fontFamily: 'Axiforma' }}>Deskripsi</Typography>
                                <TextField
                                    // inputRef={productNameValue}
                                    label='Deskripsi'
                                    fullWidth
                                    id="fullWidth" />
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', gap: '36px', width: '100%', maxWidth: '1440px', justifyContent: 'center' }}>
                            <Button onClick={handleCancelUpdatePemasok} variant='outlined' sx={{
                                border: '1px solid #6D7280', color: 'black', ":hover": {
                                    color: "red", border: '1px solid red',
                                },
                            }}>Batalkan</Button>
                            <Button variant='contained' sx={{
                                height: '56px', backgroundColor: '#317276', fontFamily: 'Axiforma', ":hover": {
                                    bgcolor: "#317276"
                                }, fontSize: '16px'
                            }}>Simpan Perubahan</Button>
                        </Box>
                    </Box>
                </Box>
            </Dashboard>
        </>
    )
}

export default UpdatePemasok