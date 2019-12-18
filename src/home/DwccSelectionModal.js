import React from "react"
import map from "lodash/map"
import groupBy from "lodash/groupBy"
import orderBy from "lodash/orderBy"
import axios from "axios/index"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import Spinner from "react-bootstrap/Spinner"
import { Link } from "react-router-dom"
import { AuthContext } from "../common/AuthContext"
import { DwccContext } from '../home/DwccContext'


const modalHeaderStyle = "d-flex align-items-center justify-content-between"

export default function DwccSelectionModal({ show, handleClose, showClose }) {
    const { setDwcc } = React.useContext(DwccContext)
    const [state, setState] = React.useState({ dwccs: null, isLoading: true })
    const { userInfo } = React.useContext(AuthContext)

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
            <Modal.Header closeButton={showClose} className={modalHeaderStyle}>
                <Modal.Title>
                    Select DWCC
                </Modal.Title>
                {
                    userInfo.isAdmin && !showClose &&
                    <>
                        <small>OR</small>
                        <Link to="/admin">
                            <Button variant="outline-light">Go to Admin Console</Button>
                        </Link>
                    </>
                }
            </Modal.Header>
            <Modal.Body>
                {state.isLoading ?
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                    :
                    <div>
                        {
                            map(
                                groupBy(
                                    orderBy(state.dwccs, ['ward.region.name', 'name'], ['asc', 'asc']),
                                    'ward.region.name'
                                ),
                                (dwccsInRegion, regionName) =>
                                    <div key={regionName}>
                                        <h6 className="text-light">{regionName}</h6>
                                        {
                                            dwccsInRegion.map(_dwcc =>
                                                <Button key={_dwcc.id}
                                                        variant="link"
                                                        onClick={() => setDwcc(_dwcc)}
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
