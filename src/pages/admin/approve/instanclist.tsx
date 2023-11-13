import schema2component from "../../../utils/schema2component";


const schema = {
    "type": "page",
    "body": {
        "type": "crud",
        "name": "crud",
        "syncLocation": false,
        "api": "get:http://localhost:8080/v1/sys/instance/list",
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
                "name": "instanceId",
                "label": "实例编号",
                "copyable": true
            },
            {
                "name": "flowDetailId",
                "label": "业务名称"
            },
            {
                "name": "attribute",
                "label": "参与计算参数"
            },
            {
                "name": "approvalStatus",
                "label": "审批状态",
                "type": "mapping",
                "map": {
                    0: "<span >未参与审批</span>",
                    1: "<span >审批通过</span>",
                    2: "<span >审批驳回</span>",
                    3: "<span >审批中</span>",
                }
            },
            {
                "name": "status",
                "label": "工作流状态",
                "type": "status",
                "source": {
                    0: {
                        "label": "运行中",
                        "icon": "rolling"
                    },
                    1: {
                        "label": "执行完成",
                        "icon": "success"
                    }
                },
            },
            {
                "name": "updateAt",
                "label": "最后更新时间"
            },
            {
                "type": "operation",
                "label": "操作",
                "buttons": [
                    {
                        "label": "实例详情",
                        "type": "button",
                        "actionType": "ajax",
                        "level": "link",
                        "confirmText": "确认要禁用？禁用后无法再次发起该实例",
                        "api": "post:http://localhost:8080/v1/sys/lock/flowDetail/${id}"
                    }
                ]
            }
        ]
    }
};

export default schema2component(schema);