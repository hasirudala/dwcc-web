import React from 'react'

import { RecordType } from '../constants'
import WasteMain from '../commonComponents/WasteMain'

export default function IncomingMain() {
    return <WasteMain recordType={RecordType.Incoming} title="Incoming Waste" />
}