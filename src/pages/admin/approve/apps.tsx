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
                    "api": "post:/amis/api/mock2/sample",
                    "body": [
                        {
                            "type": "input-text",
                            "name": "app",
                            "label": "应用名称"
                        },
                        {
                            "type": "input-text",
                            "name": "key",
                            "label": "密钥"
                        },
                        {
                            "type": "input-text",
                            "name": "noticeUrl",
                            "label": "回调地址"
                        },
                        {
                            "type": "input-text",
                            "name": "rolesUrl",
                            "label": "角色核验"
                        },
                        {
                            "type": "input-text",
                            "name": "usersUrl",
                            "label": "身份信息"
                        },
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
                    "label": "回调地址"
                },
                {
                    "name": "rolesUrl",
                    "label": "角色核验"
                },
                {
                    "name": "usersUrl",
                    "label": "身份信息"
                },
                {
                    "name": "del",
                    "label": "状态"
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
                            "label": "详情",
                            "type": "button",
                            "level": "link",
                            "actionType": "dialog",
                            "dialog": {
                                "title": "查看详情",
                                "body": {
                                    "type": "form",
                                    "body": [
                                        {
                                            "type": "input-text",
                                            "name": "app",
                                            "label": "应用名称"
                                        },
                                        {
                                            "type": "input-text",
                                            "name": "key",
                                            "label": "密钥"
                                        },
                                        {
                                            "type": "input-text",
                                            "name": "noticeUrl",
                                            "label": "回调地址"
                                        },
                                        {
                                            "type": "input-text",
                                            "name": "rolesUrl",
                                            "label": "角色核验"
                                        },
                                        {
                                            "type": "input-text",
                                            "name": "usersUrl",
                                            "label": "身份信息"
                                        },
                                    ]
                                }
                            }
                        },
                        {
                            "label": "锁定",
                            "type": "button",
                            "actionType": "ajax",
                            "level": "link",
                            "confirmText": "确认要删除？",
                            "api": "delete:/amis/api/mock2/sample/${id}"
                        }
                    ]
                }
            ]
        }]


}

export default schema2component(schema);