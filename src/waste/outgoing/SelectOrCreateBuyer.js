import React from 'react'
import axios from 'axios/index'
import SelectOrCreate from '../../common/components/SelectOrCreate'

const buyerOptions = inputVal =>
    axios
        .get('/wasteBuyers/search/byName', {
            params: {
                q: inputVal
            }
        })
        .then(({ data }) => data._embedded.wasteBuyers)


export default function SelectOrCreateBuyer({field, setFieldValue, defaultVal}) {
    return (
        <SelectOrCreate
            field={field}
            placeholder="Buyer"
            setFieldValue={setFieldValue}
            remoteOptions={buyerOptions}
            resourceName='wasteBuyers'
            defaultVal={defaultVal}
            customErrorMsg="Error adding new buyer"
        />

    )
}
