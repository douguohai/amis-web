import schema2component from "@/utils/schema2component";
import "./CustomRenderer";

const schema = {
    "type": "page",
    "id": "role_menu_page",
    "data": {
        roleId: 0
    },
    "body": [
        {
            "type": "grid",
            "columns": [
                {
                    "md": 4,
                    "body": [
                        {
                            "type": "input-tree",
                            "name": "tree",
                            "label": "角色管理",
                            "creatable": true,
                            "removable": true,
                            "editable": true,
                            "multiple": false,
                            "rootCreatable": true,
                            "heightAuto": true,
                            "showRadio": true,
                            "itemHeight": 40,
                            "source": "http://localhost:9999/sys/role/list",
                            "addApi": "http://localhost:9999/sys/role/add",
                            "deleteApi": "http://127.0.0.1:9999/sys/role/del?editId=${value}",
                            "editApi": "http://127.0.0.1:9999/sys/role/edit",
                            "onEvent": {
                                "change": {
                                    "actions": [
                                        {
                                            "componentId": "role_menu_page",
                                            "actionType": "reload",
                                            "data": {
                                                "roleId": "${event.data.value}"
                                            }
                                        }
                                    ]
                                }
                            }
                        },
                    ]
                },
                {
                    "md": 8,
                    "body": [
                        {
                            "type": "input-tree",
                            "name": "menu-tree",
                            "label": "菜单管理",
                            "multiple": true,
                            "heightAuto": true,
                            "joinValues": false,
                            "extractValue": true,
                            "cascade": true,
                            "itemHeight": 40,
                            "source": "http://127.0.0.1:9999/sys/role/menu/${roleId}",
                            "onEvent": {
                                "change": {
                                    "actions": [
                                        {
                                            "actionType": "ajax",
                                            "args": {
                                                "api": {
                                                    "url": "http://127.0.0.1:9999/sys/role/${roleId}/menu",
                                                    "method": "put",
                                                    "replaceData": true,
                                                    "data": {
                                                        "menus": "${event.data.value}"
                                                    }
                                                },
                                                "options": {
                                                    "silent": true
                                                },
                                            },
                                        },
                                    ]
                                }
                            }
                        }
                    ]
                },
            ]
        },
    ]
}

export default schema2component(schema);
