import React from "react"
import {
    List, Datagrid, TextField, FunctionField, Create, Edit, SimpleForm, EditButton,
    TextInput, DisabledInput, BooleanInput,
} from 'react-admin'


import { isRequired, validateEmail } from './validators'
import ActionsWithBackButton from "../components/ActionsWithBackButton"


export const UsersList = (props) => (
    <>
        <h1>Authorized Users</h1>
        <List {...props} bulkActions={false}>
            <Datagrid rowClick={() => false}>
                <TextField source="email" label="Login/email ID" />
                <TextField source="name" label="Name of person" />
                <FunctionField label="Access" render={user => user.isAdmin ? 'Administrator' : 'Staff'} />
                <EditButton />
            </Datagrid>
        </List>
    </>
)

export const CreateUser = props =>
    <Create {...props}>
        <CreateEditForm />
    </Create>


const UserTitle = ({ record }) =>
    <span>Modify user <b>{record && record.name}</b></span>

export const EditUser = props =>
    <Edit
        undoable={false}
        actions={<ActionsWithBackButton history={props.history} />}
        title={<UserTitle />}
        {...props}
    >
        <CreateEditForm edit />
    </Edit>

const CreateEditForm = ({ edit, ...props }) =>
    <SimpleForm {...props} redirect="list">
        {
            edit ?
                <DisabledInput source="email" />
                :
                <TextInput source="email" validate={validateEmail} />
        }
        <TextInput source="name" label="Name of person" validate={isRequired} />
        <BooleanInput source="isAdmin" label="Has administrator privileges" />
    </SimpleForm>
