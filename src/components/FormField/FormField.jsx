import './FormField.css'

function FormField({ label, error, hint, children }) {
    return (
        <div className="form-field">
            {label && (
                <label className="form-field__label">{label}</label>
            )}
            {children}
            {error && (
                <span className="form-field__error">{error}</span>
            )}
            {hint && (
                <span className="form-field__hint">{hint}</span>
            )}
        </div>
    )
}

export default FormField