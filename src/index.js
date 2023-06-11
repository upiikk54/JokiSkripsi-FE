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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <Provider store={store}>
    <Router>
      <SnackbarProvider maxSnack={3}>
        <ThemeProvider theme={Theme}>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              {/* <Route path="/admin/dashboard" element={<CategoryAdmin />} />
              <Route path="/admin/product" element={<ProductAdmin />} />
              <Route path="/admin/archives" element={<ArchivesPageAdmin />} />
              <Route path="/admin/history-chat" element={<HistoryChatPage />} />
              <Route path="/admin/dashboard/add-category" element={<AddCategoryAdmin />} />
              <Route path="/admin/dashboard/update-category/:id" element={<UpdateCategoryAdmin />} />
              <Route path="/admin/product/add-product" element={<AddProductAdmin />} />
              <Route path="/admin/product/update-product/:id" element={<UpdateProductAdmin />} /> */}
            </Routes>
        </ThemeProvider>
      </SnackbarProvider>
      </Router>
  // </Provider>
);
