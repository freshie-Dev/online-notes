import React from 'react'

export const Alert = (props) => {
    return (
        <div>
            <div className={`alert alert-${props.type}`} role="alert">
                <strong>{props.message}</strong>
            </div>
        </div>
    )
}
