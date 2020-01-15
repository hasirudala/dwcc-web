import React from 'react'
import Button from 'react-bootstrap/Button'
import CloseIcon from '@material-ui/icons/Close'

export default function FormCloseButton({ onClose }) {
    return (
        <Button variant="link"
                onClick={onClose}
                className="close"
                aria-label="Close"
        >
            <span aria-hidden="true"><CloseIcon color="secondary" /></span>
        </Button>
    )
}
