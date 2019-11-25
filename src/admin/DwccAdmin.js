import React from "react"
import PropTypes from 'prop-types'
import { Admin, Resource } from "react-admin"
import defaultMessages from 'ra-language-english'
import polyglotI18nProvider from 'ra-i18n-polyglot'

import authProvider from "./adapters/authProvider"
import dataProvider from "./adapters/dataProvider"
import { store, adminHistory } from "../store"
import Dashboard from './Dashboard'
import { UsersList, CreateUser, EditUser } from "./resources/users"

const i18nProvider = polyglotI18nProvider(() => defaultMessages)

export default class DwccAdmin extends React.Component {
    static childContextTypes = {
        store: PropTypes.object
    }

    getChildContext() {
        return { store }
    }

    render() {
        return (
            <Admin
                dashboard={Dashboard}
                authProvider={authProvider}
                dataProvider={dataProvider}
                history={adminHistory}
                i18nProvider={i18nProvider}
            >
                <Resource name="users" list={UsersList} create={CreateUser} edit={EditUser} />
            </Admin>
        )
    }
}
