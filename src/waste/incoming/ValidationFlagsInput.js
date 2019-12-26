import React from 'react'
import BsForm from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import { Field, useFormikContext } from 'formik'
import isEmpty from 'lodash/isEmpty'
import every from 'lodash/every'
import { AuthContext } from '../../common/AuthContext'

const hasNestedErrors = _errors => !every(_errors, isEmpty)

export default function ValidationFlagsInput() {
    const { userInfo } = React.useContext(AuthContext)
    const { errors, values: { errorsIgnored, approvedByAdmin } } = useFormikContext()
    return (
        <Col sm={3}>
            {
                (hasNestedErrors(errors) || errorsIgnored) &&
                <Field name="errorsIgnored"
                       label="Ignore data validations"
                       checked={errorsIgnored}
                       as={BsForm.Check} />
            }
            {
                userInfo.isAdmin && (errorsIgnored || approvedByAdmin) &&
                <Field name="approvedByAdmin"
                       label="Approved by Admin"
                       checked={approvedByAdmin}
                       as={BsForm.Check} />
            }
        </Col>
    )
}
