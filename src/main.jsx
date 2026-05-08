import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { initLenis } from './lib/lenis'

import 'swiper/css';
import 'swiper/css/pagination';

initLenis();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)