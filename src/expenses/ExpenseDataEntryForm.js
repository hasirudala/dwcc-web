import React from 'react'
import BsForm from 'react-bootstrap/Form'
import { Form, Formik } from 'formik'
import { format } from 'date-fns'
import axios from 'axios/index'
import values from 'lodash/values'
import merge from 'lodash/merge'
import keyBy from 'lodash/keyBy'
import orderBy from 'lodash/orderBy'
import isEmpty from 'lodash/isEmpty'
import isFinite from 'lodash/isFinite'

import { DwccContext } from '../home/DwccContext'
import useExpenseEntryForm from './hooks'
import expenseSchema from './schema'
import DateSelect from '../common/components/DateSelect'
import { FormSectionTitle } from '../common/components/FormSection'
import ExpenseEntryInputArray from './ExpenseEntryInput'
import DataEntryButtonPanel from '../common/components/DataEntryButtonPanel'
import ExpensePurchaseInputArray from './ExpensePurchaseInput'
import FormErrors from '../common/components/FormErrors'


export default function ExpenseDataEntryForm({ onFormSubmit, edit, existingRecord }) {
    const { dwcc } = React.useContext(DwccContext)
    const {
        expenseItems,
        wasteItems,
        setAddingNext,
        submitForm,
        deleteRecord
    } = useExpenseEntryForm(onFormSubmit, edit, existingRecord)

    const checkIfRecordExistsForDate = React.useCallback((date, dwcc) =>
        axios.get('/expenses/search/existsForDate', {
            params: {
                date: format(date, 'yyyy-MM-dd'),
                dwccId: dwcc.id
            }
        }), [])


    if (existingRecord) existingRecord.date = new Date(existingRecord.date)

    return (
        expenseItems && wasteItems &&
        <Formik initialValues={getInitialValues(dwcc.id, expenseItems, existingRecord)}
                validationSchema={expenseSchema}
                validate={validate}
                onSubmit={submitForm}
                enableReinitialize={true}
        >
            <Form autoComplete="off">
                <BsForm.Row className="pb-3 border-bottom border-dark flex-column">
                    <DateSelect edit={edit} validatorFn={checkIfRecordExistsForDate} />
                </BsForm.Row>
                <BsForm.Row className="flex-column flex-nowrap pb-5 pt-3">
                    <ExpenseEntryInputArray />
                </BsForm.Row>
                <BsForm.Row className="flex-column flex-nowrap pb-5 border-bottom border-dark">
                    <FormSectionTitle title="Purchased Waste" />
                    <ExpensePurchaseInputArray wasteItemsMeta={wasteItems} edit={edit} />
                </BsForm.Row>
                <BsForm.Row>
                    <FormErrors />
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
    if (isEmpty(values.entries.filter(entry => isFinite(entry.amount))) && isEmpty(values.purchaseEntries))
        return { form: 'At least one entry must be present' }
    return {}
}

function getInitialValues(dwccId, expenseItems, existingRecord) {
    let initialValues = {
        date: undefined,
        dwccId,
        entries: expenseItems.map((expenseItem) => ({
            expenseItemId: expenseItem.id,
            _item: expenseItem,
            numItems: existingRecord ? undefined : '',
            amount: existingRecord ? undefined : ''
        }))
    }

    if (existingRecord) {
        let mergedEntries = values(merge(
            keyBy(existingRecord.entries, 'expenseItemId'),
            keyBy(initialValues.entries, 'expenseItemId')
        ))
        delete existingRecord.entries
        delete initialValues.entries
        initialValues = merge(initialValues, existingRecord)
        initialValues.entries = mergedEntries
    }

    initialValues.entries = orderBy(initialValues.entries, ['_item.type.id', 'expenseItemId'])
    return initialValues
}
