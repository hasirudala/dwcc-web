import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Container from 'react-bootstrap/Container'
import Spinner from 'react-bootstrap/Spinner'
import axios from 'axios'
import isNil from 'lodash/isNil'
import IncomingDataEntryForm from './IncomingDataEntryForm'


export default function EditEntryModal({ showWhen, onClose, entryToEdit, onEdit }) {
    const [record, setRecord] = React.useState(null)

    React.useEffect(() => {
        entryToEdit &&
        axios
            .get(`/incomingWaste/${entryToEdit}`)
            .then(({ data }) => setRecord(data))
    }, [entryToEdit, setRecord])

    const handleClose = React.useCallback((updatedEntry, action) => {
        updatedEntry && onEdit(updatedEntry, action)
        setRecord(null)
        onClose()
    }, [onEdit, setRecord, onClose])

    return (
        <Modal show={showWhen} onHide={handleClose} onExit={handleClose} size="xl" scrollable>
            {isNil(record) ?
                <Modal.Body className="d-flex justify-content-center align-items-center"
                            style={{ minHeight: '20rem' }}
                >
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </Modal.Body>
                :
                <>
                    <Modal.Header closeButton style={{ backgroundColor: '#3B4E60' }}>
                        <Modal.Title className="d-flex align-items-center">
                            Editing Record Id #{record.id}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body  style={{ backgroundColor: '#2B3E50' }}>
                        <Container>
                            <IncomingDataEntryForm onFormSubmit={handleClose} edit existingRecord={record} />
                        </Container>
                    </Modal.Body>
                </>
            }
        </Modal>
    )
}
