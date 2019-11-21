import React from "react"
import {
    List,
} from 'react-admin'

export const DwccList = (props) => (
    <List {...props} bulkActions={false} title="Dry Waste Centers" />
);
