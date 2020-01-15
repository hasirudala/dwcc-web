import { useState, useCallback, useEffect } from 'react'
import axios from 'axios/index'
import { format } from 'date-fns'
import { axiosErrorResponse } from '../common/errors'
import isFinite from "lodash/isFinite"
import clone from "lodash/clone"

export default function useExpenseEntryForm(onFormSubmit, edit, existingRecord) {
    const [addingNext, setAddingNext] = useState(false)
    const [expenseItems, setExpenseItems] = useState(null)
    const [wasteItems, setWasteItems] = useState(null)

    const fetchExpenseItems = useCallback(() => {
        axios
            .get('/expenseItems', {
                params: {
                    sort: 'name,ASC'
                }
            })
            .then(({ data }) => setExpenseItems(data.content))
            .catch(error => alert(axiosErrorResponse(error)))
    }, [setExpenseItems])

    const fetchWasteItems = useCallback(() => {
        axios
            .get('/wasteItems', {
                params: {
                    sort: 'name,ASC'
                }
            })
            .then(({ data }) => setWasteItems(data.content))
            .catch(error => alert(axiosErrorResponse(error)))
    }, [setWasteItems])

    const fetchMeta = useCallback(() => {
        fetchExpenseItems()
        fetchWasteItems()
    }, [fetchExpenseItems, fetchWasteItems])

    useEffect(() => {
            fetchMeta()
        },
        [fetchMeta]
    )

    const submitForm = useCallback((values, actions) => {
        edit ?
            axios
                .put(`/expenses/${existingRecord.id}`, stripValues(values))
                .then(data => {
                    onFormSubmit(data.data)
                })
                .catch(error => {
                    console.error(error.toJSON())
                    alert(axiosErrorResponse(error))
                    actions.setSubmitting(false)
                })
            :
            axios
                .post('/expenses', stripValues(values))
                .then(data => {
                    actions.resetForm()
                    onFormSubmit(data.data, addingNext)
                    setAddingNext(false)
                })
                .catch(error => {
                    console.error(error.toJSON())
                    alert(axiosErrorResponse(error))
                    actions.setSubmitting(false)
                })
    }, [edit, existingRecord, onFormSubmit, addingNext])

    const deleteRecord = useCallback((record) => {
        if (window.confirm(
            `Record id #${record.id} of "${format(record.date, 'd MMM yyyy')}" will be DELETED. Continue?`
        ))
            axios
                .delete(`/expenses/${record.id}`)
                .then(data => onFormSubmit(data.data, 'delete'))
                .catch(error => alert(error.message))
    }, [onFormSubmit])

    return {
        expenseItems,
        wasteItems,
        setAddingNext,
        submitForm,
        deleteRecord
    }
}

function stripValues(_values) {
    let values = clone(_values)
    values.entries = values.entries.filter(entry => isFinite(entry.amount))
    return values
}
