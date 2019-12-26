import React from 'react'
import BsForm from 'react-bootstrap/Form'
import { Form, Formik } from 'formik'

import DateSelect from '../DateSelect'
import NoteInput from '../commonComponents/NoteInput'
import { DwccContext } from '../../home/DwccContext'
import useDataEntryForm from '../hooks/useDataEntryForm'
import schema from './schema'
import { formSectionStyle, FormSectionTitle } from '../commonComponents/FormSection'
import { RecordType } from '../constants'
import OutgoingWasteItemsInputArray from './OutgoingWasteItemsInput'
import DataEntryButtonPanel from '../commonComponents/DataEntryButtonPanel'
import FormErrors from '../commonComponents/FormErrors'
import isEmpty from 'lodash/isEmpty'


export default function OutgoingDataEntryForm({ onFormSubmit, edit, existingRecord }) {
    const { dwcc } = React.useContext(DwccContext)
    const {
        wasteItems,
        wasteBuyers,
        setAddingNext,
        submitForm,
        deleteRecord
    } = useDataEntryForm(onFormSubmit, edit, existingRecord, RecordType.Outgoing, dwcc)

    if (existingRecord)
        existingRecord.date = new Date(existingRecord.date)

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
                    <DateSelect recordType={RecordType.Outgoing} edit={edit} />
                </BsForm.Row>
                <BsForm.Row className={formSectionStyle}>
                    <FormSectionTitle title="Segregated Door-to-door Waste" />
                    <OutgoingWasteItemsInputArray wasteItemsMeta={wasteItems} buyersMeta={wasteBuyers} />
                </BsForm.Row>
                <BsForm.Row className={`${formSectionStyle} flex-column`}>
                    <FormErrors />
                    <br/>
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

function validate(values) {
    const errors = {}
    if (isEmpty(values.wasteItems))
        errors.form = 'At least one entry must be present'
    return errors
}


function getInitialValues(dwccId) {
    return {
        date: null,
        dwccId,
        wasteItems: [],
        note: ''
    }
}
