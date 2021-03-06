import { useState, useCallback, useEffect } from 'react'
import axios from 'axios/index'
import { format } from 'date-fns'
import { axiosErrorResponse} from '../common/errors'
import { RecordType } from '../common/constants'


export default function useDataEntryForm(onFormSubmit, edit, existingRecord, recordType, dwcc) {
    const [addingNext, setAddingNext] = useState(false)
    const [wasteItems, setWasteItems] = useState(null)
    const [vehicleTypes, setVehicleTypes] = useState(null)
    const [wasteSources, setWasteSources] = useState(null)
    const [wasteBuyers, setWasteBuyers] = useState(null)

    const fetchWasteItems = useCallback(() => {
        axios
            .get('/wasteItems', {
                params: {
                    sort: 'name,ASC',
                    size: 300
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

    const fetchWasteSources = useCallback(() => {
        axios
            .get('/wasteSources', {
                params: {
                    sort: 'name,ASC'
                }
            })
            .then(({ data }) => setWasteSources(data.content))
            .catch(error => alert(axiosErrorResponse(error)))
    }, [setWasteSources])

    const fetchBuyers = useCallback(() => {
        axios
            .get('/wasteBuyers/search/byRegion', {
                params: {
                    id: dwcc.ward.region.id,
                    sort: 'name,ASC',
                    size: 300
                }
            })
            .then(({ data }) => setWasteBuyers(data._embedded.wasteBuyers))
            .catch(error => alert(axiosErrorResponse(error)))
    }, [setWasteBuyers, dwcc])

    const fetchMeta = useCallback(() => {
        fetchWasteItems()
        if (recordType === RecordType.Incoming) {
            fetchVehicleTypes()
            fetchWasteSources()
        }
        if (recordType === RecordType.Outgoing) fetchBuyers()
    }, [fetchWasteItems, fetchVehicleTypes, fetchWasteSources, fetchBuyers, recordType])

    useEffect(() => {
            fetchMeta()
        },
        [fetchMeta]
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
                    actions.setSubmitting(false)
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
                    actions.setSubmitting(false)
                })
    }, [edit, existingRecord, onFormSubmit, addingNext, recordType])

    const deleteRecord = useCallback((record) => {
        if (window.confirm(
            `Record id #${record.id} of "${
                recordType === RecordType.Incoming ? 
                    format(record.date, 'd MMM yyyy') 
                    : format(record.fromDate, 'd MMM yyyy') + ' - ' + format(record.toDate, 'd MMM yyyy')   
            }" will be DELETED. Continue?`
        ))
            axios
                .delete(`/${recordType}/${record.id}`)
                .then(data => onFormSubmit(data.data, 'delete'))
                .catch(error => alert(error.message))
    }, [recordType, onFormSubmit])

    return {
        wasteItems,
        vehicleTypes,
        wasteSources,
        wasteBuyers,
        setAddingNext,
        submitForm,
        deleteRecord
    }
}
