import React from "react"
import {
    List, Datagrid, TextField, FunctionField, Create, Edit, SimpleForm, EditButton,
    TextInput, BooleanInput,
} from 'react-admin'


import { isRequired, validateEmail } from './validators'
import ActionsWithBackButton from "../components/ActionsWithBackButton"
import LineBreak from '../components/LineBreak'


export const UsersList = (props) => (
    <List {...props} bulkActionButtons={false}>
        <Datagrid rowClick={() => false}>
            <TextField source="email" label="Login/email ID" />
            <TextField source="name" label="Name of person" />
            <FunctionField label="Access" render={user => user.isAdmin ? 'Administrator' : 'Staff'} />
            <EditButton />
        </Datagrid>
    </List>
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


const Div = ({ children }) => <div style={{ width: '50%' }}>{children}</div>

const CreateEditForm = ({ edit, ...props }) =>
    <SimpleForm {...props} redirect="list">
        <Div>
            {
                edit ?
                    <TextInput disabled source="email" fullWidth />
                    :
                    <TextInput source="email" validate={validateEmail} fullWidth />
            }
            <LineBreak n={3} />
            <TextInput source="name" label="Name of person" validate={isRequired} fullWidth />
            <LineBreak n={3} />
            <BooleanInput source="isAdmin" label="Has administrator privileges" fullWidth />
        </Div>
    </SimpleForm>
