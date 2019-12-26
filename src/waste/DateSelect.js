import React from 'react'
import DatePicker from 'react-datepicker'
import { format } from 'date-fns'
import { ErrorMessage, Field, useFormikContext } from 'formik'
import axios from 'axios'
import { DwccContext } from '../home/DwccContext'


export default function DateSelect({ recordType, edit }) {
    const { setFieldValue, setFieldTouched } = useFormikContext()
    const [blink, setBlink] = React.useState(false)
    const { dwcc } = React.useContext(DwccContext)

    const blinkDate = () => {
        setTimeout(() => {
            setBlink(false)
        }, 2000)
        setBlink(true)
    }

    return (
        <>
            <Field name="date" validate={
                dateVal =>
                    dateVal && !edit &&
                    checkIfRecordExistsForDate(dateVal, recordType, dwcc)
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
                <ErrorMessage name="date" />
            </small>
        </>
    )
}

const checkIfRecordExistsForDate = (date, recordType, dwcc) =>
    axios.get(`/${recordType}/search/existsForDate`, {
        params: {
            date: format(date, 'yyyy-MM-dd'),
            dwccId: dwcc.id
        }
    })
