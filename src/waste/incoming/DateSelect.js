import React from 'react'
import DatePicker from 'react-datepicker'
import { format } from 'date-fns'
import { Field, useFormikContext } from 'formik'
import axios from 'axios'
import { DwccContext } from '../../home/DwccContext'


export default function DateSelect({ edit }) {
    const { setFieldValue, setFieldTouched, errors } = useFormikContext()
    const [blink, setBlink] = React.useState(false)
    const { dwcc } = React.useContext(DwccContext)

    const blinkDate = React.useCallback(() => {
        setTimeout(() => {
            setBlink(false)
        }, 2000)
        setBlink(true)
    }, [setBlink])

    const checkIfRecordExistsForDate = React.useCallback((date, dwcc) =>
        axios.get('/incomingWaste/search/existsForDate', {
            params: {
                date: format(date, 'yyyy-MM-dd'),
                dwccId: dwcc.id
            }
        }), [])


    return (
        <>
            <Field name="date" validate={
                dateVal =>
                    dateVal && !edit &&
                    checkIfRecordExistsForDate(dateVal, dwcc)
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
                                    className={`text-success ${blink ? 'blink' : ''}`}
                                    placeholderText="Select date 📅" />
                }
            </Field>
            <small className="text-danger">
                {errors.date}
            </small>
        </>
    )
}
