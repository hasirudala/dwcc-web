import React from "react"
import {
    List,
    Datagrid,
    TextField,
    FunctionField
} from 'react-admin'

export const UsersList = (props) => (
    <List {...props} bulkActions={false} title="Authorized Users">
        <Datagrid rowClick="show">
            <TextField source="email" label="Login/email ID" />
            <TextField source="name" label="Name of the person" />
            <FunctionField label="Access" render={ user => user.isAdmin ? 'Administrator' : 'Staff' } />
            <FunctionField label="Status" render={ user => user.isDisabled ? 'Disabled' : 'Active' } />
        </Datagrid>
    </List>
);
