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
                onSubmit={submitForm}
                enableReinitialize={true}
        >
            <Form autoComplete="off">
                <BsForm.Row className="pb-3 border-bottom border-dark flex-column">
                    <DateSelect />
                </BsForm.Row>
                <BsForm.Row className={formSectionStyle}>
                    <FormSectionTitle title="Segregated Door-to-door Waste" />
                    <OutgoingWasteItemsInputArray wasteItemsMeta={wasteItems} buyersMeta={wasteBuyers} />
                </BsForm.Row>
                <BsForm.Row className={`${formSectionStyle} flex-column`}>
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

function getInitialValues(dwccId) {
    return {
        date: null,
        dwccId,
        wasteItems: [],
        note: ''
    }
}
