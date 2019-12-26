import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import CloseIcon from '@material-ui/icons/Close'
import IncomingDataEntryForm from '../incoming/IncomingDataEntryForm'
import OutgoingDataEntryForm from '../outgoing/OutgoingDataEntryForm'
import { RecordType } from '../constants'


export default function DataEntry({ recordType, onNewEntry }) {
    const [formIsVisible, setFormVisible] = React.useState(false)
    const showForm = () => !formIsVisible && setFormVisible(true)

    const hideForm = React.useCallback(() => {
        setFormVisible(false)
    }, [setFormVisible])

    const onFormSubmit = React.useCallback((newRecord, addingNext) =>{
        onNewEntry(newRecord)
        !addingNext && hideForm()
    }, [onNewEntry, hideForm])

    const FormComponent = recordType === RecordType.Incoming ? IncomingDataEntryForm : OutgoingDataEntryForm

    return (
        <Container>
            <Row className="d-flex justify-content-center">
                <Button onClick={showForm}
                        aria-controls="dtdFormContainer"
                        aria-expanded={formIsVisible}
                >
                    <AddCircleOutlineIcon className="mr-2" />
                    New record
                </Button>
            </Row>
            <Row>
                <Collapse in={formIsVisible}>
                    <div id="formContainer"
                         className="border border-dark p-4 w-100 mt-2"
                         style={{ borderRadius: '4px' }}
                    >
                        <CloseButton onClose={hideForm} />
                        <FormComponent onFormSubmit={onFormSubmit} />
                    </div>
                </Collapse>
            </Row>
        </Container>
    )
}

const CloseButton = ({ onClose }) =>
    <Button variant="link"
            onClick={onClose}
            className="close"
            aria-label="Close"
    >
        <span aria-hidden="true"><CloseIcon color="secondary" /></span>
    </Button>
