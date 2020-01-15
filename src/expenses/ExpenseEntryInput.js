import React from 'react'
import BsForm from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import { FieldArray, Field, useFormikContext } from 'formik'
import isFinite from "lodash/isFinite"


export default function ExpenseEntryInputArray() {
    const { values: { entries } } = useFormikContext()
    return (
        <FieldArray name="entries">
            {() => entries.map((entry, idx) => <ExpenseEntryInput key={idx} idx={idx} entry={entry} />)}
        </FieldArray>
    )
}


function ExpenseEntryInput({ idx, entry }) {
    const { values, errors } = useFormikContext()

    return (
        <BsForm.Row className="align-items-center mb-3">
            <Col sm={2} className="pt-4 text-right">
                <div style={{ color: '#c0dfc0' }}>{entry._item.name}</div>
                <Badge>{entry._item.type && entry._item.type.name}</Badge>
                <Field name={`entries[${idx}].expenseItemId`}>
                    {({ field }) => <input type="hidden" {...field} />}
                </Field>
            </Col>
            <Col sm={2}>
                <BsForm.Label>Amount</BsForm.Label>
                <Field name={`entries[${idx}].amount`}
                       type="number"
                       placeholder="₹"
                       validate={value => isFinite(values.entries[idx].numItems) && !isFinite(value) && 'Required'}
                       as={BsForm.Control} />
                <small className="text-danger">
                    {errors.entries && errors.entries[idx] && errors.entries[idx].amount}
                </small>
            </Col>
            {
                entry._item.askNumberOfUnits &&
                <Col sm={1}>
                    <BsForm.Label>How many?</BsForm.Label>
                    <Field name={`entries[${idx}].numItems`}
                           type="number"
                           validate={value =>
                               values.entries && values.entries[idx]
                               && isFinite(values.entries[idx].amount)
                               && !isFinite(value)
                               && 'Required'
                           }
                           as={BsForm.Control} />
                    <small className="text-danger">
                        {errors.entries && errors.entries[idx] && errors.entries[idx].numItems}
                    </small>
                </Col>
            }
        </BsForm.Row>
    )
}
