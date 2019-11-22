import React from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from "react-bootstrap/Row"
import Login from './Login'
import hdLogo from '../media/hd-logo-big.png'

const bgContainerStyle = {
    backgroundImage: `url(${hdLogo})`,
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    minHeight: '98vh'
}

export default function LandingPage() {
    return (
        <Container>
            <Row>
                <Col sm={6}>
                    <Row style={{ paddingTop: '12rem' }}>
                        <h1 className="display-1"><strong>Dry Waste Collection</strong></h1>
                        <h3>Information Management System</h3>
                    </Row>
                    <br/>
                    <Row>
                        <Login />
                    </Row>
                </Col>
                <Col sm={{ offset: 2, span: 4 }} style={bgContainerStyle} />
            </Row>
        </Container>
    )
}
