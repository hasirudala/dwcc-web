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
}

export default function LandingPage() {
    return (
        <Container>
            <Row>
                <Col sm={6}>
                    <Row className="d-flex flex-column justify-content-center min-vh-100">
                        <h1 className="display-1"><strong>Dry Waste Collection</strong></h1>
                        <h3>Information Management System</h3>
                        <Login />
                    </Row>
                </Col>
                <Col sm={{ offset: 2, span: 4 }} style={bgContainerStyle} />
            </Row>
        </Container>
    )
}
