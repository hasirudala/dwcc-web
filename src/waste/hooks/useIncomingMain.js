import { useState, useEffect, useCallback, useContext } from 'react'
import isNil from 'lodash/isNil'
import axios from 'axios'
import { DwccContext } from '../../home/DwccContext'
import remove from 'lodash/remove'


export default function useIncomingMain() {
    const { dwcc } = useContext(DwccContext)

    const [state, setState] = useState({
        dwcc0: dwcc,
        records: null,
        selectedMonth: new Date(), // current month by default
    });

    if (dwcc !== state.dwcc0) {
        // this is done to re-render the list on context change
        setState(prevState => ({ ...prevState, dwcc0: dwcc, records: null }))
    }

    const setRecords = useCallback(records => {
        setState(prevState => ({ ...prevState, records }))
    }, [setState])

    const fetchRecordsByMonthYear = useCallback(() => {
        axios.get('/incomingWaste/search/getDwccRecordsByMonthYear', {
                params: {
                    m: state.selectedMonth.getMonth() + 1,
                    y: state.selectedMonth.getFullYear(),
                    dwccId: dwcc.id,
                    sort: 'date,ASC'
                }
            })
            .then(({ data }) => setRecords(data._embedded.incomingWaste))
    }, [state, dwcc, setRecords])

    const handleMonthChange = useCallback(newDate => {
        setState(prevState => ({ ...prevState, selectedMonth: newDate, records: null }))
    }, [setState])

    const handleUpdate = useCallback((entry, action) => {
        if (new Date(entry.date).getMonth() === state.selectedMonth.getMonth()) {
            let _records = state.records
            if (action) // i.e. edit or delete
                remove(_records, rec => rec.id === entry.id)
            if (action !== 'delete') // edit or create
                _records.push(entry)

            setRecords(_records)
        }
    }, [state, setRecords])

    useEffect(() => {
        if (isNil(state.records)) {
            fetchRecordsByMonthYear()
        }
    }, [state, fetchRecordsByMonthYear])

    return {
        state,
        handleUpdate,
        handleMonthChange
    }
}