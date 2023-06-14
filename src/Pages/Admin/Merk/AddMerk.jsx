import React from 'react'
import Dashboard from '../Dashboard'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function AddMerk() {
    const navigate = useNavigate();
    const handleCancelCreateMerk = () => {
        navigate('/admin/merk')
    }
    return (
        <>
            <Dashboard>
                <Box sx={{ display: 'flex', width: '100%', maxWidth: '1440px', border: '1px solid #101010', borderRadius: '8px', height: '100%', mt: '30px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', maxWidth: '1440px' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', pt: '35px', px: '36px', width: '100%', maxWidth: '1440px', }}>
                            <Typography sx={{ fontSize: '18px', fontWeight: 400, fontFamily: 'Axiforma' }}>Nama Merk</Typography>
                            <TextField
                                // inputRef={productNameValue}
                                label='nama merk'
                                fullWidth
                                id="fullWidth" />
                        </Box>
                        <Box sx={{ display: 'flex', gap: '36px', width: '100%', maxWidth: '1440px', justifyContent: 'center' }}>
                            <Button onClick={handleCancelCreateMerk} variant='outlined' sx={{
                                border: '1px solid #6D7280', color: 'black', ":hover": {
                                    color: "red", border: '1px solid red',
                                },
                            }}>Batalkan</Button>
                            <Button variant='contained' sx={{
                                height: '56px', backgroundColor: '#317276', fontFamily: 'Axiforma', ":hover": {
                                    bgcolor: "#317276"
                                }, fontSize: '16px'
                            }}>Tambahkan Merk</Button>
                        </Box>
                    </Box>
                </Box>
            </Dashboard>
        </>
    )
}

export default AddMerk