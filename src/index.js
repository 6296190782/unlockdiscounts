// index.js
// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import { ProductProvider } from './contexts/ProductContext';

// ReactDOM.render(
//   <React.StrictMode>
//     <ProductProvider>
//         <App />
//     </ProductProvider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );




import React from 'react';
import { createRoot } from 'react-dom/client'; 
import './index.css';
import App from './App';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { ProductProvider } from './contexts/ProductContext';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ProductProvider>
      <App />
    </ProductProvider>
  </React.StrictMode>
);
