import React from 'react'
import AsyncCreatableSelect from 'react-select/async-creatable'
import axios from 'axios/index'

import { defaultSelectStyle } from '../cutomStyles'
import { axiosErrorResponse } from '../errors'


export default function SelectOrCreate({
        field,
        setFieldValue,
        remoteOptions,
        resourceName,
        defaultVal,
        customErrorMsg,
        placeholder
    }) {
    const [newOptions, setNewOptions] = React.useState([])

    const handleCreate = React.useCallback((inputValue) => {
        axios
            .post(`/${resourceName}`, {
                name: inputValue
            })
            .then(({ data }) => setNewOptions([...newOptions, data])) // remote resource should return newly created object
            .catch(error => {
                console.error(error.toJSON())
                alert(axiosErrorResponse(error, customErrorMsg))
            })
    }, [newOptions, setNewOptions, resourceName, customErrorMsg])

    return (
        <AsyncCreatableSelect
            id={field.name}
            placeholder={placeholder}
            loadOptions={remoteOptions}
            getOptionLabel={option => option.name}
            getOptionValue={option => option.id}
            getNewOptionData={(inputValue, optionLabel) => ({
                id: optionLabel,
                name: `NEW "${inputValue}"`,
                __isNew__: true
            })}
            cacheOptions
            defaultOptions={newOptions}
            onChange={value => setFieldValue(field.name, value ? value.id : value)}
            onBlur={field.onBlur}
            onCreateOption={handleCreate}
            styles={defaultSelectStyle}
            isClearable
            defaultValue={defaultVal && defaultVal}
        />
    )
}
