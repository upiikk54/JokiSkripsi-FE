import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/system';
import { Theme } from './Theme/Theme';
import store from './Redux/store' 
import LoginPage from './Pages/LoginPage'
import DashboardAdmin from './Pages/Admin/DashboardAdmin/DashboardAdmin';
import MerkAdmin from './Pages/Admin/Merk/MerkAdmin';
import SatuanAdmin from './Pages/Admin/Satuan/SatuanAdmin';
import KategoriAdmin from './Pages/Admin/Kategori/KategoriAdmin';
import PemasokAdmin from './Pages/Admin/Pemasok/PemasokAdmin';
import ProdukAdmin from './Pages/Admin/Produk/ProdukAdmin';
import PembelianAdmin from './Pages/Admin/Pembelian/PembelianAdmin';
import PenjualanAdmin from './Pages/Admin/Penjualan/PenjualanAdmin';
import AddMerk from './Pages/Admin/Merk/AddMerk';
import UpdateMerk from './Pages/Admin/Merk/UpdateMerk';
import AddSatuan from './Pages/Admin/Satuan/AddSatuan';
import UpdateSatuan from './Pages/Admin/Satuan/UpdateSatuan';
import AddKategori from './Pages/Admin/Kategori/AddKategori';
import UpdateKategori from './Pages/Admin/Kategori/UpdateKategori';
import AddProduk from './Pages/Admin/Produk/AddProduk';
import UpdateProduk from './Pages/Admin/Produk/UpdateProduk';
import AddPemasok from './Pages/Admin/Pemasok/AddPemasok';
import UpdatePemasok from './Pages/Admin/Pemasok/UpdatePemasok';
import AddPembelian from './Pages/Admin/Pembelian/AddPembelian';
import AddPenjualan from './Pages/Admin/Penjualan/AddPenjualan';
import DetailPembelian from './Pages/Admin/Pembelian/DetailPembelian';
import DetailPenjualan from './Pages/Admin/Penjualan/DetailPenjualan';
import NotaPembelian from './Pages/Admin/Pembelian/NotaPembelian';
import NotaPenjualan from './Pages/Admin/Penjualan/NotaPenjualan';
import ReportBulananPembelian from './Pages/Admin/Pembelian/ReportBulananPembelian';
import ReportBulananPenjualan from './Pages/Admin/Penjualan/ReportBulananPenjualan';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router>
      <SnackbarProvider maxSnack={3}>
        <ThemeProvider theme={Theme}>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/admin/dashboard" element={<DashboardAdmin />} />
              <Route path="/admin/merk" element={<MerkAdmin />} />
              <Route path="/admin/merk/create" element={<AddMerk />} />
              <Route path="/admin/merk/update/:id" element={<UpdateMerk />} />
              <Route path="/admin/satuan" element={<SatuanAdmin />} />
              <Route path="/admin/satuan/create" element={<AddSatuan />} />
              <Route path="/admin/satuan/update/:id" element={<UpdateSatuan />} />
              <Route path="/admin/kategori" element={<KategoriAdmin />} />
              <Route path="/admin/kategori/create" element={<AddKategori />} />
              <Route path="/admin/kategori/update/:id" element={<UpdateKategori />} />
              <Route path="/admin/produk" element={<ProdukAdmin />} />
              <Route path="/admin/produk/create" element={<AddProduk />} />
              <Route path="/admin/produk/update/:id" element={<UpdateProduk />} />
              <Route path="/admin/pemasok" element={<PemasokAdmin />} />
              <Route path="/admin/pemasok/create" element={<AddPemasok />} />
              <Route path="/admin/pemasok/update/:id" element={<UpdatePemasok />} />
              <Route path="/admin/pembelian" element={<PembelianAdmin />} />
              <Route path="/admin/pembelian/:id" element={<DetailPembelian />} />
              <Route path="/admin/pembelian/create" element={<AddPembelian />} />
              <Route path="/admin/pembelian/nota/:id" element={<NotaPembelian />} />
              <Route path="/admin/pembelian/report" element={<ReportBulananPembelian />} />
              <Route path="/admin/penjualan" element={<PenjualanAdmin />} />
              <Route path="/admin/penjualan/:id" element={<DetailPenjualan />} />
              <Route path="/admin/penjualan/nota/:id" element={<NotaPenjualan />} />
              <Route path="/admin/penjualan/create" element={<AddPenjualan />} />
              <Route path="/admin/penjualan/report" element={<ReportBulananPenjualan />} />
            </Routes>
        </ThemeProvider>
      </SnackbarProvider>
      </Router>
  </Provider>
);
