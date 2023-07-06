import React from 'react'
import Dashboard from '../Dashboard'
import { DataGrid, gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import { Alert, Box, Button, IconButton, Modal, Pagination, PaginationItem, Stack, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProductById, getProductUnderKadaluarsa } from '../../../Redux/slices/ProductReducer';
import { useSnackbar } from 'notistack';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '15px'
};

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
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const productUnderKadaluarsa = useSelector(state => state.product.getDataProductUnderKadaluarsas)
    React.useEffect(() => {
        dispatch(getProductUnderKadaluarsa())
    }, [])

    const handleDeleteProductById = (e, id) => {
        e.preventDefault()
        dispatch(deleteProductById(id)).then((res) => {
            if (res.payload.status === true || res.payload.statusCode === 200) {
                dispatch(getProductUnderKadaluarsa())
                enqueueSnackbar('Product Berhasil Di Hapus', { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 1500 });
            } else if (res.payload.status === false || res.payload.statusCode === 401) {
                enqueueSnackbar(`${res.payload.message}`, { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 1500 });
            } else {
                enqueueSnackbar(`Gagal menghapus kategori`, { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 1500 });
            }
        })
    }

    const columns = [
        { field: 'productName', headerName: 'Nama Produk', width: 200 },
        { field: 'categoryName', headerName: 'Kategori', width: 150 },
        { field: 'brandName', headerName: 'Merk', width: 100 },
        { field: 'productStock', headerName: 'Stok', width: 100 },
        { field: 'unitName', headerName: 'Satuan', width: 100 },
        {
            field: 'productPrice', headerName: 'Harga', width: 150, 
            valueGetter: (params) => {
                const currency = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(params.row.productPrice);
                return `${currency}`;
            }
        },
        {
            field: 'expiredDate', headerName: 'Expired', flex: 1,
            valueGetter: (params) => {
                const date = new Date(params.row.expiredDate);
                const formattedDate = date.toLocaleDateString();
                return `${formattedDate}`;
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
                    <Button onClick={(e) => handleDeleteProductById(e, params.id)} sx={{
                        textTransform: 'none', color: 'black', border: '1px solid #D2D5DA', borderRadius: '8px', ":hover": {
                            color: "red", border: '1px solid red'
                        },
                    }}><DeleteOutlineOutlinedIcon sx={{ width: '16px', mr: '8px' }} />Hapus</Button>
                </Box>
            )
        },
    ];
    const handleCreateProduk = () => {
        navigate('/admin/produk/create')
    }

    return (
        <>
            <Dashboard>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        {Object.keys(productUnderKadaluarsa).length !== 0 ? productUnderKadaluarsa.map((data, i) => {
                            const dates = data.expiredDate
                            const currentDate = new Date();
                            const expirationDate = new Date(dates);
                            const timeDifference = expirationDate.getTime() - currentDate.getTime();
                            const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
                            let message;
                            if (daysDifference > 0 && daysDifference <= 7) {
                                message = <Alert key={i} severity="warning">produk {data.productName} akan kadaluarsa {daysDifference} hari lagi</Alert>
                            } else if (daysDifference === 0) {
                                message = <Alert key={i} severity="warning">produk {data.productName} akan kadaluarsa hari ini</Alert>
                            }
                            return (
                                <>
                                    {message}
                                </>
                            )
                        }) : <Typography>tidak ada notifikasi</Typography>
                        }
                    </Box>
                </Modal>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px', mt: '20px', width: '100%', maxWidth: '1440px' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography sx={{ fontWeight: 600, fontSize: '20px', fontFamily: 'Axiforma', color: '#317276' }}>Produk</Typography>
                        <Box sx={{ display: 'flex', gap: '20px' }}>
                            <IconButton onClick={handleOpen}>
                                <NotificationsActiveIcon sx={{ color: '#317276' }} />
                            </IconButton>
                            <Button onClick={handleCreateProduk} variant='contained' sx={{
                                width: '199px', height: '40px', backgroundColor: '#317276', fontFamily: 'Axiforma', ":hover": {
                                    bgcolor: "#317276"
                                }
                            }}>Tambah Produk</Button>
                        </Box>
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
                </Box>
            </Dashboard>
        </>
    )
}

export default ProdukAdmin