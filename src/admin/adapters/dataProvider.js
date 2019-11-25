import _ from 'lodash'
import { fetchUtils } from 'react-admin'
import { UrlPartsGenerator } from './requestUtils'
import SpringResponse from "./SpringResponse"


const apiUrl = '/api'

const httpClient = (url, options = {}) => {
    options.user = {
        authenticated: true,
        token: `Bearer ${window.googleAuth.currentUser.get().getAuthResponse().id_token}`
    };
    return fetchUtils.fetchJson(url, options);
}

const _getListOrManyOrManyReference = (url, resource) =>
    httpClient(url).then(({ json }) => SpringResponse.toReactAdminResourceListResponse(json, resource))


export default {
    getList: (resource, params) =>
        _getListOrManyOrManyReference(
            `${apiUrl}/${resource}/${UrlPartsGenerator.forList(params)}`,
            resource
        ),

    getOne: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`)
        .then(({ json }) => ({ data: json })),

    getMany: (resource, params) =>
        _getListOrManyOrManyReference(
            `${apiUrl}/${resource}/search/findAllById?ids=${_.join(params["ids"])}`,
            resource
        ),

    getManyReference: (resource, params) =>
        _getListOrManyOrManyReference(
            `${apiUrl}/${resource}/${UrlPartsGenerator.forManyReference(params)}`
        ),

    create: (resource, params) =>
        httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        })
        .then(({ json }) => ({
            data: { ...params.data, id: json.id },
        })),

    update: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        })
        .then(({ json }) => ({ data: json })),

    delete: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
        })
        .then(({ json }) => ({ data: json || { id: null } })),

    updateMany: (resource, params) =>
        Promise.all(
            params.ids.map(id =>
                httpClient(`${apiUrl}/${resource}/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify(params.data),
                })))
        .then(responses => ({ data: responses.map(({ json }) => json.id) })),

    deleteMany: (resource, params) =>
        Promise.all(
            params.ids.map(id =>
                httpClient(`${apiUrl}/${resource}/${id}`, {
                    method: 'DELETE',
                })))
        .then(responses => ({ data: responses.map( ({ json }) => json.id || { id: null } ) })),
}
