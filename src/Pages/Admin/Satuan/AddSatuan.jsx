import React from 'react'
import Dashboard from '../Dashboard'
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { createUnit } from '../../../Redux/slices/UnitReducer';
import { useSnackbar } from 'notistack';

function AddSatuan() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const handleCancelCreateSatuan = () => {
        navigate('/admin/satuan')
    }

    const [unitValue, setUnitValue] = React.useState({
        unitNameValue: '',
    })

    const handleChange = (prop) => (event) => {
        setUnitValue({ ...unitValue, [prop]: event.target.value });
    };

    const handleCreateUnit = async (e) => {
        e.preventDefault()
        const unit = {
            unitName: unitValue.unitNameValue,
        }


        dispatch(createUnit(unit)).then((res) => {
            if (res.payload.status === true || res.payload.statusCode === 201) {
                enqueueSnackbar('Satuan Berhasil Dibuat', { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 1500 });
                navigate('/admin/satuan')
            } else if (res.payload.status === false || res.payload.statusCode === 500) {
                enqueueSnackbar(`${res.payload.message}`, { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 1500 });
            }
        })
    }
    return (
        <>
            <Dashboard>
                <Box sx={{ display: 'flex', width: '100%', maxWidth: '1440px', border: '1px solid #101010', borderRadius: '8px', height: '100%', mt: '30px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', maxWidth: '1440px' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', pt: '35px', px: '36px', width: '100%', maxWidth: '1440px', }}>
                            <Typography sx={{ fontSize: '18px', fontWeight: 400, fontFamily: 'Axiforma' }}>Nama Satuan</Typography>
                            <TextField
                                onChange={handleChange('unitNameValue')}
                                label='nama satuan'
                                fullWidth
                                id="fullWidth" />
                        </Box>
                        <Box sx={{ display: 'flex', gap: '36px', width: '100%', maxWidth: '1440px', justifyContent: 'center' }}>
                            <Button onClick={handleCancelCreateSatuan} variant='outlined' sx={{
                                border: '1px solid #6D7280', color: 'black', ":hover": {
                                    color: "red", border: '1px solid red',
                                },
                            }}>Batalkan</Button>
                            <Button onClick={handleCreateUnit} variant='contained' sx={{
                                height: '56px', backgroundColor: '#317276', fontFamily: 'Axiforma', ":hover": {
                                    bgcolor: "#317276"
                                }, fontSize: '16px'
                            }}>Tambahkan Satuan</Button>
                        </Box>
                    </Box>
                </Box>
            </Dashboard>
        </>
    )
}

export default AddSatuan