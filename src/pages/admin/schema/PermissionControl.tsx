import schema2component from "@/utils/schema2component";
import "./CustomRenderer";

const schema = {
    "type": "page",
    "body": {
        "type": "input-tree",
        "name": "tree",
        "label": "权限信息",
        "creatable": true,
        "removable": true,
        "editable": true,
        "multiple": false,
        "rootCreatable": false,
        "heightAuto":true,
        "itemHeight":40,
        "source": "http://localhost:9999/sys/menu/list",
        "addApi": "http://localhost:9999/sys/menu/add",
        "deleteApi": "http://127.0.0.1:9999/sys/menu/del?editId=${value}",
        "editApi": "http://127.0.0.1:9999/sys/menu/edit",
    }
}

export default schema2component(schema);
