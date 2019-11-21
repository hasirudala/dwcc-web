import React from "react";
import PropTypes from 'prop-types';

import { Admin, Resource } from "react-admin";
import authProvider from "./adapters/authProvider";
import { store, adminHistory } from "../store";
import Dashboard from './Dashboard'
import { UsersList, CreateUser, EditUser } from "./resources/user"
import { DwccList } from "./resources/dwcc"


export default class DwccAdmin extends React.Component {
    static childContextTypes = {
        store: PropTypes.object
    };

    getChildContext() {
        return { store }
    }

    render() {
        return (
            <Admin dashboard={Dashboard} authProvider={authProvider} history={adminHistory}>
                <Resource name="users" list={UsersList} create={CreateUser} edit={EditUser} />
                <Resource name="dwcc" list={DwccList} options={{ label: "Dry Waste Centers" }} />
            </Admin>
        );
    }
}
