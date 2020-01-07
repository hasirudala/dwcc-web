import React from "react"
import {
    List, Datagrid, TextField, Create, Edit, SimpleForm, EditButton,
    TextInput, Show, SimpleShowLayout, ReferenceField, ReferenceInput,
    SelectInput, BooleanField, BooleanInput, ShowButton, ReferenceArrayField,
    SingleFieldList, ChipField, ReferenceArrayInput, SelectArrayInput,
    FormDataConsumer
} from 'react-admin'
import { isRequired } from "../utils/validators"
import ActionsWithBackButton from "../components/ActionsWithBackButton"
import DefaultShowActions from "../components/DefaultShowActions"
import Div50 from "../components/Div50"
import LineBreak from '../components/LineBreak'


export const ListWasteBuyers = (props) =>
    <List {...props} bulkActionButtons={false} title="Waste Buyers" perPage={25}>
        <Datagrid rowClick={() => false}>
            <TextField source="name" label="Name" />
            <ReferenceField source="regionId" reference="regions" link="show" label="Region">
                <TextField source="name" />
            </ReferenceField>
            <ReferenceField source="zoneId" reference="zones" link="show" label="Zone">
                <TextField source="name" />
            </ReferenceField>
            <BooleanField source="isKspcbAuthorized" label="Authorized by KSPCB" />
            <ShowButton />
            <EditButton />
        </Datagrid>
    </List>


export const ShowWasteBuyer = (props) =>
    <Show {...props} actions={<DefaultShowActions history={props.history} />}>
        <SimpleShowLayout>
            <TextField source="name" />
            <ReferenceField source="regionId" reference="regions" link="show" label="Region">
                <TextField source="name" />
            </ReferenceField>
            <ReferenceField source="zoneId" reference="zones" link="show" label="Zone">
                <TextField source="name" />
            </ReferenceField>
            <TextField source="address" />
            <BooleanField source="isKspcbAuthorized" label="Authorized by KSPCB" />
            <ReferenceArrayField label="Accepted items"
                                 reference="wasteItems"
                                 source="acceptedItemIds"
            >
                <SingleFieldList>
                    <ChipField source="name" />
                </SingleFieldList>
            </ReferenceArrayField>
        </SimpleShowLayout>
    </Show>


export const CreateWasteBuyer = props =>
    <Create {...props}>
        <CreateEditForm />
    </Create>


export const EditWasteBuyer = props =>
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
                {formDataProps => <RegionAndZonesInput {...formDataProps} />}
            </FormDataConsumer>
            <TextInput source="address" label="Address" multiline fullWidth resettable options={{ rows: 3 }} />
            <BooleanInput source="isKspcbAuthorized" label="Authorized by KSPCB" />
            <ReferenceArrayInput source="acceptedItemIds"
                                 reference="wasteItems"
                                 label="Accepted Items"
                                 sort={{ field: 'name', order: 'ASC' }}
            >
                <SelectArrayInput optionText="name" fullWidth />
            </ReferenceArrayInput>
        </Div50>
    </SimpleForm>

const RegionAndZonesInput = ({ formData, ...rest }) => {
    return (
        <>
            <ReferenceInput label="Region"
                            source="regionId"
                            reference="regions"
                            sort={{ field: 'name', order: 'ASC' }}
                            {...rest}
            >
                <SelectInput optionText="name" validate={isRequired} optionValue="id" fullWidth resettable />
            </ReferenceInput>
            <ReferenceInput source="zoneId"
                            reference="zones"
                            resource="wards"
                            label="Zones"
                            sort={{ field: 'name', order: 'ASC' }}
                            {...rest}
            >
                <ZoneSelect linkedRegionId={formData.regionId} />
            </ReferenceInput>
        </>
    )
}


const ZoneSelect = ({ choices, linkedRegionId, ...props }) => {
    const _choices = choices.filter(zone => zone.regionId === linkedRegionId)
    return (
        <SelectInput optionText="name"
                     choices={_choices}
                     fullWidth
                     {...props}
        />
    )
}
