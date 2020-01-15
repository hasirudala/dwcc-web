import React from 'react'
import { format } from 'date-fns'

export default function ShowingRecordsForMonth({ month }) {
    return (
        <h5 className="mt-3">
            <span className="font-weight-light">Showing records for</span>
            &nbsp;
            <b>{format(month, 'MMMM, yyyy')}</b>
        </h5>
    )
}
