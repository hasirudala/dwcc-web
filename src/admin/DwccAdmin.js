import React from "react"
import PropTypes from 'prop-types'
import { Admin, Resource } from "react-admin"
import defaultMessages from 'ra-language-english'
import polyglotI18nProvider from 'ra-i18n-polyglot'

import authProvider from "./adapters/authProvider"
import dataProvider from "./adapters/dataProvider"
import { store, adminHistory } from "../store"
import Dashboard from './Dashboard'
import CustomLayout from "./components/CustomLayout"
import { ListUsers, CreateUser, EditUser } from "./resources/users"
import { CreateRegion, EditRegion, ListRegions, ShowRegion } from "./resources/regions"
import { CreateWard, EditWard, ListWards, ShowWard } from "./resources/wards"
import { CreateDwcc, EditDwcc, ListDwccs, ShowDwcc } from "./resources/dwccs"

defaultMessages['ra']['boolean']['null'] = '?'
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
                layout={CustomLayout}
            >
                <Resource name="users"
                          list={ListUsers}
                          create={CreateUser}
                          edit={EditUser}
                />
                <Resource name="regions"
                          list={ListRegions}
                          create={CreateRegion}
                          edit={EditRegion}
                          show={ShowRegion}
                />
                <Resource name="wards"
                          list={ListWards}
                          create={CreateWard}
                          edit={EditWard}
                          show={ShowWard}
                />
                <Resource name="dwccs"
                          list={ListDwccs}
                          create={CreateDwcc}
                          edit={EditDwcc}
                          show={ShowDwcc}
                          options={{ label: 'DWCCs' }}
                />
            </Admin>
        )
    }
}
