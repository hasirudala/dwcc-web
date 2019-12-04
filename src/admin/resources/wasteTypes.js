import React from "react"
import {
    List, Datagrid, TextField, Create, Edit, SimpleForm, EditButton,
    TextInput, Show, SimpleShowLayout
} from 'react-admin'
import { isRequired } from "../utils/validators"
import ActionsWithBackButton from "../components/ActionsWithBackButton"
import DefaultShowActions from "../components/DefaultShowActions"
import Div50 from "../components/Div50"


export const ListWasteTypes = (props) =>
    <List {...props} bulkActionButtons={false} title="Waste Types">
        <Datagrid rowClick={() => false}>
            <TextField source="name" label="Name" />
            <EditButton />
        </Datagrid>
    </List>


export const ShowWasteType = (props) =>
    <Show {...props} actions={<DefaultShowActions history={props.history} />}>
        <SimpleShowLayout>
            <TextField source="name" />
        </SimpleShowLayout>
    </Show>


export const CreateWasteType = props =>
    <Create {...props}>
        <CreateEditForm />
    </Create>


export const EditWasteType = props =>
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
        </Div50>
    </SimpleForm>
