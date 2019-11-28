import React from "react"
import {
    List, Datagrid, TextField, Create, Edit, SimpleForm, EditButton,
    TextInput, ReferenceInput, SelectInput, ReferenceField, Show,
    SimpleShowLayout, BooleanField, NumberField, DateField, NullableBooleanInput,
    DateInput, NumberInput
} from 'react-admin'
import { dateNotInFuture, isRequired } from "../utils/validators"
import LineBreak from '../components/LineBreak'
import ActionsWithBackButton from "../components/ActionsWithBackButton"
import DefaultShowActions from "../components/DefaultShowActions"
import Div50 from "../components/Div50"


export const ListDwccs = (props) =>
    <List {...props} bulkActionButtons={false} title="DWCCs">
        <Datagrid rowClick={() => false}>
            <TextField source="name" label="Name" />
            <ReferenceField source="wardId" reference="wards" link="show" label="Ward">
                <TextField source="name" />
            </ReferenceField>
            <TextField source="ownerOrAgencyName" label="Owner/Agency Name" />
            <BooleanField source="ownedAndOperated" label="Owned and operated" />
            <DateField source="operatingSince" label="Operating since" />
            <NumberField source="areaInSqFt" label="Area in sq. ft." />
            <BooleanField source="mouMoaSigned" label="MoU/MoA signed" />
            <EditButton />
        </Datagrid>
    </List>


export const ShowDwcc = (props) =>
    <Show {...props} actions={<DefaultShowActions history={props.history} />}>
        <SimpleShowLayout>
            <TextField source="name" />
            <ReferenceField source="wardId" reference="wards" link="show" label="Ward">
                <TextField source="name" />
            </ReferenceField>
            <TextField source="ownerOrAgencyName" label="Owner/Agency Name" />
            <BooleanField source="ownedAndOperated" label="Owned and operated" />
            <DateField source="operatingSince" label="Operating since" />
            <NumberField source="areaInSqFt" label="Area in sq. ft." />
            <BooleanField source="mouMoaSigned" label="MoU/MoA signed" />
        </SimpleShowLayout>
    </Show>


export const CreateDwcc = props =>
    <Create {...props}>
        <CreateEditForm />
    </Create>


export const EditDwcc = props =>
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
            <LineBreak n={2} />
            <ReferenceInput label="Ward" source="wardId" reference="wards">
                <SelectInput optionText="name" validate={isRequired} fullWidth />
            </ReferenceInput>
            <LineBreak n={2} />
            <TextInput source="ownerOrAgencyName" label="Owner/Agency Name" fullWidth />
            <LineBreak n={2} />
            <NullableBooleanInput source="ownedAndOperated" label="Owned and operated" style={{ width: '100%' }} />
            <LineBreak n={2} />
            <DateInput source="operatingSince" label="Operating since" validate={[dateNotInFuture()]} fullWidth />
            <LineBreak n={2} />
            <NumberInput source="areaInSqFt" label="Area in sq. ft." fullWidth />
            <LineBreak n={2} />
            <NullableBooleanInput source="mouMoaSigned" label="MoU/MoA signed" style={{ width: '100%' }} />
        </Div50>
    </SimpleForm>
