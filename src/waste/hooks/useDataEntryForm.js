import { useState, useCallback, useEffect } from 'react'
import axios from 'axios/index'
import { format } from 'date-fns'
import { axiosErrorResponse} from '../../common/errors'


export default function useDataEntryForm(onFormSubmit, edit, existingRecord, recordType) {
    const [addingNext, setAddingNext] = useState(false)
    const [wasteItems, setWasteItems] = useState(null)
    const [vehicleTypes, setVehicleTypes] = useState(null)

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

    const fetchVehicleTypes = useCallback(() => {
        axios
            .get('/vehicleTypes', {
                params: {
                    sort: 'name,ASC'
                }
            })
            .then(({ data }) => setVehicleTypes(data.content))
            .catch(error => alert(axiosErrorResponse(error)))
    }, [setVehicleTypes])

    useEffect(() => {
            if (!wasteItems) fetchWasteItems()
            if (!vehicleTypes) fetchVehicleTypes()
        },
        [wasteItems, vehicleTypes, fetchWasteItems, fetchVehicleTypes]
    )

    const submitForm = useCallback((values, actions) => {
        edit ?
            axios
                .put(`/${recordType}/${existingRecord.id}`, values)
                .then(data => {
                    onFormSubmit(data.data)
                })
                .catch(error => {
                    console.error(error.toJSON())
                    alert(axiosErrorResponse(error))
                })
            :
            axios
                .post(`/${recordType}`, values)
                .then(data => {
                    actions.resetForm()
                    onFormSubmit(data.data, addingNext)
                    setAddingNext(false)
                })
                .catch(error => {
                    console.error(error.toJSON())
                    alert(axiosErrorResponse(error))
                })
    }, [edit, existingRecord, onFormSubmit, addingNext, recordType])

    const deleteRecord = useCallback((record) => {
        if (window.confirm(`Record id #${record.id} of "${format(record.date, 'd MMM yyyy')}" will be DELETED. Continue?`))
            axios
                .delete(`/${recordType}/${record.id}`)
                .then(data => onFormSubmit(data.data, 'delete'))
                .catch(error => alert(error.message))
    }, [recordType, onFormSubmit])

    return {
        wasteItems,
        vehicleTypes,
        setAddingNext,
        submitForm,
        deleteRecord
    }
}
