import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
// import Booking from './pages/Booking';
// import Contact from './pages/Contact';
// import Weddings from './pages/Weddings';
// import Portraits from './pages/Portraits';
import './index.css';
import OrderPage from './components/orderPage/OrderPage';
import LoginPage from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';
import RegisterPage from './components/login/RegisterPage';
import { MantineProvider } from "@mantine/core";
import { store } from './store/store';
import { Provider } from "react-redux";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
    </MantineProvider>
    </Provider>
  </React.StrictMode>
);
