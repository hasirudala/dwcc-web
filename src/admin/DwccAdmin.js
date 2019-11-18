import React from "react";
import PropTypes from 'prop-types';

import { Admin } from "react-admin";
import authProvider from "./adapters/authProvider";
import { store, adminHistory } from "../store";


export default class DwccAdmin extends React.Component {
    static childContextTypes = {
        store: PropTypes.object
    };

    getChildContext() {
        return { store }
    }

    render() {
        return (
            <Admin title="DWCC Admin" authProvider={authProvider} history={adminHistory} />
        );
    }
}
