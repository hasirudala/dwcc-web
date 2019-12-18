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
import CustomLogoutButton from "./components/CustomLogoutButton"
import { ListUsers, CreateUser, EditUser } from "./resources/users"
import { CreateRegion, EditRegion, ListRegions, ShowRegion } from "./resources/regions"
import { CreateWard, EditWard, ListWards, ShowWard } from "./resources/wards"
import { CreateDwcc, EditDwcc, ListDwccs, ShowDwcc } from "./resources/dwccs"
import { CreateWasteType, EditWasteType, ListWasteTypes, ShowWasteType } from "./resources/wasteTypes"
import { CreateWasteTag, EditWasteTag, ListWasteTags, ShowWasteTag } from "./resources/wasteTags"
import { CreateWasteItem, EditWasteItem, ListWasteItems, ShowWasteItem } from "./resources/wasteItems"
import { CreateVehicleType, EditVehicleType, ListVehicleTypes, ShowVehicleType } from "./resources/vehicleTypes"

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
            <Admin dashboard={Dashboard}
                   authProvider={authProvider}
                   dataProvider={dataProvider}
                   history={adminHistory}
                   i18nProvider={i18nProvider}
                   layout={CustomLayout}
                   logoutButton={CustomLogoutButton}
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
                <Resource name="wasteTypes"
                          list={ListWasteTypes}
                          create={CreateWasteType}
                          edit={EditWasteType}
                          show={ShowWasteType}
                          options={{ label: 'Waste Types' }}
                />
                <Resource name="wasteTags"
                          list={ListWasteTags}
                          create={CreateWasteTag}
                          edit={EditWasteTag}
                          show={ShowWasteTag}
                          options={{ label: 'Waste Tags' }}
                />
                <Resource name="wasteItems"
                          list={ListWasteItems}
                          create={CreateWasteItem}
                          edit={EditWasteItem}
                          show={ShowWasteItem}
                          options={{ label: 'Waste Items' }}
                />
                <Resource name="vehicleTypes"
                          list={ListVehicleTypes}
                          create={CreateVehicleType}
                          edit={EditVehicleType}
                          show={ShowVehicleType}
                          options={{ label: 'Vehicle Types' }}
                />
            </Admin>
        )
    }
}
