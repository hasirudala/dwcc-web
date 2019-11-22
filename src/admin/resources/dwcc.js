import React from "react"
import {
    List,
} from 'react-admin'

export const DwccList = (props) => (
    <List {...props} bulkActionButtons={false} title="DWCCs" children={null} />
);
