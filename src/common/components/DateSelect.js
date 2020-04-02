import React from 'react'
import DatePicker from 'react-datepicker'
import { Field, useFormikContext } from 'formik'
import { DwccContext } from '../../home/DwccContext'


export default function DateSelect({ edit, validatorFn }) {
    const { setFieldValue, setFieldTouched, errors } = useFormikContext()
    const [blink, setBlink] = React.useState(false)
    const { dwcc } = React.useContext(DwccContext)

    const blinkDate = React.useCallback(() => {
        setTimeout(() => {
            setBlink(false)
        }, 2000)
        setBlink(true)
    }, [setBlink])

    return (
        <>
            <Field name="date" validate={
                dateVal =>
                    dateVal && !edit &&
                    validatorFn(dateVal, dwcc)
                        .then(({ data }) => data && "Entry already exists for this date")
            }>
                {
                    ({ field }) =>
                        <DatePicker name={field.name}
                                    selected={field.value}
                                    value={field.value}
                                    onChange={dt => setFieldValue('date', dt)}
                                    onSelect={blinkDate}
                                    onBlur={() => setFieldTouched('date', true)}
                                    maxDate={new Date()}
                                    dateFormat="d MMM yyyy, EEEE"
                                    isClearable
                                    className={`text-success ${blink ? 'blink' : ''} large`}
                                    placeholderText="Select date 📅" />
                }
            </Field>
            <small className="text-danger">
                {errors.date}
            </small>
        </>
    )
}
