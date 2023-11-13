import schema2component from "../../../utils/schema2component";


const schema = {
    "type": "page",
    "body": [
        {
            "label": "新增",
            "type": "button",
            "actionType": "dialog",
            "level": "primary",
            "className": "m-b-sm",
            "dialog": {
                "title": "新增表单",
                "body": {
                    "type": "form",
                    "api": "post:http://localhost:8080/v1/sys/app/add",
                    "body": [
                        {
                            "type": "input-text",
                            "name": "app",
                            "label": "应用名称",
                            "required": true
                        }
                    ]
                }
            }
        }, {
            "type": "crud",
            "syncLocation": false,
            "api": "http://localhost:8080/v1/sys/app/list",
            "columns": [
                {
                    "name": "id",
                    "label": "编号"
                },
                {
                    "name": "app",
                    "label": "应用名称"
                },
                {
                    "name": "key",
                    "label": "密钥"
                },
                {
                    "name": "noticeUrl",
                    "label": "系统回调地址"
                },
                {
                    "name": "rolesUrl",
                    "label": "角色核验接口"

                },
                {
                    "name": "usersUrl",
                    "label": "身份信息获取"
                },
                {
                    "name": "status",
                    "label": "状态",
                    "type": "mapping",
                    "map": {
                        0: "<span class='label label-success'>启用</span>",
                        1: "<span class='label label-danger'>关闭</span>",
                    }
                },
                {
                    "name": "updateAt",
                    "label": "修改时间"
                },
                {
                    "type": "operation",
                    "label": "操作",
                    "buttons": [
                        {
                            "label": "填充核验",
                            "type": "button",
                            "level": "link",
                            "actionType": "dialog",
                            "dialog": {
                                "title": "填充核验",
                                "body": {
                                    "type": "form",
                                    "api": "post:http://localhost:8080/v1/sys/app/update",
                                    "body": [
                                        {
                                            "type": "input-text",
                                            "name": "id",
                                            "label": "编号",
                                            "hidden": true
                                        },
                                        {
                                            "type": "input-text",
                                            "name": "app",
                                            "label": "应用名称",
                                            "disabled": true
                                        },
                                        {
                                            "type": "input-url",
                                            "name": "noticeUrl",
                                            "label": "系统回调地址",
                                            "required": true
                                        },
                                        {
                                            "type": "input-url",
                                            "name": "rolesUrl",
                                            "label": "角色核验接口",
                                            "required": true
                                        },
                                        {
                                            "type": "input-url",
                                            "name": "usersUrl",
                                            "label": "身份信息获取",
                                            "required": true
                                        },
                                    ]
                                }
                            }
                        },
                        {
                            "label": "状态变更",
                            "type": "button",
                            "actionType": "ajax",
                            "level": "link",
                            "confirmText": "确认要禁用？禁用后无法再次发起相关应用实例",
                            "api": "post:http://localhost:8080/v1/sys/lock/app/${id}"
                        },
                    ]
                }
            ]
        }]


}

export default schema2component(schema);