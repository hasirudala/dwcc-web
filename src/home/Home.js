import React from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import isEmpty from 'lodash/isEmpty'
import { Link, Route } from "react-router-dom"
import './Home.css'
import { colStyle, boxStyle } from '../common/cutomStyles'
import TopNav from './TopNav'
import DwccSelectionModal from './DwccSelectionModal'
import ActiveDwccWithChanger from './ActiveDwccWithChanger'
import { DwccContext } from './DwccContext'
import WasteMain from '../waste/WasteMain'


const navContainer = "d-flex justify-content-end align-items-center"

export default function Home() {
    const previouslySelectedDwcc = JSON.parse(localStorage.getItem('dwcc')) || {}

    const [state, setState] = React.useState({
        activeDwcc: previouslySelectedDwcc,
        dwccSelectorShown: isEmpty(previouslySelectedDwcc)
    })

    const { activeDwcc, dwccSelectorShown } = state
    const showDwccSelector = () => setState(prevState => ({ ...prevState, dwccSelectorShown: true }))
    const hideDwccSelector = () => setState(prevState => ({ ...prevState, dwccSelectorShown: false }))
    const handleDwccSelect = dwcc => {
        localStorage.setItem('dwcc', JSON.stringify(dwcc))
        setState({ activeDwcc: dwcc, dwccSelectorShown: false })
    }

    const dwccContext = {
        dwcc: activeDwcc,
        setDwcc: handleDwccSelect
    }

    return (
        <DwccContext.Provider value={dwccContext}>
            <Container className="min-vh-100">
                <Row className="mt-5 mb-1">
                    <Col xs={12} md={5}>
                        <ActiveDwccWithChanger activeDwcc={activeDwcc}
                                               showDwccs={showDwccSelector}
                        />
                        <DwccSelectionModal show={dwccSelectorShown}
                                            handleClose={hideDwccSelector}
                                            showClose={!isEmpty(activeDwcc)}
                        />
                    </Col>
                    <Col xs={12} md={7} className={navContainer}>
                        <TopNav />
                    </Col>
                </Row>
                <Route exact path="/">
                    <Row>
                        <Col xs={12} sm={6} className={colStyle}>
                            <div className={boxStyle} style={{ textAlign: 'center' }}>
                                <Link to="/waste">
                                    <h2 className="text-light">Incoming, <br /> Outgoing <br /> Waste</h2>
                                </Link>
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
                </Route>
                <Route path="/waste" component={WasteMain} />
            </Container>
        </DwccContext.Provider>
    )
}
