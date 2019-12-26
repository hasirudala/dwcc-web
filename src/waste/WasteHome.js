import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link, Route } from 'react-router-dom'
import { colStyle, boxStyle } from '../common/cutomStyles'
import Incoming from './incoming/IncomingMain'
import Outgoing from './outgoing/OutgoingMain'
import "react-datepicker/dist/react-datepicker.css"
import './Waste.css'

export default function WasteHome() {
    return (
        <>
            <Route exact path="/waste">
                <Row>
                    <Col xs={12} sm={6} className={colStyle}>
                        <div className={boxStyle} style={{ textAlign: 'center' }}>
                            <Link to="/waste/incoming">
                                <h2 className="text-light">Incoming waste</h2>
                            </Link>
                        </div>
                    </Col>
                    <Col xs={12} sm={6} className={colStyle}>
                        <div className={boxStyle}>
                            <Link to="/waste/outgoing">
                                <h2 className="text-light">Outgoing/sold waste</h2>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Route>
            <Route path="/waste/incoming" component={Incoming} />
            <Route path="/waste/outgoing" component={Outgoing} />
        </>
    )
}