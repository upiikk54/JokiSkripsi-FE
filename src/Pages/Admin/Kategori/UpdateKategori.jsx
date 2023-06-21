import React from 'react'
import Dashboard from '../Dashboard'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { getCategoryById, updateCategory } from '../../../Redux/slices/CategoryReducer';

function UpdateKategori() {
    const dispatch = useDispatch()
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const handleCancelUpdateCategory = () => {
        navigate('/admin/merk')
    }

    const [categoryValue, setCategoryvalue] = React.useState({
        categoryNameValue: '',
    })

    
    React.useEffect(() => {
        dispatch(getCategoryById(id)).then((res) => {
            if (res.payload.status === true || res.payload.statusCode === 200) {
                setCategoryvalue({
                    ...categoryValue,
                    categoryNameValue: res.payload.data.getCategoryById.categoryName,
                })
            }
        })
    }, [id])



    const handleChange = (prop) => (event) => {
        setCategoryvalue({ ...categoryValue, [prop]: event.target.value });
    };


    const handleUpdateCategory = (e) => {
        e.preventDefault()
        const category = {
            categoryName: categoryValue.categoryNameValue,
        }
        dispatch(updateCategory({ id, category })).then((res) => {
            if (res.payload.status === true || res.payload.statusCode === 200) {
                enqueueSnackbar('Kategori Berhasil Diedit', { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 1500 });
                navigate('/admin/kategori')
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
                            <Typography sx={{ fontSize: '18px', fontWeight: 400, fontFamily: 'Axiforma' }}>Nama Kategori</Typography>
                            <TextField
                                onChange={handleChange('categoryNameValue')}
                                value={categoryValue.categoryNameValue}
                                label='nama kategori'
                                fullWidth
                                id="fullWidth" />
                        </Box>
                        <Box sx={{ display: 'flex', gap: '36px', width: '100%', maxWidth: '1440px', justifyContent: 'center' }}>
                            <Button onClick={handleCancelUpdateCategory} variant='outlined' sx={{
                                border: '1px solid #6D7280', color: 'black', ":hover": {
                                    color: "red", border: '1px solid red',
                                },
                            }}>Batalkan</Button>
                            <Button onClick={handleUpdateCategory} variant='contained' sx={{
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

export default UpdateKategori