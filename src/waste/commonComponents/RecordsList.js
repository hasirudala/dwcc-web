import React from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import isNil from 'lodash/isNil'
import { format } from 'date-fns'
import ReportProblemIcon from '@material-ui/icons/ReportProblem'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import EditRecordModal from './EditRecordModal'
import MonthPicker from '../incoming/MonthPicker'
import { RecordType } from '../constants'


export default function RecordsList({ recordType, records, forMonth, onMonthChange, onEdit }) {
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
                <Table striped hover className="mt-3">
                    <thead>
                    <tr>
                        <th>Date</th>
                        {recordType === RecordType.Incoming && <th>Flags</th>}
                        <th className="d-flex justify-content-end align-items-center">
                            <span className="font-weight-light">Filter</span> &nbsp;&nbsp;
                            <MonthPicker selectedMonth={forMonth} onMonthChange={onMonthChange} />
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        records.map((record, idx) =>
                            <tr key={idx}
                                className={
                                    recordType === RecordType.Incoming &&
                                    record.errorsIgnored && !record.approvedByAdmin ?
                                        'text-warning'
                                        :
                                        ''
                                }
                            >
                                <td>{format(new Date(record.date), 'd MMM yyyy, EEEE')}</td>
                                {
                                    recordType === RecordType.Incoming &&
                                    <td>
                                        {
                                            record.errorsIgnored && <ReportProblemIcon className="mr-2" />
                                        }
                                        {
                                            record.approvedByAdmin && <CheckCircleIcon />
                                        }
                                    </td>
                                }
                                <td className="d-flex justify-content-end">
                                    <Button variant="secondary" size="sm" onClick={() => setCurrentEdit(record.id)}>
                                        edit
                                    </Button>
                                </td>
                            </tr>
                        )
                    }
                    </tbody>
                </Table>
                <EditRecordModal showWhen={!isNil(currentEdit)}
                                 onClose={closeEditRecordModal}
                                 entryToEdit={currentEdit}
                                 onEdit={onEdit}
                                 recordType={recordType}
                />
            </>
    )
}
