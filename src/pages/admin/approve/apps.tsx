import schema2component from "../../../utils/schema2component";


const schema = {
    "type": "page",
    "body": {
        "type": "crud",
        "name": "crud",
        "syncLocation": false,
        "api": "/amis/api/mock2/crud/table4",
        "filter": {
            "debug": true,
            "title": "条件搜索",
            "body": [
                {
                    "type": "group",
                    "body": [
                        {
                            "type": "input-text",
                            "name": "keywords",
                            "label": "关键字",
                            "clearable": true,
                            "placeholder": "通过关键字搜索",
                            "size": "sm"
                        },
                        {
                            "type": "input-text",
                            "name": "engine",
                            "label": "Engine",
                            "clearable": true,
                            "size": "sm"
                        },
                        {
                            "type": "input-text",
                            "name": "platform",
                            "label": "Platform",
                            "clearable": true,
                            "size": "sm"
                        }
                    ]
                }
            ],
            "actions": [
                {
                    "type": "button",
                    "actionType": "drawer",
                    "icon": "fa fa-plus",
                    "label": "创建记录",
                    "target": "crud",
                    "closeOnOutside": true,
                    "drawer": {
                        "title": "创建记录",
                        "body": {
                            "type": "form",
                            "api": "post:/amis/api/mock2/sample",
                            "body": [
                                {
                                    "type": "input-text",
                                    "name": "engine",
                                    "label": "Engine"
                                },
                                {
                                    "type": "input-text",
                                    "name": "browser",
                                    "label": "Browser"
                                }
                            ]
                        }
                    }
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
                "label": "ID"
            },
            {
                "name": "engine",
                "label": "Rendering engine"
            },
            {
                "name": "browser",
                "label": "Browser"
            },
            {
                "name": "platform",
                "label": "Platform(s)",
                "canAccessSuperData": false
            },
            {
                "name": "version",
                "label": "Engine version"
            },
            {
                "name": "grade",
                "label": "CSS grade"
            }
        ]
    }
}

export default schema2component(schema);