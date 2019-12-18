import React from 'react'
import DatePicker from 'react-datepicker'
import { ErrorMessage, useFormikContext } from 'formik'


export default function DateSelect() {
    const { values: { date }, setFieldValue, setFieldTouched } = useFormikContext()
    const [blink, setBlink] = React.useState(false)

    const blinkDate = () => {
        setTimeout(() => {
            setBlink(false)
        }, 2000)
        setBlink(true)
    }

    return (
        <>
            <DatePicker name="date"
                        selected={date}
                        value={date}
                        onChange={dt => setFieldValue('date', dt)}
                        onSelect={blinkDate}
                        onBlur={() => setFieldTouched('date', true)}
                        maxDate={new Date()}
                        dateFormat="d MMM yyyy, EEEE"
                        isClearable
                        className={`text-success ${blink ? 'blink' : ''}`}
                        placeholderText="Select date 📅" />
            <small className="text-danger">
                <ErrorMessage name="date" />
            </small>
        </>
    )
}
