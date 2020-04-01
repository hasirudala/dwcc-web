import React from "react"
import {
    List, Datagrid, TextField, Create, Edit, SimpleForm, EditButton,
    TextInput, ReferenceInput, SelectInput, ReferenceField, Show,
    SimpleShowLayout, Filter
} from 'react-admin'
import { isRequired } from "../utils/validators"
import LineBreak from '../components/LineBreak'
import ActionsWithBackButton from "../components/ActionsWithBackButton"
import DefaultShowActions from "../components/DefaultShowActions"
import Div50 from "../components/Div50"


const ExpenseTagsFilter = props => (
    <Filter {...props}>
        <TextInput label="Search by tag name" source="name" resettable alwaysOn />
    </Filter>
);

export const ListExpenseTags = (props) =>
    <List {...props} bulkActionButtons={false} title="Expense Tags" perPage={25} filters={<ExpenseTagsFilter/>}>
        <Datagrid rowClick={() => false}>
            <TextField source="name" label="Name" />
            <ReferenceField label="Type"
                            source="typeId"
                            reference="expenseTypes"
                            link="show"
            >
                <TextField source="name" />
            </ReferenceField>
            <EditButton />
        </Datagrid>
    </List>


export const ShowExpenseTag = (props) =>
    <Show {...props} actions={<DefaultShowActions history={props.history} />}>
        <SimpleShowLayout>
            <TextField source="name" />
            <ReferenceField source="expenseTypeId" reference="expenseTypes" link="show" label="Type">
                <TextField source="name" />
            </ReferenceField>
        </SimpleShowLayout>
    </Show>


export const CreateExpenseTag = props =>
    <Create {...props}>
        <CreateEditForm />
    </Create>


export const EditExpenseTag = props =>
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
            <TextInput label="Name"
                       source="name"
                       validate={isRequired}
                       fullWidth
            />
            <LineBreak n={3} />
            <ReferenceInput label="Type"
                            source="typeId"
                            reference="expenseTypes"
                            sort={{ field: 'name', order: 'ASC' }}
            >
                <SelectInput optionText="name" fullWidth />
            </ReferenceInput>
        </Div50>
    </SimpleForm>
