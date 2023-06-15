import React from 'react'
import Dashboard from '../Dashboard'
import { Box, Typography } from '@mui/material'
import produk from '../../../Assets/DashboardAdmin/Produk.png'
import pembelian from '../../../Assets/DashboardAdmin/Pembelian.png'
import penjualan from '../../../Assets/DashboardAdmin/Penjualan.png'
import pemasok from '../../../Assets/DashboardAdmin/Pemasok.png'
import { useDispatch, useSelector } from 'react-redux'
import { getProductUnderKadaluarsa } from '../../../Redux/slices/ProductReducer'
import { getAllPurchase } from '../../../Redux/slices/PurchaseReducer'
import { getAllSale } from '../../../Redux/slices/SaleReducer'
import { getAllSupplier } from '../../../Redux/slices/SupplierReducer'

function DashboardAdmin() {
    const dispatch = useDispatch();
    const productUnderKadaluarsa = useSelector(state => state.product.getDataProductUnderKadaluarsas)
    const purchase = useSelector(state => state.purchase.getAllPurchases);
    const sale = useSelector(state => state.sale.getAllSales);
    const supplier = useSelector(state => state.supplier.getAllSuppliers);
    React.useEffect(() => {
        dispatch(getProductUnderKadaluarsa())
        dispatch(getAllPurchase())
        dispatch(getAllSale())
        dispatch(getAllSupplier())
    }, [])
    const amountProduct = productUnderKadaluarsa.length;
    const amountPurchase = purchase.length;
    const amountSale = sale.length;
    const amountSupplier = supplier.length;

    return (
        <>
            <Dashboard>
                <Box sx={{ display: 'flex', gap: '36px', mt: '25px', flexWrap: 'wrap' }}>
                    <Box sx={{ display: 'flex', gap: '23px', border: '1px solid #BFBFBF', borderRadius: '10px', alignItems: 'center', width: '267px', height: '100px', justifyContent: 'center' }}>
                        <Box sx={{ maxWidth: '53px', width: '100%', height: '100%', maxHeight: '53px' }} component={'img'} src={produk} />
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            <Typography sx={{ color: '#317276', fontSize: '15px', fontWeight: 600, fontFamily: 'Axiforma' }}>Produk</Typography>
                            <Typography sx={{ color: '#696969', fontSize: '15px', fontWeight: 400, fontFamily: 'Axiforma', width: '168px' }}>Untuk produk yang dimiliki saat ini berjumlah {amountProduct} produk</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: '23px', border: '1px solid #BFBFBF', borderRadius: '10px', alignItems: 'center', width: '267px', height: '100px', justifyContent: 'center' }}>
                        <Box sx={{ maxWidth: '53px', width: '100%', height: '100%', maxHeight: '53px' }} component={'img'} src={pembelian} />
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            <Typography sx={{ color: '#317276', fontSize: '15px', fontWeight: 600, fontFamily: 'Axiforma' }}>Pembelian</Typography>
                            <Typography sx={{ color: '#696969', fontSize: '15px', fontWeight: 400, fontFamily: 'Axiforma', width: '168px' }}>Transaksi pembelian anda berjumlah {amountPurchase} pembelian</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: '23px', border: '1px solid #BFBFBF', borderRadius: '10px', alignItems: 'center', width: '267px', height: '100px', justifyContent: 'center' }}>
                        <Box sx={{ maxWidth: '53px', width: '100%', height: '100%', maxHeight: '53px' }} component={'img'} src={penjualan} />
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            <Typography sx={{ color: '#317276', fontSize: '15px', fontWeight: 600, fontFamily: 'Axiforma' }}>Penjualan</Typography>
                            <Typography sx={{ color: '#696969', fontSize: '15px', fontWeight: 400, fontFamily: 'Axiforma', width: '168px' }}>Transaksi penjualan anda berjumlah {amountSale} penjualan</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: '23px', border: '1px solid #BFBFBF', borderRadius: '10px', alignItems: 'center', width: '267px', height: '100px', justifyContent: 'center' }}>
                        <Box sx={{ maxWidth: '53px', width: '100%', height: '100%', maxHeight: '53px' }} component={'img'} src={pemasok} />
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            <Typography sx={{ color: '#317276', fontSize: '15px', fontWeight: 600, fontFamily: 'Axiforma' }}>Pemasok</Typography>
                            <Typography sx={{ color: '#696969', fontSize: '15px', fontWeight: 400, fontFamily: 'Axiforma', width: '168px' }}>Pemasok yang anda miliki berjumlah {amountSupplier} pemasok</Typography>
                        </Box>
                    </Box>
                </Box>
            </Dashboard>
        </>
    )
}

export default DashboardAdmin