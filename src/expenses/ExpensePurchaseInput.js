import React from 'react'
import BsForm from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { useFormikContext, FieldArray, Field, ErrorMessage } from 'formik'
import Select from 'react-select'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import { defaultSelectStyle } from '../common/cutomStyles'
import { emptyPurchaseEntry } from './schema'
import isEmpty from 'lodash/isEmpty'


export default function ExpensePurchaseInputArray({ wasteItemsMeta }) {
    const { values: { purchaseEntries } } = useFormikContext()
    return (
        <FieldArray name="purchaseEntries">
            {arrayHelpers => (
                isEmpty(purchaseEntries) ?
                    <Col sm={2}>
                        <Button variant="outline-primary"
                                onClick={() => arrayHelpers.push(emptyPurchaseEntry)}
                        >
                            + Add Entry
                        </Button>
                    </Col>
                    :
                    purchaseEntries.map((_, idx) =>
                        <ExpensePurchaseInput key={idx}
                                              idx={idx}
                                              itemOptions={wasteItemsMeta}
                                              pushHelper={arrayHelpers.push}
                                              removeHelper={arrayHelpers.remove}
                        />
                    )
            )}
        </FieldArray>
    )
}

function ExpensePurchaseInput({ idx, itemOptions, pushHelper, removeHelper }) {
    const { values: { purchaseEntries }, setFieldValue } = useFormikContext()
    return (
        <BsForm.Row className="align-items-center mb-3">
            <Col sm={2}>
                <BsForm.Label>Waste Item</BsForm.Label>
                <Field name={`purchaseEntries[${idx}].wasteItemId`}>
                    {
                        ({ field }) => (
                            <Select placeholder="Select"
                                    id={field.name}
                                    options={itemOptions}
                                    getOptionLabel={option => option['name']}
                                    getOptionValue={option => option['id']}
                                    onChange={value => setFieldValue(field.name, value.id)}
                                    onBlur={field.onBlur}
                                    value={field.value && itemOptions.filter(option => option.id === field.value).pop()}
                                    styles={defaultSelectStyle}
                                    isSearchable
                            />
                        )
                    }
                </Field>
                <small className="text-danger">
                    <ErrorMessage name={`purchaseEntries[${idx}].wasteItemId`} />
                </small>
            </Col>
            <Col sm={2}>
                <BsForm.Label>Amount</BsForm.Label>
                <Field name={`purchaseEntries[${idx}].amount`}
                       placeholder="₹"
                       type="number"
                       as={BsForm.Control} />
                <small className="text-danger">
                    <ErrorMessage name={`purchaseEntries[${idx}].amount`} />
                </small>
            </Col>
            <Col sm={2} className="pt-4">
                <Button variant="link"
                        onClick={() => removeHelper(idx)}
                        tabIndex={idx + 10000}
                        size="sm"
                >
                    <HighlightOffIcon fontSize="small" />
                </Button>
                {
                    idx === purchaseEntries.length - 1 &&
                    <Button variant="outline-primary"
                            onClick={() => pushHelper(emptyPurchaseEntry)}
                            size="sm"
                    >
                        + ADD
                    </Button>
                }
            </Col>
        </BsForm.Row>
    )
}
