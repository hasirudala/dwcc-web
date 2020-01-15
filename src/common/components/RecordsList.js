import React from 'react'
import Spinner from 'react-bootstrap/Spinner'
import isNil from 'lodash/isNil'
import EditRecordModal from './EditRecordModal'


export default function RecordsList(
    {
        recordType,
        records,
        forMonth,
        onMonthChange,
        onEdit,
        ListComponent,
        FormComponent
    }) {
    const [currentEdit, setCurrentEdit] = React.useState(null)

    const closeEditRecordModal = React.useCallback(() => {
        setCurrentEdit(null)
    }, [setCurrentEdit])

    return (
        isNil(records) ?
            <div className="d-flex justify-content-center align-items-center"
                 style={{ minHeight: '20rem' }}
            >
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
            :
            <>
                <ListComponent records={records}
                               forMonth={forMonth}
                               onMonthChange={onMonthChange}
                               onEdit={setCurrentEdit}
                />
                <EditRecordModal showWhen={!isNil(currentEdit)}
                                 onClose={closeEditRecordModal}
                                 entryToEdit={currentEdit}
                                 onEdit={onEdit}
                                 recordType={recordType}
                                 FormComponent={FormComponent}
                />
            </>
    )
}
