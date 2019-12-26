import React from 'react'
import BsForm from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import { Field } from 'formik'

export default function NoteInput() {
    return (
        <Col sm={6}>
            <Field name="note">
                {
                    ({ field }) => (
                        <BsForm.Control as="textarea" placeholder="Note (optional)" {...field} />
                    )
                }
            </Field>
        </Col>
    )

}
