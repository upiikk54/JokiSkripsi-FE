import React from 'react'
import Dashboard from '../Dashboard'
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { getSupplierById, updateSupplier } from '../../../Redux/slices/SupplierReducer';

function UpdatePemasok() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();

    const [supplierValue, setSupplierValue] = React.useState({
        supplierNameValue: '',
        contactValue: '',
        addressValue: '',
        descriptionValue: '',
    });

    React.useEffect(() => {
        dispatch(getSupplierById(id)).then((res) => {
            if (res.payload.status === true || res.payload.statusCode === 200) {
                setSupplierValue({
                    ...supplierValue,
                    supplierNameValue: res.payload.data.getSupplierById.supplierName,
                    contactValue: res.payload.data.getSupplierById.contact,
                    addressValue: res.payload.data.getSupplierById.address,
                    descriptionValue: res.payload.data.getSupplierById.description,
                })
            }
        })
    }, [id])

    const handleChange = (prop) => (event) => {
        setSupplierValue({ ...supplierValue, [prop]: event.target.value });
    };

    const handleUpdateSupplier = (e) => {
        e.preventDefault()
        const supplier = {
            supplierName: supplierValue.supplierNameValue,
            contact: supplierValue.contactValue,
            address: supplierValue.addressValue,
            description: supplierValue.descriptionValue,
        }

        dispatch(updateSupplier({ id, supplier })).then((res) => {
            if (res.payload.status === true || res.payload.statusCode === 200) {
                enqueueSnackbar('Pemasok Berhasil Diedit', { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 1500 });
                navigate('/admin/pemasok')
            } else if (res.payload.status === false || res.payload.statusCode === 401) {
                enqueueSnackbar(`${res.payload.message}`, { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 1500 });
            }
        })
    };

    const handleCancelUpdatePemasok = () => {
        navigate('/admin/pemasok')
    };

    return (
        <>
            <Dashboard>
                <Box sx={{ display: 'flex', width: '100%', maxWidth: '1440px', border: '1px solid #101010', borderRadius: '8px', height: '100%', mt: '30px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '25px', width: '100%', maxWidth: '1440px' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '1440px' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', pt: '35px', px: '36px', width: '100%', maxWidth: '1440px', }}>
                                <Typography sx={{ fontSize: '18px', fontWeight: 400, fontFamily: 'Axiforma' }}>Nama Pemasok</Typography>
                                <TextField
                                    onChange={handleChange('supplierNameValue')}
                                    value={supplierValue.supplierNameValue}
                                    label='nama pemasok'
                                    fullWidth
                                    id="fullWidth" />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', pt: '35px', px: '36px', width: '100%', maxWidth: '1440px', }}>
                                <Typography sx={{ fontSize: '18px', fontWeight: 400, fontFamily: 'Axiforma' }}>Kontak</Typography>
                                <TextField
                                    onChange={handleChange('contactValue')}
                                    value={supplierValue.contactValue}
                                    label='Kontak'
                                    type='number'
                                    fullWidth
                                    id="fullWidth" />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', pt: '35px', px: '36px', width: '100%', maxWidth: '1440px', }}>
                                <Typography sx={{ fontSize: '18px', fontWeight: 400, fontFamily: 'Axiforma' }}>Alamat Pemasok</Typography>
                                <TextField
                                    onChange={handleChange('addressValue')}
                                    value={supplierValue.addressValue}
                                    label='alamat pemasok'
                                    fullWidth
                                    id="fullWidth" />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', pt: '35px', px: '36px', width: '100%', maxWidth: '1440px', }}>
                                <Typography sx={{ fontSize: '18px', fontWeight: 400, fontFamily: 'Axiforma' }}>Deskripsi</Typography>
                                <TextField
                                    onChange={handleChange('descriptionValue')}
                                    value={supplierValue.descriptionValue}
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
                            <Button onClick={handleUpdateSupplier} variant='contained' sx={{
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