import React from "react"
import {
    List, Datagrid, TextField, Create, Edit, SimpleForm, EditButton,
    TextInput, ReferenceInput, SelectInput, ReferenceField, Show,
    SimpleShowLayout, BooleanField, NumberField, DateField, BooleanInput,
    DateInput, NumberInput, ReferenceArrayField, SingleFieldList, ChipField,
    ShowButton, FormDataConsumer, Filter
} from 'react-admin'
import { useForm } from 'react-final-form'
import addYears from 'date-fns/addYears'
import formatISO from 'date-fns/formatISO'
import { dateNotInFuture, isRequired } from "../utils/validators"
import LineBreak from '../components/LineBreak'
import ActionsWithBackButton from "../components/ActionsWithBackButton"
import DefaultShowActions from "../components/DefaultShowActions"
import Div50 from "../components/Div50"


const DwccFilter = props => (
    <Filter {...props}>
        <TextInput label="Search by DWCC name" source="name" resettable alwaysOn />
    </Filter>
);


export const ListDwccs = (props) =>
    <List {...props} bulkActionButtons={false} title="DWCCs" perPage={25} filters={<DwccFilter/>}>
        <Datagrid rowClick={() => false}>
            <TextField source="name" label="Name" />
            <ReferenceField source="wardId" reference="wards" link="show" label="Ward">
                <TextField source="name" />
            </ReferenceField>
            <ReferenceField source="ward.region.id" reference="regions" link="show" label="Region">
                <TextField source="name" />
            </ReferenceField>
            <ReferenceArrayField label="Zones"
                                 reference="zones"
                                 source="ward.zoneIds"
            >
                <SingleFieldList>
                    <ChipField source="name" />
                </SingleFieldList>
            </ReferenceArrayField>
            <TextField source="ownerOrAgencyName" label="Owner/Agency Name" />
            <ShowButton />
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
            <ReferenceField source="ward.region.id" reference="regions" link="show" label="Region">
                <TextField source="name" />
            </ReferenceField>
            <TextField source="address" label="Address" />
            <TextField source="ownerOrAgencyName" label="Owner/Agency Name" />
            <DateField source="operatingSince" label="Operating since" />
            <NumberField source="areaInSqFt" label="Area in sq. ft." />
            <BooleanField source="ownedAndOperated" label="Owned and operated" />
            <BooleanField source="moaSigned" label="MoA signed" />
            <BooleanField source="mouSigned" label="MoU signed" />
            <DateField source="dateMouSigned" label="MoU signed on" />
            <DateField source="dateMouExpires" label="MoU expires on" />
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
            <ReferenceInput label="Ward" source="wardId" reference="wards" perPage={100}>
                <SelectInput optionText="name" validate={isRequired} fullWidth />
            </ReferenceInput>
            <LineBreak n={2} />
            <TextInput source="address" label="Address" multiline fullWidth resettable options={{ rows: 3 }} />
            <TextInput source="ownerOrAgencyName" label="Owner/Agency Name" fullWidth />
            <LineBreak n={2} />
            <DateInput source="operatingSince" label="Operating since" validate={[dateNotInFuture()]} />
            <LineBreak n={2} />
            <NumberInput source="areaInSqFt" label="Area in sq. ft." />
            <LineBreak n={2} />
            <BooleanInput source="ownedAndOperated" label="Owned and operated" />
            <LineBreak n={2} />
            <BooleanInput source="moaSigned" label="Is MoA signed?" />
            <LineBreak n={2} />
            <FormDataConsumer>
                {formDataProps => <MouInputs {...formDataProps} />}
            </FormDataConsumer>
        </Div50>
    </SimpleForm>

function MouInputs({ formData, ...rest }) {
    const form = useForm()

    return (
        <>
            <BooleanInput source="mouSigned"
                          label="Is MoU signed?"
                          onChange={value => {
                              if (!value) {
                                  form.change('dateMouSigned', null)
                                  form.change('dateMouExpires', null)
                              }
                          }}
                          style={{ width: '100%' }}
                          {...rest}
            />
            <LineBreak n={2} />
            {
                formData.mouSigned &&
                <>
                    <DateInput source="dateMouSigned"
                               label="MoU signed on?"
                               validate={[dateNotInFuture()]}
                               onChange={e => {
                                   let value = e.target.value
                                   if (value)
                                       form.change('dateMouExpires',
                                           formatISO(addYears(new Date(value), 3), { representation: 'date' }))
                               }}
                    />
                    <LineBreak n={2} />
                    <DateInput source="dateMouExpires"
                               label="MoU expires on?"
                               {...rest}
                    />
                </>
            }
        </>
    )
}
