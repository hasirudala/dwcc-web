import React from 'react'
import IncomingDataEntry from './IncomingDataEntry'
import IncomingWasteRecords from './IncomingWasteRecords'
import isNil from 'lodash/isNil'
import { format } from 'date-fns'

import useIncomingMain from '../hooks/useIncomingMain'


export default function Incoming() {
    const { state, handleUpdate, handleMonthChange } = useIncomingMain()
    return (
        <>
            <div className="d-flex justify-content-center mb-2" style={{ marginTop: '-1em' }}>
                <h2 className="display-4 text-uppercase"
                    style={{ color: '#fffa22', opacity: 0.2 }}
                >
                    Incoming waste
                </h2>
            </div>
            <IncomingDataEntry onNewEntry={handleUpdate} />
            <h5 className="mt-3 font-weight-light">
                Showing records for &nbsp;
                <span className="text-info">{format(state.selectedMonth, 'MMMM, yyyy')}</span>
            </h5>
            <IncomingWasteRecords records={state.records}
                                  onEdit={
                                      (updatedEntry, action) =>
                                          handleUpdate(updatedEntry, isNil(action) ? 'edit' : action)
                                  }
                                  forMonth={state.selectedMonth}
                                  onMonthChange={handleMonthChange}
            />
        </>
    )
}
