import schema2component from "@/utils/schema2component";
import "./CustomRenderer";

const schema = {
    "type": "page",
    "body": {
        "type": "input-tree",
        "name": "tree",
        "label": "部门信息",
        "creatable": true,
        "removable": true,
        "editable": true,
        "multiple": false,
        "rootCreatable": false,
        "heightAuto":true,
        "itemHeight":40,
        "source": "http://127.0.0.1:9999/sys/dept/list",
        "addApi": "http://127.0.0.1:9999/sys/dept/add",
        "deleteApi": "http://127.0.0.1:9999/sys/dept/del?editId=${value}",
        "editApi": "http://127.0.0.1:9999/sys/dept/edit",
    }
}

export default schema2component(schema);
