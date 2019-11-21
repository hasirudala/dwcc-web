import React from "react"
import { Button } from 'react-admin'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'


export default function BackButton({ history }) {
    return (
        <Button color="primary" onClick={history.goBack} label="Back">
            <ChevronLeftIcon />
        </Button>
    )
}
