import React from 'react'
import BsForm from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { useFormikContext, FieldArray, ErrorMessage, Field } from 'formik'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import Select from 'react-select'
import isEmpty from 'lodash/isEmpty'
import isNil from 'lodash/isNil'
import includes from 'lodash/includes'

import { emptyMixedWaste } from './schema'
import { defaultSelectStyle } from '../../common/cutomStyles'


export default function MixedWasteInputArray({ edit, wasteItemsMeta }) {
    const { values: { mixedWaste } } = useFormikContext()

    return (
        <FieldArray name="mixedWaste">
            {arrayHelpers => (
                isEmpty(mixedWaste) ?
                    <Col sm={2}>
                        <Button variant="outline-primary"
                                onClick={() => arrayHelpers.push(emptyMixedWaste)}
                        >
                            + Add Entry
                        </Button>
                    </Col>
                    :
                    mixedWaste.map((_, idx) =>
                        <MixedWasteInput key={idx}
                                         idx={idx}
                                         wasteItems={wasteItemsMeta}
                                         pushHelper={arrayHelpers.push}
                                         removeHelper={arrayHelpers.remove}
                                         edit={edit}
                        />
                    )
            )}
        </FieldArray>
    )
}


function MixedWasteInput({ idx, wasteItems, pushHelper, removeHelper, edit }) {
    const { values: { mixedWaste }, setFieldValue, setFieldTouched } = useFormikContext()

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
                <Field name={`mixedWaste[${idx}].itemIds`}>
                    {
                        ({ field }) => (
                            <Select placeholder="Select"
                                    id={field.name}
                                    options={wasteItems}
                                    isMulti
                                    isSearchable
                                    getOptionLabel={option => option['name']}
                                    getOptionValue={option => option['id']}
                                    onChange={
                                        (value, { action }) =>
                                            handleSelectChange(value, action, field.name, field.value)
                                    }
                                    onBlur={() => setFieldTouched(field.name)}
                                    value={wasteItems.filter(opt => includes(field.value, opt.id))}
                                    styles={defaultSelectStyle}
                                    closeMenuOnSelect={false}
                                    isDisabled={edit && !isNil(mixedWaste[idx].id)}
                            />
                        )
                    }
                </Field>
                <small className="text-danger">
                    <ErrorMessage name={`mixedWaste[${idx}].itemIds`} />
                </small>
            </Col>
            <Col sm={2}>
                <BsForm.Label>Quantity</BsForm.Label>
                <Field name={`mixedWaste[${idx}].quantity`}
                       type="number"
                       placeholder="kgs"
                       as={BsForm.Control} />
                <small className="text-danger">
                    <ErrorMessage name={`mixedWaste[${idx}].quantity`} />
                </small>
            </Col>
            <Col sm={2}>
                <BsForm.Label>Reject</BsForm.Label>
                <Field name={`mixedWaste[${idx}].rejectQty`}
                       type="number"
                       placeholder="kgs"
                       as={BsForm.Control} />
                <small className="text-danger">
                    <ErrorMessage name={`mixedWaste[${idx}].rejectQty`} />
                </small>
            </Col>
            <Col sm={2}>
                <BsForm.Label>Purchase rate</BsForm.Label>
                <Field name={`mixedWaste[${idx}].rate`}
                       type="number"
                       placeholder="₹"
                       as={BsForm.Control} />
                <small className="text-danger">
                    <ErrorMessage name={`mixedWaste[${idx}].rate`} />
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
                    idx === mixedWaste.length - 1 &&
                    <Button variant="outline-primary"
                            onClick={() => pushHelper(emptyMixedWaste)}
                            size="sm"
                    >
                        + ADD
                    </Button>
                }
            </Col>
        </BsForm.Row>
    )
}
