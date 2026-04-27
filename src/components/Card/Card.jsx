import './Card.css'

function Card({ title, children, footer, actions }) {
    return (
        <div className="card">
            {(title || actions) && (
                <div className="card__header">
                    {title && <h2 className="card__title">{title}</h2>}
                    {actions && <div>{actions}</div>}
                </div>
            )}
            <div className="card__body">
                {children}
            </div>
            {footer && (
                <div className="card__footer">
                    {footer}
                </div>
            )}
        </div>
    )
}

export default Card