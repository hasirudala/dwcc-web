import React from 'react'
import BsForm from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { useFormikContext, FieldArray, Field, ErrorMessage } from 'formik'
import Select from 'react-select'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import { emptyEntry } from './schema'
import isEmpty from 'lodash/isEmpty'
import { defaultSelectStyle } from '../../common/cutomStyles'
import includes from 'lodash/includes'
import isNil from 'lodash/isNil'


export default function OutgoingEntriesInputArray({ wasteItemsMeta, buyersMeta, edit }) {
    const { values: { entries } } = useFormikContext()

    return (
        <FieldArray name="entries">
            {arrayHelpers => (
                isEmpty(entries) ?
                    <Col sm={2}>
                        <Button variant="outline-primary"
                                onClick={() => arrayHelpers.push(emptyEntry)}
                        >
                            + Add Entry
                        </Button>
                    </Col>
                    :
                    entries.map((_, idx) =>
                        <OutgoingEntryInput key={idx}
                                            idx={idx}
                                            itemOptions={wasteItemsMeta}
                                            buyerOptions={buyersMeta}
                                            pushHelper={arrayHelpers.push}
                                            removeHelper={arrayHelpers.remove}
                                            edit={edit}
                        />
                    )
            )}
        </FieldArray>
    )
}


function OutgoingEntryInput({ idx, itemOptions, buyerOptions, pushHelper, removeHelper, edit }) {
    const { values: { entries }, setFieldValue, setFieldTouched } = useFormikContext()

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
            <Col sm={3}>
                <BsForm.Label>Waste items</BsForm.Label>
                <Field name={`entries[${idx}].itemIds`}>
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
                                    onBlur={() => setFieldTouched(field.name)}
                                    value={itemOptions.filter(opt => includes(field.value, opt.id))}
                                    styles={defaultSelectStyle}
                                    closeMenuOnSelect={false}
                                    isDisabled={edit && !isNil(entries[idx].id)}
                            />
                        )
                    }
                </Field>
                <small className="text-danger">
                    <ErrorMessage name={`entries[${idx}].itemIds`} />
                </small>
            </Col>
            <Col sm={1}>
                <BsForm.Label>Quantity</BsForm.Label>
                <Field name={`entries[${idx}].quantity`}
                       placeholder="kgs"
                       type="number"
                       as={BsForm.Control} />
                <small className="text-danger">
                    <ErrorMessage name={`entries[${idx}].quantity`} />
                </small>
            </Col>
            <Col sm={1} className="mr-3">
                <BsForm.Label>Stock_In_Hand</BsForm.Label>
                <Field name={`entries[${idx}].stockInHand`}
                       placeholder="kgs"
                       type="number"
                       as={BsForm.Control} />
                <small className="text-danger">
                    <ErrorMessage name={`entries[${idx}].stockInHand`} />
                </small>
            </Col>
            <Col sm={1}>
                <BsForm.Label>Sale Rate</BsForm.Label>
                <Field name={`entries[${idx}].rate`}
                       placeholder="₹"
                       type="number"
                       as={BsForm.Control}
                />
                <small className="text-danger">
                    <ErrorMessage name={`entries[${idx}].rate`} />
                </small>
            </Col>
            <Col sm={2}>
                <BsForm.Label>Buyer</BsForm.Label>
                <Field name={`entries[${idx}].buyerId`}>
                    {
                        ({ field }) =>
                            <Select placeholder="Select"
                                    id={field.name}
                                    options={buyerOptions}
                                    getOptionLabel={option => option['name']}
                                    getOptionValue={option => option['id']}
                                    onChange={value => setFieldValue(field.name, value.id)}
                                    onBlur={field.onBlur}
                                    styles={defaultSelectStyle}
                                    value={field.value && buyerOptions.filter(option => option.id === field.value).pop()}
                                    isSearchable
                            />
                    }
                </Field>
                <small className="text-danger">
                    <ErrorMessage name={`entries[${idx}].buyerId`} />
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
                    idx === entries.length - 1 &&
                    <Button variant="outline-primary"
                            onClick={() => pushHelper(emptyEntry)}
                            size="sm"
                    >
                        + ADD
                    </Button>
                }
            </Col>
        </BsForm.Row>
    )
}

