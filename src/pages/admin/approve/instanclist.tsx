import schema2component from "../../../utils/schema2component";


const schema = {
    "type": "page",
    "body": {
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
                    "label": "进入介绍页",
                    "type": "button",
                    "level": "info",
                    "actionType": "link",
                    "link": "../flow/editor"
                },
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
                "label": "状态"
            },
            {
                "name": "updateAt",
                "label": "更新时间"
            }
        ]
    }
};

export default schema2component(schema);