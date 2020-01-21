import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import remove from 'lodash/remove'


export default function useRecordsList(dwcc, recordType) {
    const [records, setRecords] = useState(null)
    const [selectedMonth, setSelectedMonth] = useState(new Date())

    const fetchRecordsByMonthYear = useCallback((selectedMonth, dwcc) => {
        axios.get(`/${recordType}/search/getDwccRecordsByMonthYear`, {
                params: {
                    m: selectedMonth.getMonth() + 1,
                    y: selectedMonth.getFullYear(),
                    dwccId: dwcc.id,
                    sort: 'date,ASC',
                    size: 32
                }
            })
            .then(({ data }) => setRecords(data._embedded[recordType]))
    }, [setRecords, recordType])

    const handleMonthChange = useCallback(newDate => {
        setSelectedMonth(newDate)
    }, [setSelectedMonth])

    const handleUpdate = useCallback((entry, action) => {
        if (new Date(entry.date || entry.toDate).getMonth() === selectedMonth.getMonth()) {
            let _records = records
            if (action) // i.e. edit or delete
                remove(_records, rec => rec.id === entry.id)
            if (action !== 'delete') { // edit or create
                _records.push(entry)
                setRecords(null) // hack to force list refresh on new entry
            }
            setRecords(_records)
        }
    }, [records, selectedMonth, setRecords])

    useEffect(() => {
        fetchRecordsByMonthYear(selectedMonth, dwcc)
    }, [selectedMonth, dwcc, fetchRecordsByMonthYear])

    return {
        records,
        selectedMonth,
        handleUpdate,
        handleMonthChange
    }
}
