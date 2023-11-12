import schema2component from "../../../utils/schema2component";


const schema = {
    "type": "page",
    "body": [{
        "label": "新增",
        "type": "button",
        "actionType": "dialog",
        "level": "primary",
        "className": "m-b-sm",
        "dialog": {
            "title": "新增表单",
            "body": {
                "type": "form",
                "api": "",
                "body": [
                    {
                        "label": "应用名称",
                        "type": "select",
                        "name": "app",
                        "source": "http://localhost:8080/v1/sys/option/select/1", // get 请求

                    },
                    {
                        "type": "input-text",
                        "name": "name",
                        "label": "业务名称"
                    },
                    {
                        "name": "status",
                        "type": "radios",
                        "label": "状态",
                        "value": "0",
                        "options": [
                            {
                                "label": "启用",
                                "value": 0
                            },
                            {
                                "label": "关闭",
                                "value": 1
                            }
                        ]
                    }
                ]
            }
        }
    }, {
        "type": "crud",
        "name": "crud",
        "syncLocation": false,
        "api": "http://localhost:8080/v1/sys/flow/list",
        "filter": {
            "debug": true,
            "title": "条件搜索",
            "body": [
                {
                    "type": "group",
                    "body": [
                        {
                            "type": "input-text",
                            "name": "app",
                            "label": "应用名称",
                            "clearable": true,
                            "placeholder": "通应用名称搜索",
                            "size": "sm"
                        },
                        {
                            "type": "input-text",
                            "name": "name",
                            "label": "业务名称",
                            "clearable": true,
                            "size": "sm"
                        }
                    ]
                }
            ],
            "actions": [
                {
                    "type": "reset",
                    "label": "重置"
                },
                {
                    "type": "submit",
                    "level": "primary",
                    "label": "查询"
                }
            ]
        },
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
                "name": "name",
                "label": "业务名称"
            },
            {
                "name": "status",
                "label": "状态",
                "type": "status",
                "source": {
                    0: {
                        "label": "启用",
                        "icon": "success"
                    },
                    1: {
                        "label": "关闭",
                        "icon": "fail"
                    }
                },
            },
            {
                "name": "updateAt",
                "label": "更新时间"
            },
            {
                "type": "operation",
                "label": "操作",
                "buttons": [
                    {
                        "label": "编辑",
                        "type": "button",
                        "level": "link",
                        "actionType": "dialog",
                        "dialog": {
                            "title": "编辑详情",
                            "body": {
                                "type": "form",
                                "api": "post:http://localhost:8080/v1/sys/flow/update/${id}",
                                "body": [
                                    {
                                        "type": "input-text",
                                        "name": "app",
                                        "label": "应用名称",
                                        "disabled": true
                                    },
                                    {
                                        "type": "input-text",
                                        "name": "name",
                                        "label": "业务名称"
                                    },
                                    {
                                        "name": "status",
                                        "type": "radios",
                                        "label": "状态",
                                        "options": [
                                            {
                                                "label": "启用",
                                                "value": 0
                                            },
                                            {
                                                "label": "关闭",
                                                "value": 1
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                    },
                    {
                        "label": "更新流程",
                        "type": "button",
                        "level": "link",
                        "actionType": "drawer",
                        "drawer": {
                            "size": "lg",
                            "title": "流程详情",
                            "resizable": true,
                            "closeOnOutside": true,
                            "actions": [],
                            "body": {
                                "type": "page",
                                "body": [{
                                    "label": "新增版本",
                                    "type": "button",
                                    "actionType": "dialog",
                                    "level": "primary",
                                    "className": "m-b-sm",
                                    "dialog": {
                                        "title": "更新流程",
                                        "body": {
                                            "type": "form",
                                            "api": "post:http://localhost:8080/v1/flowDetail/add",
                                            "body": [
                                                {
                                                    "type": "input-text",
                                                    "name": "flowId",
                                                    "label": "详情",
                                                    "hidden": true,
                                                    "value": "${id}"
                                                },
                                                {
                                                    "type": "input-file",
                                                    "name": "detail",
                                                    "label": "详情",
                                                    "accept": ".json",
                                                    "asBase64": true,
                                                    "downloadUrl": false
                                                }
                                            ]
                                        }
                                    }
                                },
                                {
                                    "type": "crud",
                                    "name": "flowDetails",
                                    "syncLocation": false,
                                    "api": "http://localhost:8080/v1/sys/flow/details/${id}",
                                    "columns": [
                                        {
                                            "name": "id",
                                            "label": "编号"
                                        },
                                        {
                                            "name": "version",
                                            "label": "版本号"
                                        },
                                        {
                                            "name": "status",
                                            "label": "状态",
                                            "type": "status",
                                            "source": {
                                                0: {
                                                    "label": "启用",
                                                    "icon": "success"
                                                },
                                                1: {
                                                    "label": "关闭",
                                                    "icon": "fail"
                                                }
                                            },
                                        },
                                        {
                                            "name": "updateAt",
                                            "label": "更新时间"
                                        },
                                        {
                                            "type": "operation",
                                            "label": "操作",
                                            "buttons": [
                                                {
                                                    "label": "状态变更",
                                                    "type": "button",
                                                    "actionType": "ajax",
                                                    "level": "link",
                                                    "confirmText": "确认要禁用？禁用后无法再次发起该实例",
                                                    "api": "post:http://localhost:8080/v1/sys/lock/flowDetail/${id}"
                                                },
                                                {
                                                    "label": "流程预览",
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
                        }
                    }
                ]
            }
        ]
    }]

};

export default schema2component(schema);