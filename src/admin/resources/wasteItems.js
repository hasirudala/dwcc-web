import React from "react"
import {
    List, Datagrid, TextField, Create, Edit, SimpleForm, EditButton,
    TextInput, ReferenceInput, SelectInput, ReferenceField, Show,
    SimpleShowLayout, ReferenceArrayInput, SelectArrayInput,
    ReferenceArrayField, SingleFieldList, ChipField, FormDataConsumer
} from 'react-admin'
import { isRequired } from "../utils/validators"
import LineBreak from '../components/LineBreak'
import ActionsWithBackButton from "../components/ActionsWithBackButton"
import DefaultShowActions from "../components/DefaultShowActions"
import Div50 from "../components/Div50"


export const ListWasteItems = (props) =>
    <List {...props} bulkActionButtons={false} title="Waste Items" perPage={25}>
        <Datagrid rowClick={() => false}>
            <TextField source="name" label="Name" />
            <ReferenceField label="Type"
                            source="typeId"
                            reference="wasteTypes"
                            link="show"
            >
                <TextField source="name" />
            </ReferenceField>
            <ReferenceArrayField label="Tags"
                                 reference="wasteTags"
                                 source="tagIds"
            >
                <SingleFieldList>
                    <ChipField source="name" />
                </SingleFieldList>
            </ReferenceArrayField>
            <EditButton />
        </Datagrid>
    </List>


export const ShowWasteItem = (props) =>
    <Show {...props} actions={<DefaultShowActions history={props.history} />}>
        <SimpleShowLayout>
            <TextField source="name" />
            <ReferenceField label="Type"
                            source="typeId"
                            reference="wasteTypes"
                            link="show"
            >
                <TextField source="name" />
            </ReferenceField>
            <ReferenceArrayField label="Tags"
                                 reference="wasteTags"
                                 source="tagIds"
            >
                <SingleFieldList>
                    <ChipField source="name" />
                </SingleFieldList>
            </ReferenceArrayField>
        </SimpleShowLayout>
    </Show>


export const CreateWasteItem = props =>
    <Create {...props}>
        <CreateEditForm />
    </Create>


export const EditWasteItem = props =>
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
                {formDataProps => <WasteTypeAndTagsInput {...formDataProps} />}
            </FormDataConsumer>
        </Div50>
    </SimpleForm>


const WasteTypeAndTagsInput = ({ formData, ...rest }) => {
    return (
        <>
            <ReferenceInput label="Type"
                            source="typeId"
                            reference="wasteTypes"
                            sort={{ field: 'name', order: 'ASC' }}
                            {...rest}
            >
                <SelectInput optionText="name" optionValue="id" fullWidth resettable />
            </ReferenceInput>
            <ReferenceArrayInput source="tagIds"
                                 reference="wasteTags"
                                 label="Tags"
                                 sort={{ field: 'name', order: 'ASC' }}
                                 {...rest}
            >
                <TagSelect linkedTypeId={formData.typeId} />
            </ReferenceArrayInput>
        </>
    )
}


const TagSelect = ({ choices, linkedTypeId, ...props }) => {
    const _choices = choices.filter(tag => [null, linkedTypeId].indexOf(tag.typeId) > -1)
    return (
        <SelectArrayInput optionText="name"
                          choices={_choices}
                          fullWidth
                          {...props}
        />
    )
}
