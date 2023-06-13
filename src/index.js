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
              <Route path="/admin/satuan" element={<SatuanAdmin />} />
              <Route path="/admin/kategori" element={<KategoriAdmin />} />
              <Route path="/admin/produk" element={<ProdukAdmin />} />
              <Route path="/admin/pemasok" element={<PemasokAdmin />} />
              <Route path="/admin/pembelian" element={<PembelianAdmin />} />
              <Route path="/admin/penjualan" element={<PenjualanAdmin />} />
            </Routes>
        </ThemeProvider>
      </SnackbarProvider>
      </Router>
  </Provider>
);
