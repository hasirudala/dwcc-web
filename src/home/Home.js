import React from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import isEmpty from 'lodash/isEmpty'

import './Home.css'
import TopNav from './TopNav'
import DwccSelectionModal from './DwccSelectionModal'
import ActiveDwccWithChanger from "./ActiveDwccWithChanger"


const colStyle = "p-2"
const boxStyle = "d-flex flex-column justify-content-center align-items-center h-300px w-100 border border-dark"
const navContainer = "d-flex justify-content-end align-items-center"

export default function Home() {
    const [state, setState] = React.useState({
        activeDwcc: {},
        dwccSelectorShown: true
    })

    const { activeDwcc, dwccSelectorShown } = state
    const showDwccSelector = () => setState(prevState => ({ ...prevState, dwccSelectorShown: true }))
    const hideDwccSelector = () => setState(prevState => ({ ...prevState, dwccSelectorShown: false }))
    const handleDwccSelect = dwcc => setState({ activeDwcc: dwcc, dwccSelectorShown: false })

    return (
        <Container className="min-vh-100">
            <br />
            <Row>
                <Col xs={12} md={5}>
                    <ActiveDwccWithChanger activeDwcc={activeDwcc}
                                           showDwccs={showDwccSelector}
                    />
                    <DwccSelectionModal show={dwccSelectorShown}
                                        handleClose={hideDwccSelector}
                                        handleSelect={handleDwccSelect}
                                        showClose={!isEmpty(activeDwcc)}
                    />
                </Col>
                <Col xs={12} md={7} className={navContainer}>
                    <TopNav />
                </Col>
            </Row>
            <br />
            <Row>
                <Col xs={12} sm={6} className={colStyle}>
                    <div className={boxStyle} style={{ textAlign: 'center' }}>
                        <h2 className="text-light">Incoming, <br /> Outgoing <br /> Waste</h2>
                    </div>
                </Col>
                <Col xs={12} sm={6} className={colStyle}>
                    <div className={boxStyle}>
                        <h2 className="text-light">Expenses</h2>
                    </div>
                </Col>
                <Col xs={12} sm={6} className={colStyle}>
                    <div className={boxStyle}>
                        <h2 className="text-light">Attendance</h2>
                    </div>
                </Col>
                <Col xs={12} sm={6} className={colStyle}>
                    <div className={boxStyle}>
                        <h2 className="text-light">Staff & Assets</h2>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
