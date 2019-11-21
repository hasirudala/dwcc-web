import React from "react"
import { CardActions } from 'react-admin'

import BackButton from './BackButton'


export default function ActionsWithBackButton({ history, children }) {
    return (
        <CardActions>
            <BackButton history={history} />
            { children }
        </CardActions>
    )
}
