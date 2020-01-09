import React from 'react'
import BsForm from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import { Form, Formik, Field, ErrorMessage } from 'formik'
import isEmpty from 'lodash/isEmpty'
import { format } from 'date-fns'
import axios from 'axios/index'

import DateRangeSelect from './DateRangeSelect'
import NoteInput from '../commonComponents/NoteInput'
import { DwccContext } from '../../home/DwccContext'
import useDataEntryForm from '../hooks/useDataEntryForm'
import schema from './schema'
import { formSectionStyle, FormSectionTitle } from '../commonComponents/FormSection'
import { RecordType } from '../constants'
import OutgoingEntriesInputArray from './OutgoingEntriesInput'
import DataEntryButtonPanel from '../commonComponents/DataEntryButtonPanel'
import FormErrors from '../commonComponents/FormErrors'


export default function OutgoingDataEntryForm({ onFormSubmit, edit, existingRecord }) {
    const { dwcc } = React.useContext(DwccContext)
    const {
        wasteItems,
        wasteBuyers,
        setAddingNext,
        submitForm,
        deleteRecord
    } = useDataEntryForm(onFormSubmit, edit, existingRecord, RecordType.Outgoing, dwcc)

    if (existingRecord) {
        existingRecord.fromDate = new Date(existingRecord.fromDate)
        existingRecord.toDate = new Date(existingRecord.toDate)
    }

    return (
        wasteItems && wasteBuyers &&
        <Formik initialValues={edit ? existingRecord : getInitialValues(dwcc.id)}
                validationSchema={schema}
                validate={validate}
                onSubmit={submitForm}
                enableReinitialize={true}
        >
            <Form autoComplete="off">
                <BsForm.Row className="pb-3 border-bottom border-dark flex-column">
                    <DateRangeSelect edit={edit} />
                </BsForm.Row>
                <BsForm.Row className="py-5 border-bottom border-dark">
                    <Col sm={3}>
                        <BsForm.Label>Total quantity</BsForm.Label>
                        <Field name="totalQuantity"
                               placeholder="kgs"
                               type="number"
                               as={BsForm.Control} />
                        <small className="text-danger">
                            <ErrorMessage name="totalQuantity" />
                        </small>
                    </Col>
                    <Col sm={3}>
                        <BsForm.Label>Sanitary waste quantity</BsForm.Label>
                        <Field name="sanitaryWasteQuantity"
                               placeholder="kgs"
                               type="number"
                               as={BsForm.Control} />
                        <small className="text-danger">
                            <ErrorMessage name="sanitaryWasteQuantity" />
                        </small>
                    </Col>
                </BsForm.Row>
                <BsForm.Row className={formSectionStyle}>
                    <FormSectionTitle title="Segregated Waste" />
                    <OutgoingEntriesInputArray wasteItemsMeta={wasteItems}
                                               buyersMeta={wasteBuyers}
                                               edit={edit}
                    />
                </BsForm.Row>
                <BsForm.Row className={`${formSectionStyle} flex-column`}>
                    <FormErrors />
                    <br />
                    <NoteInput />
                </BsForm.Row>
                <BsForm.Row className="pt-3">
                    <DataEntryButtonPanel edit={edit}
                                          existingRecord={existingRecord}
                                          addNextFn={setAddingNext}
                                          deleteFn={deleteRecord}
                    />
                </BsForm.Row>
            </Form>
        </Formik>
    )
}

async function validate(values) {
    const errors = {}
    if (isEmpty(values.entries))
        errors.form = 'At least one entry must be present'

    if (values.fromDate && values.toDate && !values.id) {
        const { data } = await checkIfRecordExistsForDateRange(values.fromDate, values.toDate, values.dwccId)
        data ?
            errors.toDate = "Entry already exists for this date range"
            : delete errors.toDate
    }
    return errors
}

const checkIfRecordExistsForDateRange = async (from, to, dwccId) =>
    axios.get('/outgoingWaste/search/dateRangeExists', {
        params: {
            from: format(from, 'yyyy-MM-dd'),
            to: format(to, 'yyyy-MM-dd'),
            dwccId
        }
    })


function getInitialValues(dwccId) {
    return {
        fromDate: null,
        toDate: null,
        totalQuantity: '',
        sanitaryWasteQuantity: '',
        entries: [],
        dwccId,
        note: ''
    }
}
