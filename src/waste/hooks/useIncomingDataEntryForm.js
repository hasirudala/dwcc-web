import { useState, useCallback, useEffect } from 'react'
import axios from 'axios/index'

export default function useIncomingDataEntryForm(onFormSubmit, edit, existingRecord) {
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
            .catch(error => alert(error.message))
    }, [setWasteItems])

    const fetchVehicleTypes = useCallback(() => {
        axios
            .get('/vehicleTypes', {
                params: {
                    sort: 'name,ASC'
                }
            })
            .then(({ data }) => setVehicleTypes(data.content))
            .catch(error => alert(error.message))
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
                .put(`/incomingWaste/${existingRecord.id}`, values)
                .then(data => {
                    onFormSubmit(data.data)
                })
                .catch(error => alert(error.message))
            :
            axios
                .post('/incomingWaste', values)
                .then(data => {
                    actions.resetForm()
                    onFormSubmit(data.data, addingNext)
                    setAddingNext(false)
                })
                .catch(error => alert(error.message))
    }, [edit, existingRecord, onFormSubmit, addingNext])

    return {
        wasteItems,
        vehicleTypes,
        setAddingNext,
        submitForm
    }
}
