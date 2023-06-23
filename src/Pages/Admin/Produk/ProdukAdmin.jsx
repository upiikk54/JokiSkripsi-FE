import React from 'react'
import Dashboard from '../Dashboard'
import { DataGrid, gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import { Box, Button, Pagination, PaginationItem, Stack, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useDispatch, useSelector } from 'react-redux';
import { getProductUnderKadaluarsa } from '../../../Redux/slices/ProductReducer';

function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
        <Pagination
            color="primary"
            variant="outlined"
            shape="rounded"
            page={page + 1}
            count={pageCount}
            renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
            onChange={(event, value) => apiRef.current.setPage(value - 1)}
        />
    );
}

function ProdukAdmin() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const productUnderKadaluarsa = useSelector(state => state.product.getDataProductUnderKadaluarsas)
    React.useEffect(() => {
        dispatch(getProductUnderKadaluarsa())
    }, [])

    const columns = [
        { field: 'productName', headerName: 'Nama Produk', width: 200 },
        { field: 'categoryName', headerName: 'Kategori', width: 150 },
        { field: 'brandName', headerName: 'Merk', width: 100 },
        { field: 'productStock', headerName: 'Stok', width: 100 },
        { field: 'unitName', headerName: 'Satuan', width: 100 },
        { field: 'productPrice', headerName: 'Harga', width: 150 },
        // { field: 'expired', headerName: 'Expired', width: 150 },
        {
            field: 'expiredDate', headerName: 'Expired', flex: 1,
                valueGetter: (params) => {
                const date = new Date(params.row.expiredDate);
                const formattedDate = date.toLocaleDateString();
                const formattedTime = date.toLocaleTimeString();
                return `${formattedDate} | ${formattedTime}`;
            },
        },
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
    ];
    const handleCreateProduk = () => {
        navigate('/admin/produk/create')
    }

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
                            rows={Object.keys(productUnderKadaluarsa).length !== 0 ? productUnderKadaluarsa.map(item => ({
                                ...item,
                                categoryName: item.category?.categoryName,
                                brandName: item.brand?.brandName,
                                unitName: item.unit?.unitName,
                            })) : ''}
                            getRowId={(row) => row.id}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 5,
                                    },
                                },
                            }}
                            rowsPerPageOptions={[10]}    
                            components={{
                                Pagination: CustomPagination,
                                NoRowsOverlay: () => (
                                    <Stack height="100%" alignItems="center" justifyContent="center">
                                        Tidak ada data yang tersedia di tabel ini
                                    </Stack>
                                ),
                                NoResultsOverlay: () => (
                                    <Stack height="100%" alignItems="center" justifyContent="center">
                                        Filter tidak menemukan hasil
                                    </Stack>
                                )
                            }}
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
                                    rows={productUnderKadaluarsa}
                                    getRowId={(row) => row.id}
                                    columns={columns2}
                                    initialState={{
                                        pagination: {
                                            paginationModel: {
                                                pageSize: 10,
                                            },
                                        },
                                    }}
                                    rowsPerPageOptions={[10]}    
                                    components={{
                                        Pagination: CustomPagination,
                                        NoRowsOverlay: () => (
                                            <Stack height="100%" alignItems="center" justifyContent="center">
                                                Tidak ada data yang tersedia di tabel ini
                                            </Stack>
                                        ),
                                        NoResultsOverlay: () => (
                                            <Stack height="100%" alignItems="center" justifyContent="center">
                                                Filter tidak menemukan hasil
                                            </Stack>
                                        )
                                    }}
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