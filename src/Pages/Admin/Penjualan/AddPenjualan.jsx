import React from 'react'
import Dashboard from '../Dashboard'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { getProductUnderKadaluarsa } from '../../../Redux/slices/ProductReducer'
import { createSaleTransaction } from '../../../Redux/slices/SaleReducer'

function AddPenjualan() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();


    const [productId, setProductId] = React.useState();
    const [productName, setProductName] = React.useState();
    const handlechangeProduct = (e) => {
        setProductName(e.target.value)
    }

    const [dateValue, setDateValue] = React.useState(dayjs('01-01-2000'));
    const dateString = dateValue.format('YYYY-MM-DD');

    const productUnderKadaluarsa = useSelector(state => state.product.getDataProductUnderKadaluarsas);
    React.useEffect(() => {
        dispatch(getProductUnderKadaluarsa())
    }, []);

    const [saleValue, setSaleValue] = React.useState({
        amountValue: 0,
    });

    const handleChange = (prop) => (event) => {
        setSaleValue({ ...saleValue, [prop]: event.target.value });
    };

    const handleCreatePurchase = async (e) => {
        e.preventDefault()
        const sale = {
            productId: productId,
            amount: saleValue.amountValue,
            transactionDate: dateString,
        }

        dispatch(createSaleTransaction(sale)).then((res) => {
            if (res.payload.status === true || res.payload.statusCode === 201) {
                enqueueSnackbar('Penjualan Berhasil Dibuat', { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 1500 });
                navigate('/admin/penjualan')
            } else if (res.payload.status === false || res.payload.statusCode === 500) {
                enqueueSnackbar(`${res.payload.message}`, { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 1500 });
            }
        })
    }

    const handleCancelCreatePenjualan = () => {
        navigate('/admin/penjualan')
    }

    return (
        <>
            <Dashboard>
                <Box sx={{ display: 'flex', width: '100%', maxWidth: '1440px', border: '1px solid #101010', borderRadius: '8px', height: '95%', mt: '30px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '1440px', gap: '25px' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '1440px' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', pt: '35px', px: '36px', width: '100%', maxWidth: '1440px', }}>
                                <Typography sx={{ fontSize: '18px', fontWeight: 400, fontFamily: 'Axiforma' }}>Produk</Typography>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Produk</InputLabel>
                                        {Object.keys(productUnderKadaluarsa).length !== 0 ?
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                label="Produk"
                                                onChange={handlechangeProduct}
                                                value={productName || ''}
                                            >
                                                {productUnderKadaluarsa.map((data, i) => {
                                                    return (
                                                        <MenuItem
                                                            key={i}
                                                            onClick={() => setProductId(data.id)}
                                                            value={data.productName}
                                                        >{data.productName}</MenuItem>
                                                    )
                                                })}
                                            </Select>
                                            :
                                            ''}
                                    </FormControl>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', pt: '35px', px: '36px', width: '100%', maxWidth: '1440px', }}>
                                <Typography sx={{ fontSize: '18px', fontWeight: 400, fontFamily: 'Axiforma' }}>jumlah</Typography>
                                <TextField
                                    onChange={handleChange('amountValue')}
                                    label='Jumlah'
                                    type='number'
                                    fullWidth
                                    id="fullWidth" />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', pt: '35px', px: '36px', width: '100%', maxWidth: '1440px', }}>
                                <Typography sx={{ fontSize: '18px', fontWeight: 400, fontFamily: 'Axiforma' }}>Tanggal Penjualan</Typography>
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
                            <Button onClick={handleCancelCreatePenjualan} variant='outlined' sx={{
                                border: '1px solid #6D7280', color: 'black', ":hover": {
                                    color: "red", border: '1px solid red',
                                },
                            }}>Batalkan</Button>
                            <Button onClick={handleCreatePurchase} variant='contained' sx={{
                                height: '56px', backgroundColor: '#317276', fontFamily: 'Axiforma', ":hover": {
                                    bgcolor: "#317276"
                                }, fontSize: '16px'
                            }}>Tambahkan Pembelian</Button>
                        </Box>
                    </Box>
                </Box>
            </Dashboard>
        </>
    )
}

export default AddPenjualan