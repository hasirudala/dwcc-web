import React from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { format } from 'date-fns'
import MonthPicker from '../../common/components/MonthPicker'


export default function IncomingRecords({ records, forMonth, onMonthChange, onEdit }) {
    return (
        <Table striped hover className="mt-3">
            <thead>
            <tr>
                <th>Date</th>
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
                    >
                        <td>{format(new Date(record.date), 'd MMM yyyy')}</td>
                        <td className="d-flex justify-content-end">
                            <Button variant="secondary" size="sm" onClick={() => onEdit(record.id)}>
                                edit
                            </Button>
                        </td>
                    </tr>
                )
            }
            </tbody>
        </Table>
    )
}
