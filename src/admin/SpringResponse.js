import _ from 'lodash';

class SpringResponse {
    static toReactAdminResourceListResponse(json, resource) {
        if (json["content"]) {
            return {
                data: json['content'],
                total: json["totalElements"]
            };
        } else if (json['_embedded']) {
            let resources = json['_embedded'][resource];
            let page = json['page'];
            let totalElements = page ? page["totalElements"] : resources.length;
            return {
                data: resources,
                total: totalElements
            };
        } else if (_.get(json, ['page', 'totalElements']) === 0) {
            return {
                data: [],
                total: 0
            }
        } else {
            return {
                data: json,
                total: json.length
            };
        }
    }
}

export default SpringResponse;