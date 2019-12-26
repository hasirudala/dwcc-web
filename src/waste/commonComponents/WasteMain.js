import React from 'react'

import useRecordsList from '../hooks/useRecordsList'
import SectionTitle from '../commonComponents/SectionTitle'
import ShowingRecordsForMonth from '../commonComponents/ShowingRecordsForMonth'
import RecordsList from './RecordsList'
import DataEntry from './DataEntry'
import { DwccContext } from '../../home/DwccContext'


export default function WasteMain({ recordType, title }) {
    const { dwcc } = React.useContext(DwccContext)
    const { records, selectedMonth, handleUpdate, handleMonthChange } = useRecordsList(dwcc, recordType)
    return (
        <>
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
