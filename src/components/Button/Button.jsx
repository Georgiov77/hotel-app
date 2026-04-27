import './Button.css'

function Button({
                    children,
                    variant = 'primary',
                    size = 'md',
                    disabled = false,
                    onClick,
                }) {
    return (
        <button
            className={`btn btn--${variant} btn--${size}`}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button