import React from 'react'

import { RecordType } from '../../common/constants'
import WasteMain from '../commonComponents/WasteMain'
import OutgoingRecords from './OutgoingRecords'
import OutgoingDataEntryForm from './OutgoingDataEntryForm'


export default function OutgoingMain() {
    return <WasteMain title="Outgoing Waste"
                      recordType={RecordType.Outgoing}
                      ListComponent={OutgoingRecords}
                      FormComponent={OutgoingDataEntryForm} />
}
