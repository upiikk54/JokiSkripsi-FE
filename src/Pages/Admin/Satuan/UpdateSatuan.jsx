import React from 'react'
import Dashboard from '../Dashboard'
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { getUnitById, updateUnit } from '../../../Redux/slices/UnitReducer';

function UpdateSatuan() {
    const dispatch = useDispatch()
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const handleCancelUpdateUnit = () => {
        navigate('/admin/satuan')
    }

    const [unitValue, setUnitValue] = React.useState({
        unitNameValue: '',
    })

    React.useEffect(() => {
        dispatch(getUnitById(id)).then((res) => {
            if (res.payload.status === true || res.payload.statusCode === 200) {
                setUnitValue({
                    ...unitValue,
                    unitNameValue: res.payload.data.getUnitbyId.unitName,
                })
            }
        })
    }, [id])



    const handleChange = (prop) => (event) => {
        setUnitValue({ ...unitValue, [prop]: event.target.value });
    };


    const handleUpdateUnit = (e) => {
        e.preventDefault()
        const unit = {
            unitName: unitValue.unitNameValue,
        }
        dispatch(updateUnit({ id, unit })).then((res) => {
            if (res.payload.status === true || res.payload.statusCode === 200) {
                enqueueSnackbar('Satuan Berhasil Diedit', { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 1500 });
                navigate('/admin/satuan')
            } else if (res.payload.status === false || res.payload.statusCode === 401) {
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
                                value={unitValue.unitNameValue}
                                label='nama satuan'
                                fullWidth
                                id="fullWidth" />
                        </Box>
                        <Box sx={{ display: 'flex', gap: '36px', width: '100%', maxWidth: '1440px', justifyContent: 'center' }}>
                            <Button onClick={handleCancelUpdateUnit} variant='outlined' sx={{
                                border: '1px solid #6D7280', color: 'black', ":hover": {
                                    color: "red", border: '1px solid red',
                                },
                            }}>Batalkan</Button>
                            <Button onClick={handleUpdateUnit} variant='contained' sx={{
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

export default UpdateSatuan