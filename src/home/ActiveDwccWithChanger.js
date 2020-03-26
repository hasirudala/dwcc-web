import React from 'react'
import isEmpty from "lodash/isEmpty"
import Button from 'react-bootstrap/Button'
import { Link } from "react-router-dom"
import MyLocationIcon from '@material-ui/icons/MyLocation'


export default function ActiveDwccWithChanger({ activeDwcc, showDwccs }) {
    return (
        <>
            <div className="d-flex align-items-end">
                <Link to="/">
                    <h1 className="d-inline text-success">
                        {activeDwcc.name || 'DWCC'}
                    </h1>
                </Link>
                <Button variant="link" onClick={showDwccs}>
                    <MyLocationIcon />
                </Button>
            </div>
            {
                !isEmpty(activeDwcc) &&
                <span className="text-muted">
                    Ward {activeDwcc.ward.name}, {activeDwcc.ward.region.name}
                </span>
            }
        </>
    )
}
