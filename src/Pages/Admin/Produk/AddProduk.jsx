import React from 'react'
import Dashboard from '../Dashboard'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../../../Redux/slices/ProductReducer';
import { getAllCategory } from '../../../Redux/slices/CategoryReducer';
import { getAllUnit } from '../../../Redux/slices/UnitReducer';
import { getAllMerk } from '../../../Redux/slices/MerkReducer';
import dayjs from 'dayjs';

function AddProduk() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const [categoryId, setCategoryId] = React.useState();
    const [categoryName, setCategoryName] = React.useState();
    const handleChangeCategory = (e) => {
        setCategoryName(e.target.value)
    }

    const [brandId, setBrandId] = React.useState();
    const [brandName, setBrandName] = React.useState();
    const handleChangeBrand = (e) => {
        setBrandName(e.target.value)
    }

    const [unitId, setUnitId] = React.useState();
    const [unitName, setUnitName] = React.useState();
    const handleChangeUnit = (e) => {
        setUnitName(e.target.value)
    }

    const [dateValue, setDateValue] = React.useState(dayjs('01-01-2000'));
    const dateString = dateValue.format('YYYY-MM-DD')

    const dataCategory = useSelector(state => state.category.getDataCategory);
    const dataMerk = useSelector(state => state.merk.getDataMerk);
    const dataUnit = useSelector(state => state.unit.getDataUnit);

    React.useEffect(() => {
        dispatch(getAllCategory())
        dispatch(getAllUnit())
        dispatch(getAllMerk())
    }, [])



    const [productValue, setProductValue] = React.useState({
        productNameValue: '',
        productPriceValue: 0,
        productStockValue: 0,
    })

    const handleChange = (prop) => (event) => {
        setProductValue({ ...productValue, [prop]: event.target.value });
    };

    const handleCreateProduct = async (e) => {
        e.preventDefault()
        const product = {
            categoryId: categoryId,
            brandId: brandId,
            unitId: unitId,
            productName: productValue.productNameValue,
            productPrice: productValue.productPriceValue,
            productStock: productValue.productStockValue,
            expiredDate: dateString,
        }
        console.log(product);

        dispatch(createProduct(product)).then((res) => {
            if (res.payload.status === true || res.payload.statusCode === 201) {
                enqueueSnackbar('Product Berhasil Dibuat', { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 1500 });
                navigate('/admin/produk')
            } else if (res.payload.status === false || res.payload.statusCode === 500) {
                enqueueSnackbar(`${res.payload.message}`, { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 1500 });
            }
        })
    }

    const handleCancelCreateProduk = () => {
        navigate('/admin/produk')
    }

    return (
        <>
            <Dashboard>
                <Box sx={{ display: 'flex', width: '100%', maxWidth: '1440px', border: '1px solid #101010', borderRadius: '8px', height: '95%', mt: '30px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '1440px', gap: '25px' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '1440px' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', pt: '35px', px: '36px', width: '100%', maxWidth: '1440px', }}>
                                <Typography sx={{ fontSize: '18px', fontWeight: 400, fontFamily: 'Axiforma' }}>Nama Produk</Typography>
                                <TextField
                                    onChange={handleChange('productNameValue')}
                                    label='nama produk'
                                    fullWidth
                                    id="fullWidth" />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', pt: '35px', px: '36px', width: '100%', maxWidth: '1440px', }}>
                                <Typography sx={{ fontSize: '18px', fontWeight: 400, fontFamily: 'Axiforma' }}>Kategori Produk</Typography>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Kategori</InputLabel>
                                        {Object.keys(dataCategory).length !== 0 ?
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                label="Kategori"
                                                onChange={handleChangeCategory}
                                                value={categoryName || ''}
                                            >
                                                {dataCategory.map((data, i) => {
                                                    return (
                                                        <MenuItem
                                                            key={i}
                                                            onClick={() => setCategoryId(data.id)}
                                                            value={data.categoryName}
                                                        >{data.categoryName}</MenuItem>
                                                    )
                                                })}
                                            </Select>
                                            : ''}
                                    </FormControl>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', pt: '35px', px: '36px', width: '100%', maxWidth: '1440px', }}>
                                <Typography sx={{ fontSize: '18px', fontWeight: 400, fontFamily: 'Axiforma' }}>Merk Produk</Typography>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Merk</InputLabel>
                                        {Object.keys(dataMerk).length !== 0 ?
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                label="Merk"
                                                onChange={handleChangeBrand}
                                                value={brandName || ''}
                                            >
                                                {dataMerk.map((data, i) => {
                                                    return (
                                                        <MenuItem
                                                            key={i}
                                                            onClick={() => setBrandId(data.id)}
                                                            value={data.brandName}
                                                        >{data.brandName}</MenuItem>
                                                    )
                                                })}
                                            </Select>
                                            : ''}
                                    </FormControl>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', pt: '35px', px: '36px', width: '100%', maxWidth: '1440px', }}>
                                <Typography sx={{ fontSize: '18px', fontWeight: 400, fontFamily: 'Axiforma' }}>Satuan Produk</Typography>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Satuan</InputLabel>
                                        {Object.keys(dataUnit).length !== 0 ?
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                label="Satuan"
                                                onChange={handleChangeUnit}
                                                value={unitName || ''}
                                            >
                                                {dataUnit.map((data, i) => {
                                                    return (
                                                        <MenuItem
                                                            key={i}
                                                            onClick={() => setUnitId(data.id)}
                                                            value={data.unitName}
                                                        >{data.unitName}</MenuItem>
                                                    )
                                                })}
                                            </Select>
                                            : ''}
                                    </FormControl>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', pt: '35px', px: '36px', width: '100%', maxWidth: '1440px', }}>
                                <Typography sx={{ fontSize: '18px', fontWeight: 400, fontFamily: 'Axiforma' }}>Harga Produk</Typography>
                                <TextField
                                    onChange={handleChange('productPriceValue')}
                                    label='harga produk'
                                    type='number'
                                    fullWidth
                                    id="fullWidth" />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', pt: '35px', px: '36px', width: '100%', maxWidth: '1440px', }}>
                                <Typography sx={{ fontSize: '18px', fontWeight: 400, fontFamily: 'Axiforma' }}>Stock Produk</Typography>
                                <TextField
                                    onChange={handleChange('productStockValue')}
                                    label='stock produk'
                                    type='number'
                                    fullWidth
                                    id="fullWidth" />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', pt: '35px', px: '36px', width: '100%', maxWidth: '1440px', }}>
                                <Typography sx={{ fontSize: '18px', fontWeight: 400, fontFamily: 'Axiforma' }}>Tanggal Expired</Typography>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        value={dateValue}
                                        onChange={(newValue) => {
                                            setDateValue(newValue)
                                        }}
                                        inputFormat="DD-MM-YYYY"
                                        renderInput={(params) => <TextField {...params} helperText={null} />}
                                    />
                                </LocalizationProvider>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', gap: '36px', width: '100%', maxWidth: '1440px', justifyContent: 'center' }}>
                            <Button onClick={handleCancelCreateProduk} variant='outlined' sx={{
                                border: '1px solid #6D7280', color: 'black', ":hover": {
                                    color: "red", border: '1px solid red',
                                },
                            }}>Batalkan</Button>
                            <Button onClick={handleCreateProduct} variant='contained' sx={{
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

export default AddProduk