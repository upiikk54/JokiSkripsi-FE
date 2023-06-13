import React from 'react'
import Dashboard from '../Dashboard'
import { DataGrid, gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import { Box, Button, Pagination, PaginationItem, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
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

function SatuanAdmin() {
    const columns = [
        { field: 'nama_satuan', headerName: 'Nama Satuan', width: 400, },
        {
            headerName: 'Aksi',
            type: 'Aksi',
            width: 250,
            sortable: false,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', gap: '8px' }}>
                    <Link to={`/admin/merk/${params.id}`}><Button sx={{
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

    const rows = [
        { id: 1, lastName: 'Snow', nama_satuan: 'Jon' },
        { id: 2, lastName: 'Lannister', nama_satuan: 'Cersei' },
        { id: 3, lastName: 'Lannister', nama_satuan: 'Jaime' },
        { id: 4, lastName: 'Stark', nama_satuan: 'Arya' },
        { id: 5, lastName: 'Targaryen', nama_satuan: 'Daenerys' },
        { id: 6, lastName: 'Melisandre', nama_satuan: null },
        { id: 7, lastName: 'Clifford', nama_satuan: 'Ferrara' },
        { id: 8, lastName: 'Frances', nama_satuan: 'Rossini' },
        { id: 9, lastName: 'Roxie', nama_satuan: 'Harvey' },
        { id: 10, lastName: 'Roxie', nama_satuan: 'Harvey' },
        { id: 11, lastName: 'Roxie', nama_satuan: 'Harvey' },
        { id: 12, lastName: 'Roxie', nama_satuan: 'Harvey' },
        { id: 13, lastName: 'Roxie', nama_satuan: 'Harvey' },
        { id: 14, lastName: 'Roxie', nama_satuan: 'Harvey' },
        { id: 15, lastName: 'Roxie', nama_satuan: 'Harvey' },
        { id: 16, lastName: 'Roxie', nama_satuan: 'Harvey' },
        { id: 17, lastName: 'Roxie', nama_satuan: 'Harvey' },
        { id: 18, lastName: 'Roxie', nama_satuan: 'Harvey' },
    ];
    return (
        <>
            <Dashboard>
<Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px', mt: '20px', width: '100%', maxWidth: '1440px' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography sx={{ fontWeight: 600, fontSize: '20px', fontFamily: 'Axiforma', color: '#317276' }}>Satuan</Typography>
                        <Button variant='contained' sx={{
                            width: '199px', height: '40px', backgroundColor: '#317276', fontFamily: 'Axiforma', ":hover": {
                                bgcolor: "black"
                            }
                        }}>Tambah Satuan</Button>
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

export default SatuanAdmin