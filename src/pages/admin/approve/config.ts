// 主题
export const themeApprove = {
  rect: { // 矩形样式
    radius: 8,
    stroke: '#3CB371'
  },
  circle: {
    r: 25,
    stroke: '#FF6347'
  },
  polygon: {
    stroke: '#6495ED',
  },
  polyline: {
    strokeWidth: 1,
  },
  edgeText: {
    background: {
      fill: 'white',
    },
  },
}

export const data = {
  "nodes": [{
    "id": "9ca20bef-31d9-44d0-99b6-66c524b60c00",
    "type": "start",
    "x": 60,
    "y": 150,
    "properties": {
      "next": "",
      "nextType": "",
      "type": "start"
    },
    "text": {
      "x": 60,
      "y": 150,
      "value": "开始"
    }
  }, {
    "id": "64369d6e-d0f0-4253-85b2-c4d760138c7a",
    "type": "finsh",
    "x": 1390,
    "y": 170,
    "properties": {
      "type": "finsh"
    },
    "text": {
      "x": 1390,
      "y": 170,
      "value": "结束"
    }
  }, {
    "id": "ef2684c4-dd74-4b35-a993-147dbce304a5",
    "type": "taskNode",
    "x": 240,
    "y": 150,
    "properties": {
      "red": true,
      "type": "taskNode",
      "action": "apply",
      "webhook": ""
    },
    "text": {
      "x": 240,
      "y": 150,
      "value": "apply"
    }
  }, {
    "id": "573b0efc-1756-4fad-853e-1c3796d8969b",
    "type": "conditionGateWay",
    "x": 410,
    "y": 150,
    "properties": {
      "type": "conditionGateWay"
    },
    "text": {
      "x": 410,
      "y": 150,
      "value": "条件网关"
    }
  }, {
    "id": "8645ba1d-16f1-4ae2-99a6-6149ba38627b",
    "type": "approver",
    "x": 650,
    "y": 70,
    "properties": {
      "labelColor": "#000000",
      "type": "approval",
      "roleApi": "/api/roles"
    },
    "text": {
      "x": 650,
      "y": 70,
      "value": "审批节点"
    }
  }, {
    "id": "064ee8ca-2481-4263-b31d-e662e559f50d",
    "type": "taskNode",
    "x": 910,
    "y": 10,
    "properties": {
      "red": true,
      "type": "taskNode",
      "action": "apply",
      "webhook": ""
    },
    "text": {
      "x": 910,
      "y": 10,
      "value": "apply"
    }
  }, {
    "id": "9d1d389f-af47-46be-ad16-95074e57fc20",
    "type": "taskNode",
    "x": 940,
    "y": 170,
    "properties": {
      "red": true,
      "type": "taskNode",
      "action": "apply",
      "webhook": ""
    },
    "text": {
      "x": 940,
      "y": 170,
      "value": "apply"
    }
  }, {
    "id": "0b041ff7-1b54-4177-a8fa-1f0f8e1b9761",
    "type": "taskNode",
    "x": 1210,
    "y": 170,
    "properties": {
      "red": true,
      "type": "taskNode",
      "action": "apply",
      "webhook": ""
    },
    "text": {
      "x": 1210,
      "y": 170,
      "value": "apply"
    }
  }, {
    "id": "29cc5967-9bde-4280-956d-9940a4e3ca20",
    "type": "taskNode",
    "x": 700,
    "y": 310,
    "properties": {
      "red": true,
      "type": "taskNode",
      "action": "webhook",
      "webhook": "https://www.baidu.com"
    },
    "text": {
      "x": 700,
      "y": 310,
      "value": "webhook"
    }
  }],
  "edges": [{
    "id": "3b90dba0-f57f-4182-aaff-07204df0ae6c",
    "type": "polyline",
    "sourceNodeId": "9ca20bef-31d9-44d0-99b6-66c524b60c00",
    "targetNodeId": "ef2684c4-dd74-4b35-a993-147dbce304a5",
    "startPoint": {
      "x": 110,
      "y": 150
    },
    "endPoint": {
      "x": 190,
      "y": 150
    },
    "properties": {},
    "pointsList": [{
      "x": 110,
      "y": 150
    }, {
      "x": 190,
      "y": 150
    }]
  }, {
    "id": "6c5328db-d597-4828-bf74-20cd678d1de0",
    "type": "polyline",
    "sourceNodeId": "ef2684c4-dd74-4b35-a993-147dbce304a5",
    "targetNodeId": "573b0efc-1756-4fad-853e-1c3796d8969b",
    "startPoint": {
      "x": 290,
      "y": 150
    },
    "endPoint": {
      "x": 375,
      "y": 150
    },
    "properties": {},
    "pointsList": [{
      "x": 290,
      "y": 150
    }, {
      "x": 375,
      "y": 150
    }]
  }, {
    "id": "97f5548a-15d2-4d06-99de-7e4c46ff08fd",
    "type": "polyline",
    "sourceNodeId": "573b0efc-1756-4fad-853e-1c3796d8969b",
    "targetNodeId": "8645ba1d-16f1-4ae2-99a6-6149ba38627b",
    "startPoint": {
      "x": 418,
      "y": 123
    },
    "endPoint": {
      "x": 600,
      "y": 68
    },
    "properties": {
      "type": "custom",
      "nextType": "approval",
      "nextId": "8645ba1d-16f1-4ae2-99a6-6149ba38627b",
      "preId": "573b0efc-1756-4fad-853e-1c3796d8969b",
      "lineDesc": "人员年满18周岁",
      "action": "or",
      "inputs": [{
        "inputType": "float64",
        "action": "eq",
        "inputFlag": "age",
        "inputValue": "18"
      }, {
        "inputType": "float64",
        "action": "gt",
        "inputFlag": "age",
        "inputValue": "18"
      }]
    },
    "text": {
      "x": 509,
      "y": 68,
      "value": "人员年满18周岁"
    },
    "pointsList": [{
      "x": 418,
      "y": 123
    }, {
      "x": 418,
      "y": 68
    }, {
      "x": 600,
      "y": 68
    }]
  }, {
    "id": "a0758b99-a600-4281-ac01-35a44db7b464",
    "type": "polyline",
    "sourceNodeId": "8645ba1d-16f1-4ae2-99a6-6149ba38627b",
    "targetNodeId": "064ee8ca-2481-4263-b31d-e662e559f50d",
    "startPoint": {
      "x": 650,
      "y": 30
    },
    "endPoint": {
      "x": 860,
      "y": 10
    },
    "properties": {
      "type": "system",
      "nextType": "taskNode",
      "nextId": "064ee8ca-2481-4263-b31d-e662e559f50d",
      "preId": "8645ba1d-16f1-4ae2-99a6-6149ba38627b",
      "lineDesc": "审批通过",
      "action": "and",
      "inputs": [{
        "inputType": "bool",
        "action": "eq",
        "inputFlag": "accept",
        "inputValue": "true"
      }]
    },
    "text": {
      "x": 740,
      "y": 10,
      "value": "审批通过"
    },
    "pointsList": [{
      "x": 650,
      "y": 30
    }, {
      "x": 650,
      "y": 10
    }, {
      "x": 860,
      "y": 10
    }]
  }, {
    "id": "7546eeb7-cd70-439a-a7ee-21f7d49c5013",
    "type": "polyline",
    "sourceNodeId": "8645ba1d-16f1-4ae2-99a6-6149ba38627b",
    "targetNodeId": "9d1d389f-af47-46be-ad16-95074e57fc20",
    "startPoint": {
      "x": 650,
      "y": 110
    },
    "endPoint": {
      "x": 890,
      "y": 170
    },
    "properties": {
      "type": "system",
      "nextType": "taskNode",
      "nextId": "9d1d389f-af47-46be-ad16-95074e57fc20",
      "preId": "8645ba1d-16f1-4ae2-99a6-6149ba38627b",
      "lineDesc": "审批拒绝",
      "action": "and",
      "inputs": [{
        "inputType": "bool",
        "action": "eq",
        "inputFlag": "accept",
        "inputValue": "false"
      }]
    },
    "text": {
      "x": 770,
      "y": 170,
      "value": "审批拒绝"
    },
    "pointsList": [{
      "x": 650,
      "y": 110
    }, {
      "x": 650,
      "y": 170
    }, {
      "x": 890,
      "y": 170
    }]
  }, {
    "id": "a7229d2a-a6d2-4067-a782-c92769b2927d",
    "type": "polyline",
    "sourceNodeId": "064ee8ca-2481-4263-b31d-e662e559f50d",
    "targetNodeId": "0b041ff7-1b54-4177-a8fa-1f0f8e1b9761",
    "startPoint": {
      "x": 960,
      "y": 10
    },
    "endPoint": {
      "x": 1210,
      "y": 130
    },
    "properties": {},
    "pointsList": [{
      "x": 960,
      "y": 10
    }, {
      "x": 1210,
      "y": 10
    }, {
      "x": 1210,
      "y": 130
    }]
  }, {
    "id": "28713793-4150-4cbe-ba41-35542113c7e0",
    "type": "polyline",
    "sourceNodeId": "0b041ff7-1b54-4177-a8fa-1f0f8e1b9761",
    "targetNodeId": "64369d6e-d0f0-4253-85b2-c4d760138c7a",
    "startPoint": {
      "x": 1260,
      "y": 170
    },
    "endPoint": {
      "x": 1340,
      "y": 170
    },
    "properties": {},
    "pointsList": [{
      "x": 1260,
      "y": 170
    }, {
      "x": 1340,
      "y": 170
    }]
  }, {
    "id": "3c38bbfb-2ff8-4f87-90ef-441e9a80cd93",
    "type": "polyline",
    "sourceNodeId": "573b0efc-1756-4fad-853e-1c3796d8969b",
    "targetNodeId": "29cc5967-9bde-4280-956d-9940a4e3ca20",
    "startPoint": {
      "x": 410,
      "y": 185
    },
    "endPoint": {
      "x": 650,
      "y": 310
    },
    "properties": {
      "type": "custom",
      "nextType": "taskNode",
      "nextId": "29cc5967-9bde-4280-956d-9940a4e3ca20",
      "preId": "573b0efc-1756-4fad-853e-1c3796d8969b",
      "lineDesc": "未满18周岁",
      "action": "or",
      "inputs": [{
        "inputType": "float64",
        "action": "lt",
        "inputFlag": "age",
        "inputValue": "18"
      }]
    },
    "text": {
      "x": 410,
      "y": 310,
      "value": "未满18周岁"
    },
    "pointsList": [{
      "x": 410,
      "y": 185
    }, {
      "x": 410,
      "y": 310
    }, {
      "x": 650,
      "y": 310
    }]
  }, {
    "id": "46ac67e1-ce9f-435f-ba6a-77dab19c1233",
    "type": "polyline",
    "sourceNodeId": "29cc5967-9bde-4280-956d-9940a4e3ca20",
    "targetNodeId": "0b041ff7-1b54-4177-a8fa-1f0f8e1b9761",
    "startPoint": {
      "x": 750,
      "y": 310
    },
    "endPoint": {
      "x": 1210,
      "y": 210
    },
    "properties": {},
    "pointsList": [{
      "x": 750,
      "y": 310
    }, {
      "x": 1210,
      "y": 310
    }, {
      "x": 1210,
      "y": 210
    }]
  }, {
    "id": "50adab15-26df-4d7b-ac69-2f9bf3fc38a3",
    "type": "polyline",
    "sourceNodeId": "9d1d389f-af47-46be-ad16-95074e57fc20",
    "targetNodeId": "0b041ff7-1b54-4177-a8fa-1f0f8e1b9761",
    "startPoint": {
      "x": 990,
      "y": 170
    },
    "endPoint": {
      "x": 1160,
      "y": 170
    },
    "properties": {},
    "pointsList": [{
      "x": 990,
      "y": 170
    }, {
      "x": 1160,
      "y": 170
    }]
  }]
}

