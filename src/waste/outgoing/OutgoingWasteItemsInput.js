import React from 'react'
import BsForm from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { useFormikContext, FieldArray, Field, ErrorMessage } from 'formik'
import Select from 'react-select'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import { emptyWasteItem } from './schema'
import isEmpty from 'lodash/isEmpty'
import { defaultSelectStyle } from '../../common/cutomStyles'
import SelectOrCreateBuyer from './SelectOrCreateBuyer'


export default function OutgoingWasteItemsInputArray({ wasteItemsMeta }) {
    const { values: { wasteItems } } = useFormikContext()

    return (
        <FieldArray name="wasteItems">
            {arrayHelpers => (
                isEmpty(wasteItems) ?
                    <Col sm={2}>
                        <Button variant="outline-primary"
                                onClick={() => arrayHelpers.push(emptyWasteItem)}
                        >
                            + ADD RECORD
                        </Button>
                    </Col>
                    :
                    wasteItems.map((_, idx) =>
                        <OutgoingWasteItemsInput key={idx}
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


function OutgoingWasteItemsInput({ idx, itemOptions, pushHelper, removeHelper }) {
    const { values: { wasteItems }, setFieldValue } = useFormikContext()

    return (
        <BsForm.Row className="align-items-center mb-3">
            <Col sm={2}>
                <Field name={`wasteItems[${idx}].itemId`}>
                    {
                        ({ field }) => (
                            <Select placeholder="Type of waste"
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
                    <ErrorMessage name={`wasteItems[${idx}].itemId`} />
                </small>
            </Col>
            <Col sm={2}>
                <Field name={`wasteItems[${idx}].quantity`}
                       placeholder="Quantity"
                       type="number"
                       as={BsForm.Control} />
                <small className="text-danger">
                    <ErrorMessage name={`wasteItems[${idx}].quantity`} />
                </small>
            </Col>
            <Col sm={2}>
                <Field name={`wasteItems[${idx}].rate`}
                       placeholder="Sale Rate (₹)"
                       type="number"
                       as={BsForm.Control}
                />
                <small className="text-danger">
                    <ErrorMessage name={`wasteItems[${idx}].rate`} />
                </small>
            </Col>
            <Col sm={2}>
                <Field name={`wasteItems[${idx}].buyerId`}>
                    {
                        ({ field }) =>
                            <SelectOrCreateBuyer
                                field={field}
                                setFieldValue={setFieldValue}
                                defaultVal={wasteItems[idx].buyer && wasteItems[idx].buyer}
                            />
                    }
                </Field>
                <small className="text-danger">
                    <ErrorMessage name={`wasteItems[${idx}].rate`} />
                </small>
            </Col>
            <Col sm={2}>
                <Button variant="link"
                        onClick={() => removeHelper(idx)}
                        tabIndex={idx + 10000}
                        size="sm"
                >
                    <HighlightOffIcon fontSize="small" />
                </Button>
                {
                    idx === wasteItems.length - 1 &&
                    <Button variant="outline-primary"
                            onClick={() => pushHelper(emptyWasteItem)}
                            size="sm"
                    >
                        + ADD
                    </Button>
                }
            </Col>
        </BsForm.Row>
    )
}

