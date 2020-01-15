import React from 'react'
import { useFormikContext } from 'formik'
import isEmpty from 'lodash/isEmpty'

export default function FormErrors() {
    const { errors } = useFormikContext()
    return (
        !isEmpty(errors.form) &&
        <div>
            <span className="text-danger">{errors.form}</span>
        </div>
    )
}
