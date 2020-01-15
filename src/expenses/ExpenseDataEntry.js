import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'

import CloseButton from '../common/components/FormCloseButton'
import ExpenseDataEntryForm from './ExpenseDataEntryForm'

export default function ExpenseDataEntry({ onNewEntry }) {
    const [formIsVisible, setFormVisible] = React.useState(false)
    const showForm = () => !formIsVisible && setFormVisible(true)

    const hideForm = React.useCallback(() => {
        setFormVisible(false)
    }, [setFormVisible])

    const onFormSubmit = React.useCallback((newRecord, addingNext) =>{
        onNewEntry(newRecord)
        !addingNext && hideForm()
    }, [onNewEntry, hideForm])

    return (
        <Container>
            <Row className="d-flex justify-content-center">
                <Button onClick={showForm}
                        aria-controls="expenseFormContainer"
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
                        <ExpenseDataEntryForm onFormSubmit={onFormSubmit} />
                    </div>
                </Collapse>
            </Row>
        </Container>
    )
}
