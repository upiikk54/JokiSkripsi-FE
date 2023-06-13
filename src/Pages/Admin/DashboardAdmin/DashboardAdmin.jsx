import React from 'react'
import Dashboard from '../Dashboard'
import { Box, Typography } from '@mui/material'
import produk from '../../../Assets/DashboardAdmin/Produk.png'
import pembelian from '../../../Assets/DashboardAdmin/Pembelian.png'
import penjualan from '../../../Assets/DashboardAdmin/Penjualan.png'
import pemasok from '../../../Assets/DashboardAdmin/Pemasok.png'

function DashboardAdmin() {
    return (
        <>
            <Dashboard>
                <Box sx={{ display: 'flex', gap: '36px', mt: '25px', flexWrap: 'wrap'}}>
                    <Box sx={{ display: 'flex', gap: '23px', border: '1px solid #BFBFBF', borderRadius: '10px', alignItems: 'center', width: '267px', height: '100px', justifyContent: 'center'}}>
                        <Box sx={{ maxWidth: '53px', width: '100%', height: '100%', maxHeight: '53px' }} component={'img'} src={produk} />
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2px'}}>
                            <Typography sx={{ color: '#317276', fontSize: '15px', fontWeight: 600, fontFamily: 'Axiforma'}}>Produk</Typography>
                            <Typography sx={{ color: '#696969', fontSize: '15px', fontWeight: 400, fontFamily: 'Axiforma', width: '168px'}}>Untuk produk yang dimiliki saat ini berjumlah 25 produk</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: '23px', border: '1px solid #BFBFBF', borderRadius: '10px', alignItems: 'center', width: '267px', height: '100px', justifyContent: 'center'}}>
                        <Box sx={{ maxWidth: '53px', width: '100%', height: '100%', maxHeight: '53px' }} component={'img'} src={pembelian} />
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2px'}}>
                            <Typography sx={{ color: '#317276', fontSize: '15px', fontWeight: 600, fontFamily: 'Axiforma'}}>Pembelian</Typography>
                            <Typography sx={{ color: '#696969', fontSize: '15px', fontWeight: 400, fontFamily: 'Axiforma', width: '168px'}}>Transaksi pembelian anda berjumlah 10 pembelian</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: '23px', border: '1px solid #BFBFBF', borderRadius: '10px', alignItems: 'center', width: '267px', height: '100px', justifyContent: 'center'}}>
                        <Box sx={{ maxWidth: '53px', width: '100%', height: '100%', maxHeight: '53px' }} component={'img'} src={penjualan} />
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2px'}}>
                            <Typography sx={{ color: '#317276', fontSize: '15px', fontWeight: 600, fontFamily: 'Axiforma'}}>Penjualan</Typography>
                            <Typography sx={{ color: '#696969', fontSize: '15px', fontWeight: 400, fontFamily: 'Axiforma', width: '168px'}}>Transaksi penjualan anda berjumlah 10 penjualan</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: '23px', border: '1px solid #BFBFBF', borderRadius: '10px', alignItems: 'center', width: '267px', height: '100px', justifyContent: 'center'}}>
                        <Box sx={{ maxWidth: '53px', width: '100%', height: '100%', maxHeight: '53px' }} component={'img'} src={pemasok} />
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2px'}}>
                            <Typography sx={{ color: '#317276', fontSize: '15px', fontWeight: 600, fontFamily: 'Axiforma'}}>Pemasok</Typography>
                            <Typography sx={{ color: '#696969', fontSize: '15px', fontWeight: 400, fontFamily: 'Axiforma', width: '168px'}}>Pemasok yang anda miliki berjumlah 10 pemasok</Typography>
                        </Box>
                    </Box>
                </Box>
            </Dashboard>
        </>
    )
}

export default DashboardAdmin