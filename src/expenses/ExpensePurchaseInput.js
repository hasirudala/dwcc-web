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
import includes from 'lodash/includes'
import isNil from 'lodash/isNil'


export default function ExpensePurchaseInputArray({ wasteItemsMeta, edit }) {
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
                                              edit={edit}
                        />
                    )
            )}
        </FieldArray>
    )
}

function ExpensePurchaseInput({ idx, itemOptions, pushHelper, removeHelper, edit }) {
    const { values: { purchaseEntries }, setFieldValue } = useFormikContext()

    const handleSelectChange = React.useCallback((value, action, fieldName, fieldValue) => {
        switch (action) {
            case 'select-option':
                setFieldValue(fieldName, [value[value.length - 1].id, ...fieldValue])
                return
            case 'deselect-option':
            case 'remove-value':
                setFieldValue(fieldName, value ? [...value.map(val => val.id)] : [])
                return
            case 'clear':
                setFieldValue(fieldName, [])
                return
            default:
                return
        }
    }, [setFieldValue])

    return (
        <BsForm.Row className="align-items-center mb-3">
            <Col sm={2}>
                <BsForm.Label>Waste Item(s)</BsForm.Label>
                <Field name={`purchaseEntries[${idx}].wasteItemIds`}>
                    {
                        ({ field }) => (
                            <Select placeholder="Select"
                                    id={field.name}
                                    options={itemOptions}
                                    isMulti
                                    isSearchable
                                    getOptionLabel={option => option['name']}
                                    getOptionValue={option => option['id']}
                                    onChange={
                                        (value, { action }) =>
                                            handleSelectChange(value, action, field.name, field.value)
                                    }
                                    onBlur={field.onBlur}
                                    value={itemOptions.filter(opt => includes(field.value, opt.id))}
                                    styles={defaultSelectStyle}
                                    closeMenuOnSelect={false}
                                    isDisabled={edit && !isNil(purchaseEntries[idx].id)}
                            />
                        )
                    }
                </Field>
                <small className="text-danger">
                    <ErrorMessage name={`purchaseEntries[${idx}].wasteItemIds`} />
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
