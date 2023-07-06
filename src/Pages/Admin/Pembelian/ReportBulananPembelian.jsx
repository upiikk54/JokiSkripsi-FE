import React from 'react'
import Dashboard from '../Dashboard'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import axios from 'axios';
import YearPicker from "react-year-picker";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useSnackbar } from 'notistack';

function ReportBulananPembelian() {
    const { enqueueSnackbar } = useSnackbar();
    const [purchaseDatas, setPurchaseDatas] = React.useState([]);
    const [month, setMonth] = React.useState("");
    const [year, setYear] = React.useState("");

    const months = month ? `month=${month}` : ""
    const years = year ? `&year=${year}` : ""

    const getReportByMonthAndYear = async () => {
        try {
            const token = localStorage.getItem("token");
            const dataPurchase = await axios.get(
                `http://localhost:8811/v1/purchase-laporan?${months}${years}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            const payloadData = await dataPurchase.data.data;
            if (await dataPurchase.data.status) {
                enqueueSnackbar(`data pembelian berhasil ditampilkan`, { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 3000 });
                setPurchaseDatas(payloadData)
            }
        } catch (err) {
            enqueueSnackbar(`${err.message}`, { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 3000 });
        }
    }

    const handleChangeMonth = (event) => {
        setMonth(event.target.value);
    };

    const handleChangeYear = (date) => {
        setYear(date);
    }

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
            pdf.save(`Laporan-pembelian.pdf`);
            enqueueSnackbar('Laporan berhasil di download', { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 1500 });
        });
    };
    return (
        <>
            <Dashboard>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px', mt: '20px', width: '100%', maxWidth: '1440px' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', gap: '10px' }}>
                            <FormControl sx={{ width: '100px' }}>
                                <InputLabel id="demo-simple-select-label">Bulan</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={month}
                                    label="Bulan"
                                    onChange={handleChangeMonth}
                                >
                                    <MenuItem value={1}>Januari</MenuItem>
                                    <MenuItem value={2}>Februari</MenuItem>
                                    <MenuItem value={3}>Maret</MenuItem>
                                    <MenuItem value={4}>April</MenuItem>
                                    <MenuItem value={5}>Mei</MenuItem>
                                    <MenuItem value={6}>Juni</MenuItem>
                                    <MenuItem value={7}>Juli</MenuItem>
                                    <MenuItem value={8}>Agustus</MenuItem>
                                    <MenuItem value={9}>September</MenuItem>
                                    <MenuItem value={10}>Oktober</MenuItem>
                                    <MenuItem value={11}>November</MenuItem>
                                    <MenuItem value={12}>Desember</MenuItem>
                                </Select>
                            </FormControl>
                            <YearPicker onChange={handleChangeYear} />
                        </Box>
                        <Button onClick={getReportByMonthAndYear} variant='contained' sx={{
                            width: '199px', height: '40px', backgroundColor: '#317276', fontFamily: 'Axiforma', ":hover": {
                                bgcolor: "#317276"
                            }
                        }}>Cari</Button>
                    </Box>
                    <Box sx={{ display: purchaseDatas.length !== 0 ? 'block' : 'none' }}>
                        <Button id="print" onClick={printPDF} sx={{
                            position: 'absolute', mt: '10px', width: '199px', height: '40px', backgroundColor: '#317276', fontFamily: 'Axiforma', color: 'white', ":hover": {
                                bgcolor: "#317276"
                            }
                        }}>
                            Download
                        </Button>
                    </Box>
                    <Box className="page-agency">
                        <Box className='App' id="App">
                            {Object.keys(purchaseDatas).length !== 0 ? (
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Kode Transaksi</TableCell>
                                            <TableCell align="right">Tanggal Pembelian</TableCell>
                                            <TableCell align="right">Nama Produk</TableCell>
                                            <TableCell align="right">Jumlah</TableCell>
                                            <TableCell align="right">Total Biaya</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {Object.keys(purchaseDatas).length !== 0 ? purchaseDatas.map((data, i) => (
                                            <TableRow
                                                key={i}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {data.transactionCode}
                                                </TableCell>
                                                <TableCell align="right">{new Date(data.transactionDate).toLocaleDateString()}</TableCell>
                                                <TableCell align="right">{data.product.productName}</TableCell>
                                                <TableCell align="right">{data.amount}</TableCell>
                                                <TableCell align="right">{data.amount * data.purchasePrice}</TableCell>
                                            </TableRow>
                                        )) :
                                            <Typography>data tidak ada</Typography>}
                                    </TableBody>
                                </Table>
                            ) : <Typography>data tidak ada</Typography>}
                        </Box>
                    </Box>
                </Box>
            </Dashboard>
        </>
    )
}

export default ReportBulananPembelian