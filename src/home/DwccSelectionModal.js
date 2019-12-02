import React from "react"
import map from "lodash/map"
import groupBy from "lodash/groupBy"
import axios from "axios/index"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import Spinner from "react-bootstrap/Spinner"


export default function DwccSelectionModal({ show, handleClose, handleSelect, showClose }) {
    const [state, setState] = React.useState({ dwccs: null, isLoading: true })

    const setDwccs = dwccs => setState({ dwccs, isLoading: false })
    const unsetDwccs = () => setState({ dwccs: null, isLoading: true })

    const handleHide = () => {
        handleClose()
        unsetDwccs()
    }

    const fetchDwccs = () =>
        axios.get('/dwccs')
        .then(({ data }) => setDwccs(data.content))

    return (
        <Modal show={show}
               onHide={handleHide}
               onShow={fetchDwccs}
               keyboard={showClose}
               backdrop={showClose ? true : 'static'}
        >
            <Modal.Header closeButton={showClose}>
                <Modal.Title>Select DWCC</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {state.isLoading ?
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                    :
                    <div>
                        {map(groupBy(state.dwccs, 'ward.region.name'),
                            (dwccsInRegion, regionName) =>
                                <div key={regionName}>
                                    <h6 className="text-light">{regionName}</h6>
                                    {
                                        dwccsInRegion.map(_dwcc =>
                                            <Button key={_dwcc.id}
                                                    variant="link"
                                                    onClick={() => handleSelect(_dwcc)}
                                            >
                                                {_dwcc.name}
                                            </Button>
                                        )
                                    }
                                    <br />
                                    <hr />
                                </div>
                        )}
                    </div>
                }
            </Modal.Body>
        </Modal>
    )
}
