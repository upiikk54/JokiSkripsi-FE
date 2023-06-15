import React from 'react'
import Dashboard from '../Dashboard'
import { DataGrid, gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import { Box, Button, Pagination, PaginationItem, Stack, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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

function ProdukAdmin() {
    const navigate = useNavigate();
    const columns = [
        { field: 'nama_produk', headerName: 'Nama Produk', width: 200 },
        { field: 'nama_kategori', headerName: 'Kategori', width: 150 },
        { field: 'merk', headerName: 'Merk', width: 100 },
        { field: 'stok', headerName: 'Stok', width: 100 },
        { field: 'satuan', headerName: 'Satuan', width: 100 },
        { field: 'harga', headerName: 'Harga', width: 150 },
        { field: 'Expired', headerName: 'Expired', width: 150 },
        {
            headerName: 'Aksi',
            type: 'Aksi',
            width: 200,
            sortable: false,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', gap: '8px' }}>
                    <Link to={`/admin/produk/update/${params.id}`}><Button sx={{
                        textTransform: 'none', color: 'black', border: '1px solid #D2D5DA', borderRadius: '8px', ":hover": {
                            color: "yellow", border: '1px solid yellow'
                        },
                    }}><ModeEditOutlineOutlinedIcon sx={{ width: '16px', mr: '8px' }} />Edit</Button></Link>
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
    const handleCreateProduk = () => {
        navigate('/admin/produk/create')
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
        { id: 10, nama_produk: 'Roxie2', nama_kategori: 'Harvey', merk: 'asus', stok: '100', harga: '5000', Expired: '1232139', satuan: 'pcs' },
        { id: 11, nama_produk: 'Roxie3', nama_kategori: 'Harvey', merk: 'asus', stok: '100', harga: '5000', Expired: '1232139', satuan: 'pcs' },
        { id: 12, nama_produk: 'Roxie4', nama_kategori: 'Harvey', merk: 'asus', stok: '100', harga: '5000', Expired: '1232139', satuan: 'pcs' },
        { id: 13, nama_produk: 'Roxie5', nama_kategori: 'Harvey', merk: 'asus', stok: '100', harga: '5000', Expired: '1232139', satuan: 'pcs' },
        { id: 14, nama_produk: 'Roxie6', nama_kategori: 'Harvey', merk: 'asus', stok: '100', harga: '5000', Expired: '1232139', satuan: 'pcs' },
        { id: 15, nama_produk: 'Roxie7', nama_kategori: 'Harvey', merk: 'asus', stok: '100', harga: '5000', Expired: '1232139', satuan: 'pcs' },
        { id: 16, nama_produk: 'Roxie8', nama_kategori: 'Harvey', merk: 'asus', stok: '100', harga: '5000', Expired: '1232139', satuan: 'pcs' },
        { id: 17, nama_produk: 'Roxie9', nama_kategori: 'Harvey', merk: 'asus', stok: '100', harga: '5000', Expired: '1232139', satuan: 'pcs' },
        { id: 18, nama_produk: 'Roxie0', nama_kategori: 'Harvey', merk: 'asus', stok: '100', harga: '5000', Expired: '1232139', satuan: 'pcs' },
        { id: 19, nama_produk: 'Roxie11', nama_kategori: 'Harvey', merk: 'asus', stok: '100', harga: '5000', Expired: '1232139', satuan: 'pcs' },
        { id: 20, nama_produk: 'Roxie12', nama_kategori: 'Harvey', merk: 'asus', stok: '100', harga: '5000', Expired: '1232139', satuan: 'pcs' },
        { id: 21, nama_produk: 'Roxie13', nama_kategori: 'Harvey', merk: 'asus', stok: '100', harga: '5000', Expired: '1232139', satuan: 'pcs' },
        { id: 22, nama_produk: 'Roxie14', nama_kategori: 'Harvey', merk: 'asus', stok: '100', harga: '5000', Expired: '1232139', satuan: 'pcs' },
        { id: 23, nama_produk: 'Roxie15', nama_kategori: 'Harvey', merk: 'asus', stok: '100', harga: '5000', Expired: '1232139', satuan: 'pcs' },
        { id: 24, nama_produk: 'Roxie16', nama_kategori: 'Harvey', merk: 'asus', stok: '100', harga: '5000', Expired: '1232139', satuan: 'pcs' },
        { id: 25, nama_produk: 'Roxie17', nama_kategori: 'Harvey', merk: 'asus', stok: '100', harga: '5000', Expired: '1232139', satuan: 'pcs' },
    ];

    const columns2 = [
        { field: 'nama_produk', headerName: 'Nama Produk', width: 200, sortable: false, },
        { field: 'stok', headerName: 'Stok', width: 100, sortable: false, },
        { field: 'satuan', headerName: 'Satuan', width: 100, sortable: false, },
        { field: 'harga', headerName: 'Harga', width: 100, sortable: false, },
        { field: 'Expired', headerName: 'Expired', width: 150, sortable: false, },
    ];

    const printPDF = () => {
        window.scrollTo(0, 0);
        const domElement = document.getElementById("App");
        html2canvas(domElement, {
            scale: 3,
            scrollX: -window.scrollX,
            scrollY: -window.scrollY,
            windowWidth: document.documentElement.offsetWidth,
            windowHeight: domElement.scrollHeight,
            allowTaint: true,
            useCORS: true,
            onclone: (document) => {
                document.getElementById("print").style.visibility = "hidden";
            },
        }).then((canvas) => {

            const imgData = canvas
                .toDataURL("image/png")
                .replace("image/png", "image/octet-stream");

            const pdf = new jsPDF("p", "mm", "a4");
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, "JPEG", 1, 1, pdfWidth, pdfHeight);
            // pdf.save(`Invoice_${dataTransaction.invoice_number}.pdf`);
            pdf.save(`Nota_pembelian.pdf`);
        });
    };

    return (
        <>
            <Dashboard>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px', mt: '20px', width: '100%', maxWidth: '1440px' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography sx={{ fontWeight: 600, fontSize: '20px', fontFamily: 'Axiforma', color: '#317276' }}>Produk</Typography>
                        <Button onClick={handleCreateProduk} variant='contained' sx={{
                            width: '199px', height: '40px', backgroundColor: '#317276', fontFamily: 'Axiforma', ":hover": {
                                bgcolor: "#317276"
                            }
                        }}>Tambah Produk</Button>
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
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography sx={{ fontWeight: 600, fontSize: '20px', fontFamily: 'Axiforma', color: '#317276' }}>Laporan Produk</Typography>
                        <Box>
                            <Button id="print" onClick={printPDF} sx={{
                                width: '199px', height: '40px', backgroundColor: '#317276', fontFamily: 'Axiforma', color: 'white', ":hover": {
                                    bgcolor: "#317276"
                                }
                            }}>
                                Download
                            </Button>
                        </Box>
                        <Box className="page-agency">
                            <Box className='App' id="App">
                                <DataGrid
                                    autoHeight={true}
                                    rows={rows}
                                    // rows={Object.keys(dataHistoryChat).length !== 0 ? dataHistoryChat.map(item => ({
                                    //     ...item,
                                    //     userName: item.user_id?.userName,
                                    //     product_name: item.product_id?.product_name,
                                    // })) : ''}
                                    // getRowId={(row) => row._id}
                                    columns={columns2}
                                    // pageSize={10}
                                    initialState={{
                                        pagination: {
                                            paginationModel: {
                                                pageSize: 10,
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
                    </Box>
                </Box>
            </Dashboard>
        </>
    )
}

export default ProdukAdmin