import schema2component from "../../../utils/schema2component";
import "./components/approvalShow"
import "./components/timeline"

const schema = {
    "type": "page",
    "body": {
        "type": "crud",
        "name": "crud",
        "syncLocation": false,
        "api": "get:http://localhost:8080/v1/sys/instance/list",
        "interval": 30000,
        "filter": {
            "debug": false,
            "title": "条件搜索",
            "body": [
                {
                    "type": "group",
                    "body": [
                        {
                            "label": "应用名称",
                            "type": "select",
                            "name": "appId",
                            "source": "http://localhost:8080/v1/sys/option/select/1", // get 请求
                            "clearable": true,
                            "size": "sm"
                        },
                        {
                            "label": "业务名称",
                            "type": "select",
                            "name": "flowId",
                            "size": "sm",
                            "source": "http://localhost:8080/v1/sys/option/select/2?appId=${appId}",
                            "clearable": true,
                        },
                        {
                            "type": "input-text",
                            "name": "instanceId",
                            "label": "实例编号",
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
                "name": "flowName",
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
                    0: "<span >未执行审批</span>",
                    1: "<span >审批通过</span>",
                    2: "<span >审批驳回</span>",
                    3: "<span >审批中</span>",
                }
            },
            {
                "label": "工作流状态",
                "type": "container",
                "body": [
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
                            },
                            2: {
                                "label": "异常截断",
                                "icon": "fail"
                            }
                        },
                    },
                    {
                        "name": "reason",
                        "type": "remark",
                        "content": "${reason}",
                        "visibleOn": "${status == 2}",
                        "icon": "fa fa-exclamation-triangle",
                    }
                ]

            },

            {
                "name": "updateTime",
                "label": "最后更新时间"
            },
            {
                "type": "operation",
                "label": "操作",
                "buttons": [
                    {
                        "label": "实例详情",
                        "type": "button",
                        "level": "link",
                        "actionType": "drawer",
                        "drawer": {
                            "size": "lg",
                            "title": "流程详情",
                            "resizable": true,
                            "closeOnOutside": true,
                            "width": '50%',
                            "actions": [],
                            "body": {
                                "type": "page",
                                "body": [
                                    {
                                        "type": "approveShow",
                                    },
                                    {
                                        "type": "antd-timeline",
                                        "marginTop": 40,
                                        "instanceId": "${id}",
                                    },
                                ]
                            }
                        }
                    }
                ]
            }
        ]
    }
};

export default schema2component(schema);