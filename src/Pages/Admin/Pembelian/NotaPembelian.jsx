import React from 'react'
import Dashboard from '../Dashboard'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Box, Button, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPurchaseById } from '../../../Redux/slices/PurchaseReducer';

function NotaPembelian() {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { id } = useParams();

    const dataPurchase = useSelector(state => state.purchase.getDataPurchaseSingle)
    React.useEffect(() => {
        dispatch(getPurchaseById(id))
    }, [])

    const parsedDate = new Date(dataPurchase.transactionDate);
    const month = parsedDate.getMonth() + 1;
    const day = parsedDate.getDate();
    const year = parsedDate.getFullYear();
    const formattedDate = `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;

    const totalBiaya = dataPurchase.amount * dataPurchase.purchasePrice
    const currencyCost = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(dataPurchase.purchasePrice);
    const totalCurrency = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(totalBiaya);

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
            enqueueSnackbar('Laporan berhasil di download', { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 1500 });
        });
    };
    return (
        <>
            <Dashboard>
                <Box>
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
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography variant="h6" noWrap component="div" sx={{ fontSize: '24px', color: '#317276', fontFamily: 'Axiforma' }}>Warehouse Hub</Typography>
                            <Typography sx={{ fontSize: { xs: '12px', sm: '15px', md: '20px' }, fontWeight: 600, }}>Nota Pembelian</Typography>
                        </Box>
                        {Object.keys(dataPurchase).length !== 0 ?
                            <Box sx={{ px: '36px', py: '36px' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #D2D5DA' }}>
                                        <Typography sx={{ fontSize: { xs: '12px', sm: '15px', md: '20px' }, fontWeight: 400 }}>Kode Pembelian</Typography>
                                        <Typography sx={{ fontSize: { xs: '12px', sm: '15px', md: '20px' }, fontWeight: 600, }}>{dataPurchase.transactionCode}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #D2D5DA' }}>
                                        <Typography sx={{ fontSize: { xs: '12px', sm: '15px', md: '20px' }, fontWeight: 400 }}>Tanggal Pembelian</Typography>
                                        <Typography sx={{ fontSize: { xs: '12px', sm: '15px', md: '20px' }, fontWeight: 600 }}>{formattedDate}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #D2D5DA' }}>
                                        <Typography sx={{ fontSize: { xs: '12px', sm: '15px', md: '20px' }, fontWeight: 400 }}>Nama Produk</Typography>
                                        <Typography sx={{ fontSize: { xs: '12px', sm: '15px', md: '20px' }, fontWeight: 600 }}>{dataPurchase.product.productName}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #D2D5DA' }}>
                                        <Typography sx={{ fontSize: { xs: '12px', sm: '15px', md: '20px' }, fontWeight: 400 }}>Jumlah</Typography>
                                        <Typography sx={{ fontSize: { xs: '12px', sm: '15px', md: '20px' }, fontWeight: 600 }}>{dataPurchase.amount}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #D2D5DA' }}>
                                        <Typography sx={{ fontSize: { xs: '12px', sm: '15px', md: '20px' }, fontWeight: 400 }}>Biaya</Typography>
                                        <Typography sx={{ fontSize: { xs: '12px', sm: '15px', md: '20px' }, fontWeight: 600 }}>{currencyCost}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #D2D5DA' }}>
                                        <Typography sx={{ fontSize: { xs: '12px', sm: '15px', md: '20px' }, fontWeight: 400 }}>Total Biaya</Typography>
                                        <Typography sx={{ fontSize: { xs: '12px', sm: '15px', md: '20px' }, fontWeight: 600 }}>{totalCurrency}</Typography>
                                    </Box>
                                </Box>
                            </Box>
                            :
                            <Typography>
                                Loading...
                            </Typography>
                        }
                    </Box>
                </Box>
            </Dashboard>
        </>
    )
}

export default NotaPembelian