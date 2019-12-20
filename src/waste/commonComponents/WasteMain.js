import React from 'react'

import useRecordsList from '../hooks/useRecordsList'
import SectionTitle from '../commonComponents/SectionTitle'
import ShowingRecordsForMonth from '../commonComponents/ShowingRecordsForMonth'
import WasteRecords from '../commonComponents/WasteRecords'
import DataEntry from './DataEntry'


export default function WasteMain({ recordType, title }) {
    const { state, handleUpdate, handleMonthChange } = useRecordsList(recordType)
    return (
        <>
            <SectionTitle title={title} />
            <DataEntry recordType={recordType} onNewEntry={handleUpdate} />
            <ShowingRecordsForMonth month={state.selectedMonth} />
            <WasteRecords recordType={recordType}
                          records={state.records}
                          onEdit={
                              (updatedEntry, action) =>
                                  handleUpdate(updatedEntry, action || 'edit')
                          }
                          forMonth={state.selectedMonth}
                          onMonthChange={handleMonthChange}
            />
        </>
    )
}
