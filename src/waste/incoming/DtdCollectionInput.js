import React from 'react'
import BsForm from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { useFormikContext, FieldArray, ErrorMessage, Field } from 'formik'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import Select from 'react-select'
import isEmpty from 'lodash/isEmpty'
import { emptyDtdWaste } from './schema'
import { defaultSelectStyle } from '../../common/cutomStyles'


export default function DtdCollectionInputArray({ vehicleTypesMeta }) {
    const { values: { dtdCollection } } = useFormikContext()

    return (
        <FieldArray name="dtdCollection">
            {arrayHelpers => (
                isEmpty(dtdCollection) ?
                    <Col sm={2}>
                        <Button variant="outline-primary"
                                onClick={() => arrayHelpers.push(emptyDtdWaste)}
                        >
                            + Add Entry
                        </Button>
                    </Col>
                    :
                    dtdCollection.map((_, idx) =>
                        <DtdCollectionInput key={idx}
                                            idx={idx}
                                            vehicleTypes={vehicleTypesMeta}
                                            pushHelper={arrayHelpers.push}
                                            removeHelper={arrayHelpers.remove}
                        />
                    )
            )}
        </FieldArray>
    )
}


function DtdCollectionInput({ idx, pushHelper, removeHelper, vehicleTypes }) {
    const { values: { dtdCollection }, setFieldValue } = useFormikContext()

    return (
        <BsForm.Row className="align-items-center mb-3 pt-3 border-top border-dark">
            <Col sm={2}>
                <BsForm.Label>Vehicle no.</BsForm.Label>
                <Field name={`dtdCollection[${idx}].vehicleNumber`}
                       placeholder="Vehicle No."
                       as={BsForm.Control} />
                <small className="text-danger">
                    <ErrorMessage name={`dtdCollection[${idx}].vehicleNumber`} />
                </small>
            </Col>
            <Col sm={2}>
                <BsForm.Label>Vehicle type</BsForm.Label>
                <Field name={`dtdCollection[${idx}].vehicleTypeId`}>
                    {
                        ({ field }) => (
                            <Select placeholder="Select"
                                    id={field.name}
                                    options={vehicleTypes}
                                    getOptionLabel={option => option['name']}
                                    getOptionValue={option => option['id']}
                                    onChange={value => setFieldValue(field.name, value.id)}
                                    onBlur={field.onBlur}
                                    value={field.value && vehicleTypes.filter(option => option.id === field.value).pop()}
                                    styles={defaultSelectStyle}
                                    isSearchable
                            />
                        )
                    }
                </Field>
                <small className="text-danger">
                    <ErrorMessage name={`dtdCollection[${idx}].vehicleTypeId`} />
                </small>
            </Col>
            <Col sm={2}>
                <BsForm.Label>Total Waste in Vehicle</BsForm.Label>
                <Field name={`dtdCollection[${idx}].quantity`}
                       type="number"
                       placeholder="kgs"
                       as={BsForm.Control} />
                <small className="text-danger">
                    <ErrorMessage name={`dtdCollection[${idx}].quantity`} />
                </small>
            </Col>
            <Col sm={2}>
                <BsForm.Label>Reject</BsForm.Label>
                <Field name={`dtdCollection[${idx}].rejectQty`}
                       type="number"
                       placeholder="kgs"
                       as={BsForm.Control} />
                <small className="text-danger">
                    <ErrorMessage name={`dtdCollection[${idx}].rejectQty`} />
                </small>
            </Col>
            <Col sm={2}>
                <BsForm.Label>Sanitary</BsForm.Label>
                <Field name={`dtdCollection[${idx}].sanitaryQty`}
                       type="number"
                       placeholder="kgs"
                       as={BsForm.Control} />
                <small className="text-danger">
                    <ErrorMessage name={`dtdCollection[${idx}].sanitaryQty`} />
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
                    idx === dtdCollection.length - 1 &&
                    <Button variant="outline-primary"
                            onClick={() => pushHelper(emptyDtdWaste)}
                            size="sm"
                    >
                        + ADD
                    </Button>
                }
            </Col>
        </BsForm.Row>
    )
}
