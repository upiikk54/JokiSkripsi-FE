import React from 'react'
import Dashboard from '../Dashboard'
import { Box, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { getPurchaseById } from '../../../Redux/slices/PurchaseReducer';

function DetailPembelian() {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { id } = useParams();

    const dataPurchase = useSelector(state => state.purchase.getDataPurchaseSingle)
    React.useEffect(() => {
        dispatch(getPurchaseById(id))
    }, [])

    const parsedDate = new Date(dataPurchase.transactionDate);
    const month = parsedDate.getMonth() + 1;
    const day = parsedDate.getDate();
    const year = parsedDate.getFullYear();
    const formattedDate = `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;

    const totalBiaya = dataPurchase.amount * dataPurchase.purchasePrice
    console.log(totalBiaya);

    const handleBackDetail = () => {
        navigate('/admin/pembelian')
    }
    return (
        <>
            <Dashboard>
                <Box sx={{ display: 'flex', flexDirection: 'column', mt: '20px', gap: '24px' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography sx={{ fontSize: '20px', fontWeight: 600, color: '#317276' }}>Detail Transaksi</Typography>
                        <Box onClick={handleBackDetail} sx={{ display: 'flex', cursor: 'pointer' }}>
                            <ArrowBackIcon sx={{ color: '#317276' }} />
                            <Typography sx={{ fontSize: '16px', fontWeight: 400, color: '#317276' }}>Kembali</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)', width: '100%', maxWidth: { xs: '377px', sm: 'unset' }, height: '100%' }}>
                        {Object.keys(dataPurchase).length !== 0 ?
                            <Box sx={{ px: '36px', py: '36px' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #D2D5DA' }}>
                                        <Typography sx={{ fontSize: { xs: '12px', sm: '15px', md: '20px' }, fontWeight: 400 }}>Kode Pembelian</Typography>
                                        <Typography sx={{ fontSize: { xs: '12px', sm: '15px', md: '20px' }, fontWeight: 600, }}>{dataPurchase.transactionCode}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #D2D5DA' }}>
                                        <Typography sx={{ fontSize: { xs: '12px', sm: '15px', md: '20px' }, fontWeight: 400 }}>Tanggal Pembelian</Typography>
                                        <Typography sx={{ fontSize: { xs: '12px', sm: '15px', md: '20px' }, fontWeight: 600 }}>{formattedDate}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #D2D5DA' }}>
                                        <Typography sx={{ fontSize: { xs: '12px', sm: '15px', md: '20px' }, fontWeight: 400 }}>Nama Produk</Typography>
                                        <Typography sx={{ fontSize: { xs: '12px', sm: '15px', md: '20px' }, fontWeight: 600 }}>{dataPurchase.product.productName}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #D2D5DA' }}>
                                        <Typography sx={{ fontSize: { xs: '12px', sm: '15px', md: '20px' }, fontWeight: 400 }}>Jumlah</Typography>
                                        <Typography sx={{ fontSize: { xs: '12px', sm: '15px', md: '20px' }, fontWeight: 600 }}>{dataPurchase.amount}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #D2D5DA' }}>
                                        <Typography sx={{ fontSize: { xs: '12px', sm: '15px', md: '20px' }, fontWeight: 400 }}>Biaya</Typography>
                                        <Typography sx={{ fontSize: { xs: '12px', sm: '15px', md: '20px' }, fontWeight: 600 }}>{dataPurchase.purchasePrice}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #D2D5DA' }}>
                                        <Typography sx={{ fontSize: { xs: '12px', sm: '15px', md: '20px' }, fontWeight: 400 }}>Total Biaya</Typography>
                                        <Typography sx={{ fontSize: { xs: '12px', sm: '15px', md: '20px' }, fontWeight: 600 }}>{totalBiaya}</Typography>
                                    </Box>
                                </Box>
                            </Box>
                            :
                            <Typography>
                                Loading...
                            </Typography>
                        }
                    </Box>
                </Box>
            </Dashboard>
        </>
    )
}

export default DetailPembelian