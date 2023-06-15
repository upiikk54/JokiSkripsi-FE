import React from 'react'
import Dashboard from '../Dashboard'
import { DataGrid, gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import { Box, Button, Pagination, PaginationItem, Stack, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FilePresentOutlinedIcon from '@mui/icons-material/FilePresentOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

// function CustomPagination() {
//     const apiRef = useGridApiContext();
//     const page = useGridSelector(apiRef, gridPageSelector);
//     const pageCount = useGridSelector(apiRef, gridPageCountSelector);

//     return (
//         <Pagination
//             color="primary"
//             variant="outlined"
//             shape="rounded"
//             page={page + 1}
//             count={pageCount}
//             renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
//             onChange={(event, value) => apiRef.current.setPage(value - 1)}
//         />
//     );
// }

function PembelianAdmin() {
    const navigate = useNavigate();
    const columns = [
        { field: 'Expired', headerName: 'Kode Transaksi', width: 150 },
        { field: 'nama_produk', headerName: 'Pemasok', width: 150 },
        { field: 'stok', headerName: 'Tanggal', width: 150 },
        { field: 'harga', headerName: 'Total', width: 150 },
        {
            headerName: 'Aksi',
            type: 'Aksi',
            width: 300,
            sortable: false,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', gap: '8px' }}>
                    <Link to={`/admin/pembelian/${params.id}`}><Button sx={{
                        textTransform: 'none', color: 'black', border: '1px solid #D2D5DA', borderRadius: '8px', ":hover": {
                            color: "yellow", border: '1px solid yellow'
                        },
                    }}><InfoOutlinedIcon sx={{ width: '16px', mr: '8px' }} />Detail</Button></Link>
                    <Link to={`/admin/pembelian/nota/${params.id}`}><Button sx={{
                        textTransform: 'none', color: 'black', border: '1px solid #D2D5DA', borderRadius: '8px', ":hover": {
                            color: "green", border: '1px solid green'
                        },
                    }}><FilePresentOutlinedIcon sx={{ width: '16px', mr: '8px' }} />Nota</Button></Link>
                    <Link to={`/admin/merk/${params.id}`}><Button sx={{
                        textTransform: 'none', color: 'black', border: '1px solid #D2D5DA', borderRadius: '8px', ":hover": {
                            color: "red", border: '1px solid red'
                        },
                    }}><DeleteOutlineOutlinedIcon sx={{ width: '16px', mr: '8px' }} />Hapus</Button></Link>
                </Box>
            )
        },
        // {
        //     field: 'createdAt', headerName: 'Tanggal', flex: 1,
        //         valueGetter: (params) => {
        //         const date = new Date(params.row.createdAt);
        //         const formattedDate = date.toLocaleDateString();
        //         const formattedTime = date.toLocaleTimeString();
        //         return `${formattedDate} | ${formattedTime}`;
        //     },
        // },
    ];
    const handleCreatePembelian = () => {
        navigate('/admin/pembelian/create')
    }

    const rows = [
        { id: 1, nama_produk: 'Snow', nama_kategori: 'Jon', merk: 'asus', stok: '100', harga: '5000', Expired: '1232139', satuan: 'pcs' },
        { id: 2, nama_produk: 'Lannister', nama_kategori: 'Cersei', merk: 'asus', stok: '100', harga: '5000', Expired: '1232139', satuan: 'pcs' },
        { id: 3, nama_produk: 'Lannister', nama_kategori: 'Jaime', merk: 'asus', stok: '100', harga: '5000', Expired: '1232139', satuan: 'pcs' },
        { id: 4, nama_produk: 'Stark', nama_kategori: 'Arya', merk: 'asus', stok: '100', harga: '5000', Expired: '1232139', satuan: 'pcs' },
        { id: 5, nama_produk: 'Targaryen', nama_kategori: 'Daenerys', merk: 'asus', stok: '100', harga: '5000', Expired: '1232139', satuan: 'pcs' },
        { id: 6, nama_produk: 'Melisandre', nama_kategori: null, merk: 'asus', stok: '100', harga: '5000', Expired: '1232139', satuan: 'pcs' },
        { id: 7, nama_produk: 'Clifford', nama_kategori: 'Ferrara', merk: 'asus', stok: '100', harga: '5000', Expired: '1232139', satuan: 'pcs' },
        { id: 8, nama_produk: 'Frances', nama_kategori: 'Rossini', merk: 'asus', stok: '100', harga: '5000', Expired: '1232139', satuan: 'pcs' },
        { id: 9, nama_produk: 'Roxie', nama_kategori: 'Harvey', merk: 'asus', stok: '100', harga: '5000', Expired: '1232139', satuan: 'pcs' },
        { id: 10, nama_produk: 'Roxie', nama_kategori: 'Harvey', merk: 'asus', stok: '100', harga: '5000', Expired: '1232139', satuan: 'pcs' },
        { id: 11, nama_produk: 'Roxie', nama_kategori: 'Harvey', merk: 'asus', stok: '100', harga: '5000', Expired: '1232139', satuan: 'pcs' },
        { id: 12, nama_produk: 'Roxie', nama_kategori: 'Harvey', merk: 'asus', stok: '100', harga: '5000', Expired: '1232139', satuan: 'pcs' },
        { id: 13, nama_produk: 'Roxie', nama_kategori: 'Harvey', merk: 'asus', stok: '100', harga: '5000', Expired: '1232139', satuan: 'pcs' },
        { id: 14, nama_produk: 'Roxie', nama_kategori: 'Harvey', merk: 'asus', stok: '100', harga: '5000', Expired: '1232139', satuan: 'pcs' },
        { id: 15, nama_produk: 'Roxie', nama_kategori: 'Harvey', merk: 'asus', stok: '100', harga: '5000', Expired: '1232139', satuan: 'pcs' },
        { id: 16, nama_produk: 'Roxie', nama_kategori: 'Harvey', merk: 'asus', stok: '100', harga: '5000', Expired: '1232139', satuan: 'pcs' },
        { id: 17, nama_produk: 'Roxie', nama_kategori: 'Harvey', merk: 'asus', stok: '100', harga: '5000', Expired: '1232139', satuan: 'pcs' },
        { id: 18, nama_produk: 'Roxie', nama_kategori: 'Harvey', merk: 'asus', stok: '100', harga: '5000', Expired: '1232139', satuan: 'pcs' },
    ];

    return (
        <>
            <Dashboard>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px', mt: '20px', width: '100%', maxWidth: '1440px' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography sx={{ fontWeight: 600, fontSize: '20px', fontFamily: 'Axiforma', color: '#317276' }}>Pembelian</Typography>
                        <Button onClick={handleCreatePembelian} variant='contained' sx={{
                            width: '199px', height: '40px', backgroundColor: '#317276', fontFamily: 'Axiforma', ":hover": {
                                bgcolor: "#317276"
                            }
                        }}>Tambah Pembelian</Button>
                    </Box>
                    <Box sx={{ height: 'auto', overflow: "auto", width: '100%' }}>
                        <DataGrid
                            autoHeight={true}
                            rows={rows}
                            // rows={Object.keys(dataHistoryChat).length !== 0 ? dataHistoryChat.map(item => ({
                            //     ...item,
                            //     userName: item.user_id?.userName,
                            //     product_name: item.product_id?.product_name,
                            // })) : ''}
                            // getRowId={(row) => row._id}
                            columns={columns}
                            // pageSize={10}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 5,
                                    },
                                },
                            }}
                            // pageSize={Object.keys(dataHistoryChat).length !== 0 && Object.keys(dataHistoryChat).length < 9 ? Object.keys(dataHistoryChat).length : 9}
                            // rowsPerPageOptions={[10]}    
                            // components={{
                            //     Pagination: CustomPagination,
                            //     NoRowsOverlay: () => (
                            //         <Stack height="100%" alignItems="center" justifyContent="center">
                            //             Tidak ada data yang tersedia di tabel ini
                            //         </Stack>
                            //     ),
                            //     NoResultsOverlay: () => (
                            //         <Stack height="100%" alignItems="center" justifyContent="center">
                            //             Filter tidak menemukan hasil
                            //         </Stack>
                            //     )
                            // }}
                            sx={{ maxWidth: { xs: 'unset', xl: '1440px' } }}
                        />
                    </Box>
                </Box>
            </Dashboard>
        </>
    )
}

export default PembelianAdmin