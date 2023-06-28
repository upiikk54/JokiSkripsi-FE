import React from 'react'
import Dashboard from '../Dashboard'
import { DataGrid, gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import { Box, Button, Pagination, PaginationItem, Stack, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FilePresentOutlinedIcon from '@mui/icons-material/FilePresentOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { deletePurchaseById, getAllPurchase } from '../../../Redux/slices/PurchaseReducer';

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

function PembelianAdmin() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const dataPurchase = useSelector(state => state.purchase.getAllPurchases);
    React.useEffect(() => {
        dispatch(getAllPurchase())
    }, [])

    const handleDeletePurchaseById = (e, id) => {
        e.preventDefault()
        dispatch(deletePurchaseById(id)).then((res) => {
            if (res.payload.status === true || res.payload.statusCode === 200) {
                dispatch(getAllPurchase())
                enqueueSnackbar('Transaksi Berhasil Di Hapus', { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 1500 });
            } else if (res.payload.status === false || res.payload.statusCode === 401) {
                enqueueSnackbar(`${res.payload.message}`, { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 1500 });
            } else {
                enqueueSnackbar(`Gagal menghapus kategori`, { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 1500 });
            }
        })
    };

    const columns = [
        { field: 'transactionCode', headerName: 'Kode Transaksi', width: 150 },
        { field: 'Pemasok', headerName: 'Pemasok', width: 150 },
        {
            field: 'transactionDate', headerName: 'Tanggal', flex: 1,
            valueGetter: (params) => {
                const date = new Date(params.row.createdAt);
                const formattedDate = date.toLocaleDateString();
                return `${formattedDate}`;
            },
        },
        {
            field: 'totalHarga',
            headerName: 'Total Harga',
            flex: 1,
            valueGetter: (params) => params.row.amount * params.row.purchasePrice,
        },
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
                    <Button onClick={(e) => handleDeletePurchaseById(e, params.id)} sx={{
                        textTransform: 'none', color: 'black', border: '1px solid #D2D5DA', borderRadius: '8px', ":hover": {
                            color: "red", border: '1px solid red'
                        },
                    }}><DeleteOutlineOutlinedIcon sx={{ width: '16px', mr: '8px' }} />Hapus</Button>
                </Box>
            )
        },
    ];
    const handleCreatePembelian = () => {
        navigate('/admin/pembelian/create')
    }

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
                            // rows={dataPurchase}
                            rows={Object.keys(dataPurchase).length !== 0 ? dataPurchase.map(item => ({
                                ...item,
                                Pemasok: item.supplier?.supplierName,
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
                </Box>
            </Dashboard>
        </>
    )
}

export default PembelianAdmin