import schema2component from "@/utils/schema2component";
import "./CustomRenderer";

const schema = {
    "type": "page",
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
                                            "actionType": "toast",
                                            "args": {
                                                "msg": "${event.data.value|json}"
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
                            "name": "tree2",
                            "multiple": true,
                            "heightAuto": true,
                            "joinValues": true,
                            "cascade": true,
                            "itemHeight": 40,
                            "source": "http://127.0.0.1:9999/sys/menu/list",
                            "onEvent": {
                                "change": {
                                    "actions": [
                                        {
                                            "actionType": "toast",
                                            "args": {
                                                "msg": "${event.data.value|json}"
                                            }
                                        }
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
