import React from 'react'
import Button from 'react-bootstrap/Button'
import BsForm from 'react-bootstrap/Form'
import { useFormikContext, Form, Formik } from 'formik'
import isEmpty from 'lodash/isEmpty'
import sumBy from 'lodash/sumBy'
import axios from 'axios'

import DateSelect from '../DateSelect'
import DtdCollectionInputArray from './DtdCollectionInput'
import ItemizedWasteInputArray from './ItemizedWasteInput'
import MixedWasteInputArray from './MixedWasteInput'
import { ValidationFlagsInput, NoteInput } from './DataEntryMetaInput'
import schema, { emptyDtdWaste, emptyWasteItem, emptyMixedWaste } from '../schema'
import { DwccContext } from '../../home/DwccContext'
import { AuthContext } from '../../common/AuthContext'
import useIncomingDataEntryForm from '../hooks/useIncomingDataEntryForm'


const sectionStyle = "border-bottom border-dark flex-column flex-nowrap pb-5 pt-3"
const SectionHeader = ({ title }) => <h4 className="text-muted">{title}</h4>


export default function IncomingDataEntryForm({ onFormSubmit, edit, existingRecord }) {
    const { dwcc } = React.useContext(DwccContext)
    const { userInfo } = React.useContext(AuthContext)

    const {
        wasteItems,
        vehicleTypes,
        setAddingNext,
        submitForm
    } = useIncomingDataEntryForm(onFormSubmit, edit, existingRecord)

    if (existingRecord) existingRecord.date = new Date(existingRecord.date)

    return (
        wasteItems && vehicleTypes &&
        <Formik initialValues={edit ? existingRecord : getInitialValues(dwcc.id)}
                validationSchema={schema}
                validate={validate}
                onSubmit={submitForm}
                enableReinitialize={true}
        >
            <Form autoComplete="off">
                <BsForm.Row className="pb-3 border-bottom border-dark flex-column">
                    <DateSelect />
                </BsForm.Row>
                <BsForm.Row className={sectionStyle}>
                    <SectionHeader title="Door-to-door collection" />
                    <DtdCollectionInputArray vehicleTypesMeta={vehicleTypes} />
                </BsForm.Row>
                <BsForm.Row className={sectionStyle}>
                    <SectionHeader title="Segregated Door-to-door Waste" />
                    <ItemizedWasteInputArray wasteItemsMeta={wasteItems} />
                </BsForm.Row>
                <BsForm.Row className={sectionStyle}>
                    <SectionHeader title="Other Incoming Waste" />
                    <MixedWasteInputArray wasteItemsMeta={wasteItems} edit={edit} />
                </BsForm.Row>
                <BsForm.Row className={`${sectionStyle} flex-column`}>
                    <FormErrors />
                    <ValidationFlagsInput />
                    <NoteInput className="my-3" />
                </BsForm.Row>
                <BsForm.Row className="pt-3">
                    <Button type="submit" variant={edit ? 'primary' : 'secondary'}>
                        Save
                    </Button>
                    {
                        !edit &&
                        <Button type="submit" onClick={() => setAddingNext(true)} className="ml-3">
                            Save and add next
                        </Button>
                    }
                    {
                        !edit &&
                        <Button type="reset" variant="secondary" className="ml-auto">Reset</Button>
                    }
                    {
                        edit && userInfo.isAdmin &&
                        <Button onClick={() => deleteRecord(existingRecord.id, onFormSubmit)} variant="danger"
                                className="ml-auto"
                        >
                            Delete
                        </Button>
                    }
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

function deleteRecord(recordId, onDelete) {
    axios
        .delete(`/incomingWaste/${recordId}`)
        .then(data => onDelete(data.data, 'delete'))
        .catch(error => alert(error.message))
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
