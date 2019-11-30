import React from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import './Home.css'
import TopNav from './TopNav'


const colStyle = "p-2"
const cellStyle = "d-flex flex-column justify-content-center align-items-center h-300px w-100 bg-dark"
const navContainer = "d-flex justify-content-end align-items-center"

export default function Home() {
    return (
        <Container className="min-vh-100">
            <br/>
            <Row>
                <Col xs={12} sm={4}>
                    <h1 className="display-3">DWCC</h1>
                </Col>
                <Col xs={12} sm={8} className={navContainer}>
                    <TopNav/>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col xs={12} sm={6} className={colStyle}>
                    <div className={cellStyle} style={{ textAlign: 'center' }}>
                        <h2 className="text-muted">Incoming, <br/> Outgoing <br/> Waste</h2>
                    </div>
                </Col>
                <Col xs={12} sm={6} className={colStyle}>
                    <div className={cellStyle}>
                        <h2 className="text-muted">Expenses</h2>
                    </div>
                </Col>
                <Col xs={12} sm={6} className={colStyle}>
                    <div className={cellStyle}>
                        <h2 className="text-muted">Attendance</h2>
                    </div>
                </Col>
                <Col xs={12} sm={6} className={colStyle}>
                    <div className={cellStyle}>
                        <h2 className="text-muted">Staff & Assets</h2>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
