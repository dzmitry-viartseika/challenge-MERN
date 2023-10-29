import React from 'react';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import Router from './router/router'
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <StrictMode>
        <BrowserRouter>
            <Router />
        </BrowserRouter>
    </StrictMode>
);
