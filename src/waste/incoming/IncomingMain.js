import React from 'react'

import { RecordType } from '../../common/constants'
import WasteMain from '../commonComponents/WasteMain'
import IncomingRecords from './IncomingRecords'
import IncomingDataEntryForm from './IncomingDataEntryForm'

export default function IncomingMain() {
    return <WasteMain title="Incoming Waste"
                      recordType={RecordType.Incoming} 
                      ListComponent={IncomingRecords} 
                      FormComponent={IncomingDataEntryForm} />
}
