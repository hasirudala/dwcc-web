import React from 'react'
import Row from 'react-bootstrap/Row'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { LinkContainer } from 'react-router-bootstrap'

import useRecordsList from '../hooks/useRecordsList'
import SectionTitle from '../commonComponents/SectionTitle'
import ShowingRecordsForMonth from '../commonComponents/ShowingRecordsForMonth'
import RecordsList from './RecordsList'
import DataEntry from './DataEntry'
import { DwccContext } from '../../home/DwccContext'
import { RecordType } from '../constants'


export default function WasteMain({ recordType, title }) {
    const { dwcc } = React.useContext(DwccContext)
    const { records, selectedMonth, handleUpdate, handleMonthChange } = useRecordsList(dwcc, recordType)
    return (
        <>
            <Row>
                <Breadcrumb>
                    <LinkContainer to='/'><Breadcrumb.Item>Home</Breadcrumb.Item></LinkContainer>
                    <LinkContainer to='/waste'><Breadcrumb.Item>Waste</Breadcrumb.Item></LinkContainer>
                    <Breadcrumb.Item active>
                        {recordType === RecordType.Incoming ? 'Incoming' : 'Outgoing'}
                    </Breadcrumb.Item>
                </Breadcrumb>
            </Row>
            <SectionTitle title={title} />
            <DataEntry recordType={recordType} onNewEntry={handleUpdate} />
            <ShowingRecordsForMonth month={selectedMonth} />
            <RecordsList recordType={recordType}
                         records={records}
                         onEdit={
                             (updatedEntry, action) =>
                                 handleUpdate(updatedEntry, action || 'edit')
                         }
                         forMonth={selectedMonth}
                         onMonthChange={handleMonthChange}
            />
        </>
    )
}
