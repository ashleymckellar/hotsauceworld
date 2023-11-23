import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserProvider from './context/UserProvider';
import SauceProvider from './context/SauceProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<UserProvider>
    <SauceProvider>
        <App />
    </SauceProvider>
</UserProvider>
    
);


