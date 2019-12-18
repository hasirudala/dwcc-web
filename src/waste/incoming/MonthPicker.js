import React from 'react'
import Button from 'react-bootstrap/Button'
import DatePicker from 'react-datepicker'


const MonthIndicatorAndInput = React.forwardRef(({ value, onClick }, ref) =>
    <Button variant="outline-info" size="sm" onClick={onClick} ref={ref}>
        {value}
    </Button>
)

export default function MonthPicker({ selectedMonth, onMonthChange }) {
    const ref = React.createRef()
    return (
        <DatePicker
            selected={selectedMonth}
            onChange={onMonthChange}
            dateFormat="MMM yyyy"
            showMonthYearPicker
            customInput={<MonthIndicatorAndInput ref={ref} />}
        />
    )
}
