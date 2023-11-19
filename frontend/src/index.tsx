import React from 'react';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import Router from './router/router'
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import {ErrorBoundary} from "react-error-boundary";
import ErrorPage from "./pages/ErrorPage";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <StrictMode>
        <ErrorBoundary fallback={<p>Something went wrong. Try again later.</p>} FallbackComponent={ErrorPage}>
            <BrowserRouter>
                <Router />
            </BrowserRouter>
        </ErrorBoundary>
    </StrictMode>
);
