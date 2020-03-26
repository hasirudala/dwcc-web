import React from 'react'
import BsForm from 'react-bootstrap/Form'
import { Form, Formik } from 'formik'
import isEmpty from 'lodash/isEmpty'
import every from 'lodash/every'
import { format } from 'date-fns'
import axios from 'axios/index'

import DateSelect from '../../common/components/DateSelect'
import DtdCollectionInputArray from './DtdCollectionInput'
import MixedWasteInputArray from './MixedWasteInput'
import FormErrors from '../../common/components/FormErrors'
import NoteInput from '../commonComponents/NoteInput'
import incomingSchema, { emptyDtdWaste, /*emptyWasteItem,*/ emptyMixedWaste } from './schema'
import { DwccContext } from '../../home/DwccContext'
import useDataEntryForm from '../hooks'
import { formSectionStyle, FormSectionTitle } from '../../common/components/FormSection'
import { RecordType } from '../../common/constants'
import DataEntryButtonPanel from '../../common/components/DataEntryButtonPanel'


export default function IncomingDataEntryForm({ onFormSubmit, edit, existingRecord }) {
    const { dwcc } = React.useContext(DwccContext)
    const {
        wasteItems,
        vehicleTypes,
        setAddingNext,
        submitForm,
        deleteRecord
    } = useDataEntryForm(onFormSubmit, edit, existingRecord, RecordType.Incoming)

    const checkIfRecordExistsForDate = React.useCallback((date, dwcc) =>
        axios.get('/incomingWaste/search/existsForDate', {
            params: {
                date: format(date, 'yyyy-MM-dd'),
                dwccId: dwcc.id
            }
        }), [])

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
                    <DateSelect edit={edit} validatorFn={checkIfRecordExistsForDate} />
                </BsForm.Row>
                <BsForm.Row className={formSectionStyle}>
                    <FormSectionTitle title="Door-to-door collection" />
                    <DtdCollectionInputArray vehicleTypesMeta={vehicleTypes} />
                </BsForm.Row>
                <BsForm.Row className={formSectionStyle}>
                    <FormSectionTitle title="Other incoming / Dropped-off waste" />
                    <MixedWasteInputArray wasteItemsMeta={wasteItems} edit={edit} />
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

function validate(values) {
    const errors = {}
    if (every([values.dtdCollection, values.mixedWaste], isEmpty))
        errors.form = 'At least one entry in either of ' +
            '"Door-to-door collection" or "Other Incoming Waste" must be present'
    return errors
}


function getInitialValues(dwccId) {
    return {
        date: null,
        dwccId,
        dtdCollection: [emptyDtdWaste],
        mixedWaste: [emptyMixedWaste],
        note: ''
    }
}
