import React from "react"
import {
    List, Datagrid, TextField, Create, Edit, SimpleForm, EditButton,
    TextInput, ReferenceInput, SelectInput, ReferenceField, Show,
    SimpleShowLayout, ReferenceArrayInput, SelectArrayInput,
    ReferenceArrayField, SingleFieldList, ChipField, FormDataConsumer,
    BooleanField, BooleanInput, ShowButton, Filter
} from 'react-admin'
import { isRequired } from "../utils/validators"
import LineBreak from '../components/LineBreak'
import ActionsWithBackButton from "../components/ActionsWithBackButton"
import DefaultShowActions from "../components/DefaultShowActions"
import Div50 from "../components/Div50"


const ExpenseItemsFilter = props => (
    <Filter {...props}>
        <TextInput label="Search by item name" source="name" resettable alwaysOn />
    </Filter>
);

export const ListExpenseItems = (props) =>
    <List {...props} bulkActionButtons={false} title="Expense Items" perPage={25} filters={<ExpenseItemsFilter/>}>
        <Datagrid rowClick={() => false}>
            <TextField source="name" label="Name" />
            <ReferenceField label="Type"
                            source="typeId"
                            reference="expenseTypes"
                            link="show"
            >
                <TextField source="name" />
            </ReferenceField>
            <ReferenceArrayField label="Tags"
                                 reference="expenseTags"
                                 source="tagIds"
            >
                <SingleFieldList>
                    <ChipField source="name" />
                </SingleFieldList>
            </ReferenceArrayField>
            <ShowButton />
            <EditButton />
        </Datagrid>
    </List>


export const ShowExpenseItem = (props) =>
    <Show {...props} actions={<DefaultShowActions history={props.history} />}>
        <SimpleShowLayout>
            <TextField source="name" />
            <ReferenceField label="Type"
                            source="typeId"
                            reference="expenseTypes"
                            link="show"
            >
                <TextField source="name" />
            </ReferenceField>
            <ReferenceArrayField label="Tags"
                                 reference="expenseTags"
                                 source="tagIds"
            >
                <SingleFieldList>
                    <ChipField source="name" />
                </SingleFieldList>
            </ReferenceArrayField>
            <BooleanField source="askNumberOfUnits" />
        </SimpleShowLayout>
    </Show>


export const CreateExpenseItem = props =>
    <Create {...props}>
        <CreateEditForm />
    </Create>


export const EditExpenseItem = props =>
    <Edit
        undoable={false}
        actions={<ActionsWithBackButton history={props.history} />}
        {...props}
    >
        <CreateEditForm />
    </Edit>


const CreateEditForm = props =>
    <SimpleForm {...props} redirect="list">
        <Div50>
            <TextInput source="name" label="Name" validate={isRequired} fullWidth />
            <LineBreak n={3} />
            <FormDataConsumer>
                {formDataProps => <ExpenseTypeAndTagsInput {...formDataProps} />}
            </FormDataConsumer>
            <BooleanInput source="askNumberOfUnits" label="Ask number of item-units during data entry" />
        </Div50>
    </SimpleForm>


const ExpenseTypeAndTagsInput = ({ formData, ...rest }) => {
    return (
        <>
            <ReferenceInput label="Type"
                            source="typeId"
                            reference="expenseTypes"
                            sort={{ field: 'name', order: 'ASC' }}
                            {...rest}
            >
                <SelectInput optionText="name" optionValue="id" fullWidth resettable />
            </ReferenceInput>
            <ReferenceArrayInput source="tagIds"
                                 reference="expenseTags"
                                 resource="expenseItems"
                                 label="Tags"
                                 perPage={200}
                                 sort={{ field: 'name', order: 'ASC' }}
                                 {...rest}
            >
                <TagSelect linkedTypeId={formData.typeId} />
            </ReferenceArrayInput>
        </>
    )
}


const TagSelect = ({ choices, linkedTypeId, ...props }) => {
    const _choices = choices.filter(tag => [null, linkedTypeId].indexOf(tag.typeId) > -1)
    return (
        <SelectArrayInput optionText="name"
                          choices={_choices}
                          fullWidth
                          {...props}
        />
    )
}
