import React from 'react'

import { RecordType } from '../constants'
import WasteMain from '../commonComponents/WasteMain'


export default function OutgoingMain() {
    return <WasteMain recordType={RecordType.Outgoing} title="Outgoing Waste" />
}
