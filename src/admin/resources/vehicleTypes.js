import React from "react"
import {
    List, Datagrid, TextField, Create, Edit, SimpleForm, EditButton,
    TextInput, Show, SimpleShowLayout
} from 'react-admin'
import { isRequired } from "../utils/validators"
import LineBreak from '../components/LineBreak'
import ActionsWithBackButton from "../components/ActionsWithBackButton"
import DefaultShowActions from "../components/DefaultShowActions"
import Div50 from "../components/Div50"


export const ListVehicleTypes = (props) =>
    <List {...props} bulkActionButtons={false} title="Vehicle Types" perPage={25}>
        <Datagrid rowClick={() => false}>
            <TextField source="name" label="Name" />
            <EditButton />
        </Datagrid>
    </List>


export const ShowVehicleType = (props) =>
    <Show {...props} actions={<DefaultShowActions history={props.history} />}>
        <SimpleShowLayout>
            <TextField source="name" />
        </SimpleShowLayout>
    </Show>


export const CreateVehicleType = props =>
    <Create {...props}>
        <CreateEditForm />
    </Create>


export const EditVehicleType = props =>
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
            <LineBreak n={3} />
            <TextInput source="name" label="Name" validate={isRequired} fullWidth />
            <LineBreak n={3} />
        </Div50>
    </SimpleForm>
