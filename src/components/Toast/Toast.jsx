import useToastStore from '@stores/useToastStore'
import './Toast.css'

function Toast() {
    const { toasts, removeToast } = useToastStore()

    if (!toasts.length) return null

    return (
        <div className="toast-container">
            {toasts.map((t) => (
                <div key={t.id} className={`toast toast--${t.type}`}>
                    <span className="toast__message">{t.message}</span>
                    <span className="toast__close" onClick={() => removeToast(t.id)}>✕</span>
                </div>
            ))}
        </div>
    )
}

export default Toast