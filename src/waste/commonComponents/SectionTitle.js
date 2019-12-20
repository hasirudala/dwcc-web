import React from 'react'


export default function SectionTitle({ title }) {
    return (
        <div className="d-flex justify-content-center mb-2" style={{ marginTop: '-1em' }}>
            <h2 className="display-4 text-uppercase"
                style={{ color: '#fffa22', opacity: 0.2 }}
            >
                { title }
            </h2>
        </div>
    )
}
