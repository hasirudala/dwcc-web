import React from 'react'
import Spinner from 'react-bootstrap/Spinner'
import isNil from 'lodash/isNil'
import EditRecordModal from './EditRecordModal'
import { RecordType } from '../constants'
import IncomingRecords from '../incoming/IncomingRecords'
import OutgoingRecords from '../outgoing/OutgoingRecords'

export default function RecordsList({ recordType, records, forMonth, onMonthChange, onEdit }) {
    const [currentEdit, setCurrentEdit] = React.useState(null)

    const closeEditRecordModal = React.useCallback(() => {
        setCurrentEdit(null)
    }, [setCurrentEdit])

    const ListComponent = recordType === RecordType.Incoming ? IncomingRecords : OutgoingRecords

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
                />
            </>
    )
}
