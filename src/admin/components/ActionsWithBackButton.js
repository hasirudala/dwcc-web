import React from "react"
import { TopToolbar } from 'react-admin'

import BackButton from './BackButton'


export default function ActionsWithBackButton({ history, children }) {
    return (
        <TopToolbar>
            <BackButton history={history} />
            { children }
        </TopToolbar>
    )
}
