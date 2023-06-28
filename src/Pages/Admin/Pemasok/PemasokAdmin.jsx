import React from 'react'
import Dashboard from '../Dashboard'
import { DataGrid, gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import { Box, Button, Pagination, PaginationItem, Stack, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSupplierById, getAllSupplier } from '../../../Redux/slices/SupplierReducer';

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

function PemasokAdmin() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const dataSupplier = useSelector(state => state.supplier.getAllSuppliers);
    React.useEffect(() => {
        dispatch(getAllSupplier())
    }, [])

    const handleDeleteSupplierById = (e, id) => {
        e.preventDefault()
        dispatch(deleteSupplierById(id)).then((res) => {
            if (res.payload.status === true || res.payload.statusCode === 200) {
                dispatch(getAllSupplier())
                enqueueSnackbar('Merk Berhasil Di Hapus', { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 1500 });
            } else if (res.payload.status === false || res.payload.statusCode === 401) {
                enqueueSnackbar(`${res.payload.message}`, { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 1500 });
            } else {
                enqueueSnackbar(`Gagal menghapus kategori`, { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 1500 });
            }
        })
    }

    const columns = [
        { field: 'supplierName', headerName: 'Nama Pemasok', width: 150 },
        { field: 'contact', headerName: 'Telepon', width: 150 },
        { field: 'address', headerName: 'Alamat', width: 150 },
        { field: 'description', headerName: 'keterangan', width: 150 },
        {
            headerName: 'Aksi',
            type: 'Aksi',
            width: 200,
            sortable: false,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', gap: '8px' }}>
                    <Link to={`/admin/pemasok/update/${params.id}`}><Button sx={{
                        textTransform: 'none', color: 'black', border: '1px solid #D2D5DA', borderRadius: '8px', ":hover": {
                            color: "yellow", border: '1px solid yellow'
                        },
                    }}><ModeEditOutlineOutlinedIcon sx={{ width: '16px', mr: '8px' }} />Edit</Button></Link>
                    <Button onClick={(e) => handleDeleteSupplierById(e, params.id)} sx={{
                        textTransform: 'none', color: 'black', border: '1px solid #D2D5DA', borderRadius: '8px', ":hover": {
                            color: "red", border: '1px solid red'
                        },
                    }}><DeleteOutlineOutlinedIcon sx={{ width: '16px', mr: '8px' }} />Hapus</Button>
                </Box>
            )
        },
    ];

    const handleCreatePemasok = () => {
        navigate('/admin/pemasok/create')
    }

    return (
        <>
            <Dashboard>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px', mt: '20px', width: '100%', maxWidth: '1440px' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography sx={{ fontWeight: 600, fontSize: '20px', fontFamily: 'Axiforma', color: '#317276' }}>Pemasok</Typography>
                        <Button onClick={handleCreatePemasok} variant='contained' sx={{
                            width: '199px', height: '40px', backgroundColor: '#317276', fontFamily: 'Axiforma', ":hover": {
                                bgcolor: "#317276"
                            }
                        }}>Tambah Pemasok</Button>
                    </Box>
                    <Box sx={{ height: 'auto', overflow: "auto", width: '100%' }}>
                        <DataGrid
                            autoHeight={true}
                            rows={dataSupplier}
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

export default PemasokAdmin