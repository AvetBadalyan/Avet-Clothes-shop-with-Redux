import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Icon from './Icon.jsx'
import { useAppDispatch, useAppSelector } from '@/store/hooks.js'
import { selectToasts, dismissToast } from '@/store/uiSlice.js'
import './ToastStack.scss'

const icons = { success: 'check', info: 'heart', error: 'close' }

function Toast({ toast }) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const t = setTimeout(() => dispatch(dismissToast(toast.id)), 3000)
    return () => clearTimeout(t)
  }, [toast.id, dispatch])

  return (
    <motion.div
      className={`toast toast--${toast.type}`}
      role={toast.type === 'error' ? 'alert' : 'status'}
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ type: 'spring', damping: 24, stiffness: 320 }}
    >
      <span className="toast__icon">
        <Icon
          name={icons[toast.type] ?? 'check'}
          size={16}
        />
      </span>
      <span className="toast__msg">{toast.message}</span>
      <button
        className="toast__close"
        onClick={() => dispatch(dismissToast(toast.id))}
        aria-label="Dismiss"
      >
        <Icon
          name="close"
          size={14}
        />
      </button>
    </motion.div>
  )
}

export default function ToastStack() {
  const toasts = useAppSelector(selectToasts)

  return (
    <div
      className="toast-stack"
      aria-live="polite"
    >
      <AnimatePresence>
        {toasts.map((t) => (
          <Toast
            key={t.id}
            toast={t}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
