import React, { createContext, ReactNode, useRef, useContext, useState } from 'react';
import { Toast } from 'primereact/toast';
interface ToastData {
    id: number;
    severity: string;
    summary: string;
}

interface ToastContextType {
    showToast: (toastData: any) => void;
    removeToast: (id: number) => void;
}

interface ToastProviderProps {
    children: ReactNode;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

function validateSeverity(severity: string): "success" | "info" | "warn" | "error" | undefined {
    return ['success', 'info', 'warn', 'error'].includes(severity) ? severity as "success" | "info" | "warn" | "error" : undefined;
}

function ToastProvider({ children }: ToastProviderProps) {
    const [toasts, setToasts] = useState<ToastData[]>([]);
    const toast = useRef<Toast>(null);
    const showToast = (toastData: ToastData) => {
        setToasts([...toasts, toastData]);
        toast.current?.show({    severity: validateSeverity(toastData.severity)
            , summary: toastData.summary, detail:'Message Content', life: 3000});
    };

    const removeToast = (id: number) => {
        setToasts(toasts.filter((toast) => toast.id !== id));
    };

    return (
        <ToastContext.Provider value={{ showToast, removeToast }}>
            {children}
            <Toast ref={toast} /> {/* Add the Toast component */}
            {toasts.map((toast) => (
                <div key={toast.id} className={`toast ${toast.severity}`}>
                    {toast.summary}
                    <button onClick={() => removeToast(toast.id)}>Close</button>
                </div>
            ))}
        </ToastContext.Provider>
    );
}

function useToast() {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}

export { ToastProvider, useToast };