// App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AppRoutes from './routes';

const App = () => (
  <Router>
    <Header />
    <AppRoutes />
    <Footer />
  </Router>
);

export default App;
