import React from 'react'
import BsForm from 'react-bootstrap/Form'
import DatePicker from 'react-datepicker'
import { Field, useFormikContext } from 'formik'


export default function DateSelect({ edit }) {
    const { values: { fromDate, toDate }, setFieldValue, setFieldTouched, errors } = useFormikContext()
    const [blink, setBlink] = React.useState(false)

    const blinkDate = React.useCallback(() => {
        setTimeout(() => {
            setBlink(false)
        }, 2000)
        setBlink(true)
    }, [setBlink])

    return (
        <>
            <BsForm.Label>From</BsForm.Label>
            <Field name="fromDate">
                {
                    ({ field }) =>
                        <DatePicker name={field.name}
                                    selected={field.value}
                                    selectsStart
                                    value={field.value}
                                    startDate={field.value}
                                    endDate={toDate}
                                    onChange={dt => setFieldValue('fromDate', dt)}
                                    onBlur={() => setFieldTouched('fromDate', true)}
                                    maxDate={toDate || new Date()}
                                    dateFormat="d MMM yyyy, EEEE"
                                    isClearable
                                    className={`text-success ${blink ? 'blink' : ''} large`}
                                    placeholderText="From date 📅" />
                }
            </Field>
            <small className="text-danger">
                {errors.fromDate}
            </small>
            <br />
            <BsForm.Label>To</BsForm.Label>
            <Field name="toDate">
                {
                    ({ field }) =>
                        <DatePicker name={field.name}
                                    selected={field.value}
                                    selectsEnd
                                    value={field.value}
                                    startDate={fromDate}
                                    endDate={field.value}
                                    minDate={fromDate}
                                    maxDate={new Date()}
                                    onChange={dt => setFieldValue('toDate', dt)}
                                    onSelect={blinkDate}
                                    onBlur={() => setFieldTouched('toDate', true)}
                                    dateFormat="d MMM yyyy, EEEE"
                                    isClearable
                                    className={`text-success ${blink ? 'blink' : ''} large`}
                                    placeholderText="To date 📅" />
                }
            </Field>
            <small className="text-danger">
                {errors.toDate}
            </small>
        </>
    )
}
