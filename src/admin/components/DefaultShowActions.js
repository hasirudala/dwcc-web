import React from "react"
import { EditButton } from 'react-admin'

import ActionsWithBackButton from "./ActionsWithBackButton"

export default function DefaultShowActions({ history, basePath, data }) {
    return (
        <ActionsWithBackButton history={history}>
            <EditButton basePath={basePath} record={data} />
        </ActionsWithBackButton>
    )
}
