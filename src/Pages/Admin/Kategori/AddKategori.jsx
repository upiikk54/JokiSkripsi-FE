import React from 'react'
import Dashboard from '../Dashboard'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { createCategory } from '../../../Redux/slices/CategoryReducer';

function AddKategori() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();

    const [categoryValue, setCategoryvalue] = React.useState({
        categoryNameValue: '',
    })

    const handleChange = (prop) => (event) => {
        setCategoryvalue({ ...categoryValue, [prop]: event.target.value });
    };

    const handleCreateMerk = async (e) => {
        e.preventDefault()
        const category = {
            categoryName: categoryValue.categoryNameValue,
        }


        dispatch(createCategory(category)).then((res) => {
            if (res.payload.status === true || res.payload.statusCode === 201) {
                enqueueSnackbar('Merk Berhasil Dibuat', { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 1500 });
                navigate('/admin/kategori')
            } else if (res.payload.status === false || res.payload.statusCode === 500) {
                enqueueSnackbar(`${res.payload.message}`, { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 1500 });
            }
        })
    }

    const handleCancelCreateCategory = () => {
        navigate('/admin/kategori')
    }
    return (
        <>
            <Dashboard>
                <Box sx={{ display: 'flex', width: '100%', maxWidth: '1440px', border: '1px solid #101010', borderRadius: '8px', height: '100%', mt: '30px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', maxWidth: '1440px' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', pt: '35px', px: '36px', width: '100%', maxWidth: '1440px', }}>
                            <Typography sx={{ fontSize: '18px', fontWeight: 400, fontFamily: 'Axiforma' }}>Nama Kategori</Typography>
                            <TextField
                                onChange={handleChange('categoryNameValue')}
                                label='nama kategori'
                                fullWidth
                                id="fullWidth" />
                        </Box>
                        <Box sx={{ display: 'flex', gap: '36px', width: '100%', maxWidth: '1440px', justifyContent: 'center' }}>
                            <Button onClick={handleCancelCreateCategory} variant='outlined' sx={{
                                border: '1px solid #6D7280', color: 'black', ":hover": {
                                    color: "red", border: '1px solid red',
                                },
                            }}>Batalkan</Button>
                            <Button onClick={handleCreateMerk} variant='contained' sx={{
                                height: '56px', backgroundColor: '#317276', fontFamily: 'Axiforma', ":hover": {
                                    bgcolor: "#317276"
                                }, fontSize: '16px'
                            }}>Tambahkan Kategori</Button>
                        </Box>
                    </Box>
                </Box>
            </Dashboard>
        </>
    )
}

export default AddKategori