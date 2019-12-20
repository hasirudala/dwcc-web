import React from 'react'
import BsForm from 'react-bootstrap/Form'
import { useFormikContext, Form, Formik } from 'formik'
import isEmpty from 'lodash/isEmpty'
import sumBy from 'lodash/sumBy'

import DateSelect from '../DateSelect'
import DtdCollectionInputArray from './DtdCollectionInput'
import ItemizedWasteInputArray from './ItemizedWasteInput'
import MixedWasteInputArray from './MixedWasteInput'
import { ValidationFlagsInput, NoteInput } from '../commonComponents/DataEntryMetaInput'
import incomingSchema, { emptyDtdWaste, emptyWasteItem, emptyMixedWaste } from './schema'
import { DwccContext } from '../../home/DwccContext'
import useDataEntryForm from '../hooks/useDataEntryForm'
import { formSectionStyle, FormSectionTitle } from '../commonComponents/FormSection'
import { RecordType } from '../constants'
import DataEntryButtonPanel from '../commonComponents/DataEntryButtonPanel'


export default function IncomingDataEntryForm({ onFormSubmit, edit, existingRecord }) {
    const { dwcc } = React.useContext(DwccContext)
    const {
        wasteItems,
        vehicleTypes,
        setAddingNext,
        submitForm,
        deleteRecord
    } = useDataEntryForm(onFormSubmit, edit, existingRecord, RecordType.Incoming)

    if (existingRecord) existingRecord.date = new Date(existingRecord.date)

    return (
        wasteItems && vehicleTypes &&
        <Formik initialValues={edit ? existingRecord : getInitialValues(dwcc.id)}
                validationSchema={incomingSchema}
                validate={validate}
                onSubmit={submitForm}
                enableReinitialize={true}
        >
            <Form autoComplete="off">
                <BsForm.Row className="pb-3 border-bottom border-dark flex-column">
                    <DateSelect />
                </BsForm.Row>
                <BsForm.Row className={formSectionStyle}>
                    <FormSectionTitle title="Door-to-door collection" />
                    <DtdCollectionInputArray vehicleTypesMeta={vehicleTypes} />
                </BsForm.Row>
                <BsForm.Row className={formSectionStyle}>
                    <FormSectionTitle title="Segregated Door-to-door Waste" />
                    <ItemizedWasteInputArray wasteItemsMeta={wasteItems} />
                </BsForm.Row>
                <BsForm.Row className={formSectionStyle}>
                    <FormSectionTitle title="Other Incoming Waste" />
                    <MixedWasteInputArray wasteItemsMeta={wasteItems} edit={edit} />
                </BsForm.Row>
                <BsForm.Row className={`${formSectionStyle} flex-column`}>
                    <FormErrors />
                    <ValidationFlagsInput />
                    <NoteInput className="my-3" />
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

function FormErrors() {
    const { errors } = useFormikContext()
    return (
        !isEmpty(errors.form) &&
        <div>
            <span className="text-danger">{errors.form}</span>
        </div>
    )
}

function validate(values) {
    const errors = {}
    if (!values.errorsIgnored) {
        const totalCollected = sumBy(values.dtdCollection, c => c.quantity)
        const totalSegregated = sumBy(values.wasteItems, s => s.quantity)
        if (totalCollected < totalSegregated)
            errors.form = 'Total collected waste cannot be less than total segregated waste'
    }
    return errors
}


function getInitialValues(dwccId) {
    return {
        date: null,
        dwccId,
        dtdCollection: [emptyDtdWaste],
        wasteItems: [emptyWasteItem],
        mixedWaste: [emptyMixedWaste],
        errorsIgnored: false,
        approvedByAdmin: false,
        note: ''
    }
}
