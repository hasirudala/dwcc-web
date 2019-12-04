import React from "react"
import {
    List, Datagrid, TextField, Create, Edit, SimpleForm, EditButton,
    TextInput, ReferenceInput, SelectInput, ReferenceField, Show,
    SimpleShowLayout
} from 'react-admin'
import { isRequired } from "../utils/validators"
import LineBreak from '../components/LineBreak'
import ActionsWithBackButton from "../components/ActionsWithBackButton"
import DefaultShowActions from "../components/DefaultShowActions"
import Div50 from "../components/Div50"


export const ListWasteTags = (props) =>
    <List {...props} bulkActionButtons={false} title="Waste Tags">
        <Datagrid rowClick={() => false}>
            <TextField source="name" label="Name" />
            <ReferenceField label="Type"
                            source="typeId"
                            reference="wasteTypes"
                            link="show"
            >
                <TextField source="name" />
            </ReferenceField>
            <EditButton />
        </Datagrid>
    </List>


export const ShowWasteTag = (props) =>
    <Show {...props} actions={<DefaultShowActions history={props.history} />}>
        <SimpleShowLayout>
            <TextField source="name" />
            <ReferenceField source="wasteTypeId" reference="wasteTypes" link="show" label="Type">
                <TextField source="name" />
            </ReferenceField>
        </SimpleShowLayout>
    </Show>


export const CreateWasteTag = props =>
    <Create {...props}>
        <CreateEditForm />
    </Create>


export const EditWasteTag = props =>
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
                            reference="wasteTypes"
                            sort={{ field: 'name', order: 'ASC' }}
            >
                <SelectInput optionText="name" fullWidth />
            </ReferenceInput>
        </Div50>
    </SimpleForm>
