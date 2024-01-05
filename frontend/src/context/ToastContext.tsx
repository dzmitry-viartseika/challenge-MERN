import React, {
  createContext,
  ReactNode,
  useRef,
  useContext,
  useState,
} from 'react'
import { Toast } from 'primereact/toast'
interface IToastData {
  id: number
  severity: string
  summary: string
}

interface IToastContextType {
  showToast: (toastData: any) => void
  removeToast: (id: number) => void
}

interface IToastProviderProps {
  children: ReactNode
}

const ToastContext = createContext<IToastContextType | undefined>(undefined)

function validateSeverity(
  severity: string,
): 'success' | 'info' | 'warn' | 'error' | undefined {
  return ['success', 'info', 'warn', 'error'].includes(severity)
    ? (severity as 'success' | 'info' | 'warn' | 'error')
    : undefined
}

function ToastProvider({ children }: IToastProviderProps) {
  const [toasts, setToasts] = useState<IToastData[]>([])
  const toast = useRef<Toast>(null)
  const showToast = (toastData: IToastData) => {
    setToasts([...toasts, toastData])
    toast.current?.show({
      severity: validateSeverity(toastData.severity),
      summary: toastData.summary,
      life: 3000,
    })
  }

  const removeToast = (id: number) => {
    setToasts(toasts.filter((toast) => toast.id !== id))
  }

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
  )
}

function useToast() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

export { ToastProvider, useToast }
