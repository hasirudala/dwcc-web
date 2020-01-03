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


export const ListZones = (props) =>
    <List {...props} bulkActionButtons={false} perPage={25}>
        <Datagrid rowClick={() => false}>
            <TextField source="name" label="Name" />
            <ReferenceField source="regionId" reference="regions" link="show" label="Region">
                <TextField source="name" />
            </ReferenceField>
            <EditButton />
        </Datagrid>
    </List>


export const ShowZone = (props) =>
    <Show {...props} actions={<DefaultShowActions history={props.history} />}>
        <SimpleShowLayout>
            <TextField source="name" />
            <ReferenceField source="regionId" reference="regions" link="show" label="Region">
                <TextField source="name" />
            </ReferenceField>
        </SimpleShowLayout>
    </Show>


export const CreateZone = props =>
    <Create {...props}>
        <CreateEditForm />
    </Create>


export const EditZone = props =>
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
            <ReferenceInput label="Region" source="regionId" reference="regions">
                <SelectInput optionText="name" validate={isRequired} fullWidth />
            </ReferenceInput>
        </Div50>
    </SimpleForm>
