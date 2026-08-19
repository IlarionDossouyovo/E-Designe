'use client'

import { useState, useEffect, createContext, useContext, ReactNode } from 'react'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'

type NotificationType = 'success' | 'error' | 'info' | 'warning'

interface Notification {
  id: string
  type: NotificationType
  message: string
  duration?: number
}

interface NotificationContextType {
  addNotification: (type: NotificationType, message: string, duration?: number) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider')
  }
  return context
}

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = (type: NotificationType, message: string, duration = 5000) => {
    const id = Date.now().toString()
    setNotifications(prev => [...prev, { id, type, message, duration }])
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      <NotificationContainer notifications={notifications} onRemove={removeNotification} />
    </NotificationContext.Provider>
  )
}

function NotificationContainer({ notifications, onRemove }: { notifications: Notification[]; onRemove: (id: string) => void }) {
  return (
    <div className="fixed top-20 right-6 z-50 space-y-3 max-w-md">
      {notifications.map(notification => (
        <NotificationToast key={notification.id} notification={notification} onRemove={onRemove} />
      ))}
    </div>
  )
}

function NotificationToast({ notification, onRemove }: { notification: Notification; onRemove: (id: string) => void }) {
  useEffect(() => {
    if (notification.duration) {
      const timer = setTimeout(() => onRemove(notification.id), notification.duration)
      return () => clearTimeout(timer)
    }
  }, [notification, onRemove])

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
  }

  const bgColors = {
    success: 'bg-green-500/10 border-green-500/30',
    error: 'bg-red-500/10 border-red-500/30',
    info: 'bg-blue-500/10 border-blue-500/30',
    warning: 'bg-yellow-500/10 border-yellow-500/30',
  }

  return (
    <div className={`flex items-start gap-3 p-4 rounded-xl border ${bgColors[notification.type]} backdrop-blur-xl animate-slide-in`}>
      {icons[notification.type]}
      <p className="text-white flex-1 text-sm">{notification.message}</p>
      <button onClick={() => onRemove(notification.id)} className="text-gray-400 hover:text-white">
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
