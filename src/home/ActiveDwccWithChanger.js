import React from 'react'
import isEmpty from "lodash/isEmpty"
import Button from 'react-bootstrap/Button'
import EditIcon from '@material-ui/icons/Edit'


export default function ActiveDwccWithChanger({ activeDwcc, showDwccs }) {
    return (
        <>
            <div className="d-flex align-items-center">
                <h1 className="d-inline">{activeDwcc.name || 'DWCC'}</h1>
                <Button variant="link" onClick={showDwccs}>
                    <EditIcon />
                </Button>
            </div>
            {
                !isEmpty(activeDwcc) &&
                <span className="text-muted">
                    {activeDwcc.ward.name}, {activeDwcc.ward.region.name}
                </span>
            }
        </>
    )
}
