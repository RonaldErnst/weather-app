import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import Modal from "react-modal";
import 'leaflet/dist/leaflet.css';

Modal.setAppElement("#modal-root");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
