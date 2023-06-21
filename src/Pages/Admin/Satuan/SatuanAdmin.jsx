import React from 'react'
import Dashboard from '../Dashboard'
import { DataGrid, gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import { Box, Button, Pagination, PaginationItem, Stack, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUnitById, getAllUnit } from '../../../Redux/slices/UnitReducer';
import { useSnackbar } from 'notistack';

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

function SatuanAdmin() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const dataUnit = useSelector(state => state.unit.getDataUnit);
    React.useEffect(() => {
        dispatch(getAllUnit())
    }, [])

    const handleDeleteUnitById = (e, id) => {
        e.preventDefault()
        dispatch(deleteUnitById(id)).then((res) => {
            if (res.payload.status === true || res.payload.statusCode === 200) {
                dispatch(getAllUnit())
                enqueueSnackbar('Unit Berhasil Di Hapus', { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 1500 });
            }else if (res.payload.status === false || res.payload.statusCode === 401) {
                enqueueSnackbar(`${res.payload.message}`, { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 1500 });
            } else {
                enqueueSnackbar(`Gagal menghapus kategori`, { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 1500 });
            }
        })
    }

    const columns = [
        { field: 'unitName', headerName: 'Nama Satuan', width: 400, },
        {
            headerName: 'Aksi',
            type: 'Aksi',
            width: 250,
            sortable: false,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', gap: '8px' }}>
                    <Link to={`/admin/satuan/update/${params.id}`}><Button sx={{
                        textTransform: 'none', color: 'black', border: '1px solid #D2D5DA', borderRadius: '8px', ":hover": {
                            color: "yellow", border: '1px solid yellow'
                        },
                    }}><ModeEditOutlineOutlinedIcon sx={{ width: '16px', mr: '8px' }} />Edit</Button></Link>
                    <Button onClick={(e) => handleDeleteUnitById(e, params.id)} sx={{
                        textTransform: 'none', color: 'black', border: '1px solid #D2D5DA', borderRadius: '8px', ":hover": {
                            color: "red", border: '1px solid red'
                        },
                    }}><DeleteOutlineOutlinedIcon sx={{ width: '16px', mr: '8px' }} />Hapus</Button>
                </Box>
            )
        },
    ];
    const handleCreateSatuan = () => {
        navigate('/admin/satuan/create')
    }
    return (
        <>
            <Dashboard>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px', mt: '20px', width: '100%', maxWidth: '1440px' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography sx={{ fontWeight: 600, fontSize: '20px', fontFamily: 'Axiforma', color: '#317276' }}>Satuan</Typography>
                        <Button onClick={handleCreateSatuan} variant='contained' sx={{
                            width: '199px', height: '40px', backgroundColor: '#317276', fontFamily: 'Axiforma', ":hover": {
                                bgcolor: "#317276"
                            }
                        }}>Tambah Satuan</Button>
                    </Box>
                    <Box sx={{ height: 'auto', overflow: "auto", width: '100%' }}>
                        <DataGrid
                            autoHeight={true}
                            rows={dataUnit}
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

export default SatuanAdmin