import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'; // importing app component from app.js

// Display the App component in the "root" element:
ReactDOM.render(
  <React.StrictMode>
    <App />                  {/* rendering app component, whenever chnages will happen in app component then render method will call itself automatically */}
  </React.StrictMode>,
  document.getElementById('root')
);
