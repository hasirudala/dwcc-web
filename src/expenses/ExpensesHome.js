import React from 'react'
import Row from 'react-bootstrap/Row'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { LinkContainer } from 'react-router-bootstrap'

import { DwccContext } from '../home/DwccContext'
import useRecordsList from '../common/hooks/useRecordsList'
import SectionTitle from '../common/components/SectionTitle'
import ExpenseDataEntry from './ExpenseDataEntry'
import ShowingRecordsForMonth from '../common/components/ShowingRecordsForMonth'
import RecordsList from '../common/components/RecordsList'
import { RecordType } from '../common/constants'
import ExpenseRecords from './ExpenseRecords'
import ExpenseDataEntryForm from './ExpenseDataEntryForm'


export default function ExpensesHome() {
    const { dwcc } = React.useContext(DwccContext)
    const { records, selectedMonth, handleUpdate, handleMonthChange } = useRecordsList(dwcc, RecordType.Expense)
    return (
        <>
            <Row>
                <Breadcrumb>
                    <LinkContainer to='/'>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                    </LinkContainer>
                    <Breadcrumb.Item active>Expenses</Breadcrumb.Item>
                </Breadcrumb>
            </Row>
            <SectionTitle title="Expenses" />
            <ExpenseDataEntry onNewEntry={handleUpdate} />
            <ShowingRecordsForMonth month={selectedMonth} />
            <RecordsList records={records}
                         recordType={RecordType.Expense}
                         onEdit={
                             (updatedEntry, action) =>
                                 handleUpdate(updatedEntry, action || 'edit')
                         }
                         forMonth={selectedMonth}
                         onMonthChange={handleMonthChange}
                         ListComponent={ExpenseRecords}
                         FormComponent={ExpenseDataEntryForm}
            />
        </>
    )
}
