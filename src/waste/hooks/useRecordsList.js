import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import remove from 'lodash/remove'


export default function useRecordsList(dwcc, recordType) {
    const [records, setRecords] = useState(null)
    const [selectedMonth, setSelectedMonth] = useState(new Date())

    const fetchRecordsByMonthYear = useCallback((dwcc, selectedMonth) => {
        axios.get(`/${recordType}/search/getDwccRecordsByMonthYear`, {
                params: {
                    m: selectedMonth.getMonth() + 1,
                    y: selectedMonth.getFullYear(),
                    dwccId: dwcc.id,
                    sort: 'date,ASC'
                }
            })
            .then(({ data }) => setRecords(data._embedded[recordType]))
    }, [setRecords, recordType])

    const handleMonthChange = useCallback(newDate => {
        setSelectedMonth(newDate)
    }, [setSelectedMonth])

    const handleUpdate = useCallback((entry, action) => {
        if (new Date(entry.date).getMonth() === selectedMonth.getMonth()) {
            let _records = records
            if (action) // i.e. edit or delete
                remove(_records, rec => rec.id === entry.id)
            if (action !== 'delete') // edit or create
                _records.push(entry)

            setRecords(_records)
        }
    }, [records, selectedMonth, setRecords])

    useEffect(() => {
        fetchRecordsByMonthYear(dwcc, selectedMonth)
    }, [dwcc, selectedMonth, fetchRecordsByMonthYear])

    return {
        state: {records, selectedMonth},
        handleUpdate,
        handleMonthChange
    }
}
