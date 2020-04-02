import React from "react"
import {
    List, Datagrid, TextField, Create, Edit, SimpleForm, EditButton,
    TextInput, ReferenceInput, SelectInput, ReferenceField, Show,
    SimpleShowLayout, ReferenceArrayField, SingleFieldList, ChipField,
    FormDataConsumer, ReferenceArrayInput, SelectArrayInput, Filter
} from 'react-admin'
import { isRequired } from "../utils/validators"
import LineBreak from '../components/LineBreak'
import ActionsWithBackButton from "../components/ActionsWithBackButton"
import DefaultShowActions from "../components/DefaultShowActions"
import Div50 from "../components/Div50"


const WardFilter = props => (
    <Filter {...props}>
        <TextInput label="Search Wards" source="name" resettable alwaysOn />
    </Filter>
);


export const ListWards = (props) =>
    <List {...props} bulkActionButtons={false} perPage={25} filters={<WardFilter/>}>
        <Datagrid rowClick={() => false}>
            <TextField source="name" label="Name" />
            <ReferenceField source="regionId" reference="regions" link="show" label="Region">
                <TextField source="name" />
            </ReferenceField>
            <ReferenceArrayField label="Zones"
                                 reference="zones"
                                 source="zoneIds"
            >
                <SingleFieldList>
                    <ChipField source="name" />
                </SingleFieldList>
            </ReferenceArrayField>
            <EditButton />
        </Datagrid>
    </List>


export const ShowWard = (props) =>
    <Show {...props} actions={<DefaultShowActions history={props.history} />}>
        <SimpleShowLayout>
            <TextField source="name" />
            <ReferenceField source="regionId" reference="regions" link="show" label="Region">
                <TextField source="name" />
            </ReferenceField>
            <ReferenceArrayField label="Zones"
                                 reference="zones"
                                 source="zoneIds"
            >
                <SingleFieldList>
                    <ChipField source="name" />
                </SingleFieldList>
            </ReferenceArrayField>
        </SimpleShowLayout>
    </Show>


export const CreateWard = props =>
    <Create {...props}>
        <CreateEditForm />
    </Create>


export const EditWard = props =>
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
                {formDataProps => <RegionAndZonesInput { ...formDataProps } />}
            </FormDataConsumer>
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
            <ReferenceArrayInput source="zoneIds"
                                 reference="zones"
                                 resource="wards"
                                 label="Zones"
                                 perPage={300}
                                 sort={{ field: 'name', order: 'ASC' }}
                                 {...rest}
            >
                <ZoneSelect linkedRegionId={formData.regionId} />
            </ReferenceArrayInput>
        </>
    )
}


const ZoneSelect = ({ choices, linkedRegionId, ...props }) => {
    const _choices = choices.filter(zone => zone.regionId === linkedRegionId)
    return (
        <SelectArrayInput optionText="name"
                          choices={_choices}
                          fullWidth
                          {...props}
        />
    )
}
