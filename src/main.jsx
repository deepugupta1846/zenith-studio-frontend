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
import ActivatePage from './components/login/ActivatePage';
import AllRoutes from './assets/routes/AllRoutes';
// Import Slick Carousel styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
    <BrowserRouter>
      <AllRoutes/>
    </BrowserRouter>
    </MantineProvider>
    </Provider>
  </React.StrictMode>
);
