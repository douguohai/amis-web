
export const code = {
  START: "start",
  ConditionGateway: "conditionGateway",
  ParallelGateway: "parallelGateway",
  ApprovalNode: "approval",
  Condition: "condition",
  EndNode: "finish",
  TaskNode: "taskNode",
  Polyline: "polyline",

  TaskApply: "apply",
  TaskWebhook: "webhook",
  TaskFinished: "finish",

  ParallelGateWayStart: "parallelGateway-start",
  ParallelGateWayEnd: "parallelGateway-end",

  VarFloat64: "float64",
  VarBool: "bool",
  VarString: "string",
  VarStringArray: "[]string",

  GT: "gt",
  NE: "ne",
  EQ: "eq",
  LT: "lt",
  IN: "in",
  NOTIN: "notIn",

  OR: "or",
  AND: "and",
}





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
  "nodes": [
    {
      "id": "6ba9c59c-2b33-42b6-a91c-1243a9240178",
      "type": "start",
      "x": -130,
      "y": 250,
      "properties": {
        "nextId": "47b255a7-1334-4a27-81f4-943640477d54",
        "nextType": "taskNode",
        "type": "start",
        "next": ""
      },
      "text": {
        "x": -130,
        "y": 250,
        "value": "开始"
      }
    },
    {
      "id": "47b255a7-1334-4a27-81f4-943640477d54",
      "type": "taskNode",
      "x": 140,
      "y": 250,
      "properties": {
        "red": true,
        "type": "taskNode",
        "action": "apply",
        "webhook": "https://www.baidu.com",
        "preId": "6ba9c59c-2b33-42b6-a91c-1243a9240178",
        "nextId": "193e2ebe-306e-43b8-8655-6804e9db6011",
        "nextType": "conditionGateway"
      },
      "text": {
        "x": 140,
        "y": 250,
        "value": "apply"
      }
    },
    {
      "id": "193e2ebe-306e-43b8-8655-6804e9db6011",
      "type": "conditionGateway",
      "x": 290,
      "y": 250,
      "properties": {
        "type": "conditionGateway",
        "preId": "47b255a7-1334-4a27-81f4-943640477d54",
        "conditions": [
          {
            "type": "custom",
            "nextType": "taskNode",
            "nextId": "265e697f-3381-4e89-9a6f-76fbcad7e9ce",
            "preId": "193e2ebe-306e-43b8-8655-6804e9db6011",
            "action": "and",
            "inputs": [
              {
                "inputType": "bool",
                "action": "eq",
                "inputFlag": "accept",
                "inputValue": "true"
              }
            ]
          },
          {
            "type": "custom",
            "nextType": "parallelGateWay",
            "nextId": "7238f0b4-49f7-442f-94de-9b25dfbd729e",
            "preId": "193e2ebe-306e-43b8-8655-6804e9db6011",
            "action": "and",
            "inputs": [
              {
                "inputType": "bool",
                "action": "eq",
                "inputFlag": "accept",
                "inputValue": "false"
              }
            ]
          }
        ]
      },
      "text": {
        "x": 290,
        "y": 250,
        "value": "条件网关"
      }
    },
    {
      "id": "265e697f-3381-4e89-9a6f-76fbcad7e9ce",
      "type": "taskNode",
      "x": 550,
      "y": 170,
      "properties": {
        "red": true,
        "type": "taskNode",
        "action": "webhook",
        "webhook": "https://www.baidu.com",
        "preId": "193e2ebe-306e-43b8-8655-6804e9db6011",
        "nextId": "79eea628-a2bc-4215-b3cb-4039d89e45ce",
        "nextType": "approval"
      },
      "text": {
        "x": 550,
        "y": 170,
        "value": "webhook"
      }
    },
    {
      "id": "7238f0b4-49f7-442f-94de-9b25dfbd729e",
      "type": "parallelGateway",
      "x": 540,
      "y": 350,
      "properties": {
        "type": "parallelGateway",
        "action": "parallelGateway-start",
        "friend": "50d75a7a-2f63-481b-89f6-f018ad0ad86c",
        "preId": "193e2ebe-306e-43b8-8655-6804e9db6011"
      },
      "text": {
        "x": 540,
        "y": 350,
        "value": "并行开始"
      }
    },
    {
      "id": "50d75a7a-2f63-481b-89f6-f018ad0ad86c",
      "type": "parallelGateway",
      "x": 960,
      "y": 340,
      "properties": {
        "type": "parallelGateway",
        "action": "parallelGateway-end",
        "friend": "7238f0b4-49f7-442f-94de-9b25dfbd729e",
        "nextId": "16bc45d3-523e-4720-9df1-544618f74a98",
        "nextType": "taskNode"
      },
      "text": {
        "x": 960,
        "y": 340,
        "value": "并行结束"
      }
    },
    {
      "id": "78031669-b12c-4770-81d8-5b8b19380995",
      "type": "taskNode",
      "x": 750,
      "y": 300,
      "properties": {
        "red": true,
        "type": "taskNode",
        "action": "webhook",
        "webhook": "https://www.baidu.com",
        "preId": "7238f0b4-49f7-442f-94de-9b25dfbd729e",
        "nextId": "50d75a7a-2f63-481b-89f6-f018ad0ad86c",
        "nextType": "parallelGateway"
      },
      "text": {
        "x": 750,
        "y": 300,
        "value": "webhook"
      }
    },
    {
      "id": "3ac5b29d-2b64-49cf-b933-e2f83aee8dd5",
      "type": "taskNode",
      "x": 750,
      "y": 450,
      "properties": {
        "red": true,
        "type": "taskNode",
        "action": "webhook",
        "webhook": "https://www.baidu.com",
        "preId": "7238f0b4-49f7-442f-94de-9b25dfbd729e",
        "nextId": "50d75a7a-2f63-481b-89f6-f018ad0ad86c",
        "nextType": "parallelGateway"
      },
      "text": {
        "x": 750,
        "y": 450,
        "value": "webhook"
      }
    },
    {
      "id": "16bc45d3-523e-4720-9df1-544618f74a98",
      "type": "taskNode",
      "x": 1390,
      "y": 250,
      "properties": {
        "red": true,
        "type": "taskNode",
        "action": "finish",
        "webhook": "https://www.baidu.com",
        "preId": "cac1933c-da50-4a67-a852-981bfe517845",
        "nextId": "93321011-3b72-456e-81e6-c20aa9f087cc",
        "nextType": "finish"
      },
      "text": {
        "x": 1390,
        "y": 250,
        "value": "finish"
      }
    },
    {
      "id": "79eea628-a2bc-4215-b3cb-4039d89e45ce",
      "type": "approval",
      "x": 770,
      "y": 170,
      "properties": {
        "labelColor": "#000000",
        "type": "approval",
        "roleApi": "/api/roles",
        "preId": "265e697f-3381-4e89-9a6f-76fbcad7e9ce",
        "approveType": "t1Leader",
        "conditions": [
          {
            "type": "system",
            "nextType": "approval",
            "nextId": "cac1933c-da50-4a67-a852-981bfe517845",
            "preId": "79eea628-a2bc-4215-b3cb-4039d89e45ce",
            "action": "and",
            "inputs": [
              {
                "inputType": "bool",
                "action": "eq",
                "inputFlag": "accept",
                "inputValue": "true"
              }
            ]
          },
          {
            "type": "system",
            "nextType": "taskNode",
            "nextId": "16bc45d3-523e-4720-9df1-544618f74a98",
            "preId": "79eea628-a2bc-4215-b3cb-4039d89e45ce",
            "action": "and",
            "inputs": [
              {
                "inputType": "bool",
                "action": "eq",
                "inputFlag": "accept",
                "inputValue": "false"
              }
            ]
          }
        ]
      },
      "text": {
        "x": 770,
        "y": 170,
        "value": "审批节点"
      }
    },
    {
      "id": "cac1933c-da50-4a67-a852-981bfe517845",
      "type": "approval",
      "x": 970,
      "y": 170,
      "properties": {
        "labelColor": "#000000",
        "type": "approval",
        "roleApi": "/api/roles",
        "preId": "79eea628-a2bc-4215-b3cb-4039d89e45ce",
        "conditions": [
          {
            "type": "system",
            "nextType": "taskNode",
            "nextId": "7d94c065-ef94-4791-b906-0badf4fa158a",
            "preId": "cac1933c-da50-4a67-a852-981bfe517845",
            "action": "and",
            "inputs": [
              {
                "inputType": "bool",
                "action": "eq",
                "inputFlag": "accept",
                "inputValue": "true"
              }
            ]
          },
          {
            "type": "system",
            "nextType": "taskNode",
            "nextId": "16bc45d3-523e-4720-9df1-544618f74a98",
            "preId": "cac1933c-da50-4a67-a852-981bfe517845",
            "action": "and",
            "inputs": [
              {
                "inputType": "bool",
                "action": "eq",
                "inputFlag": "accept",
                "inputValue": "false"
              }
            ]
          }
        ],
        "approveType": "t2Leader"
      },
      "text": {
        "x": 970,
        "y": 170,
        "value": "审批节点"
      }
    },
    {
      "id": "7d94c065-ef94-4791-b906-0badf4fa158a",
      "type": "taskNode",
      "x": 1170,
      "y": 170,
      "properties": {
        "red": true,
        "type": "taskNode",
        "action": "webhook",
        "webhook": "https://www.baidu.com",
        "preId": "cac1933c-da50-4a67-a852-981bfe517845",
        "nextId": "16bc45d3-523e-4720-9df1-544618f74a98",
        "nextType": "taskNode"
      },
      "text": {
        "x": 1170,
        "y": 170,
        "value": "webhook"
      }
    },
    {
      "id": "93321011-3b72-456e-81e6-c20aa9f087cc",
      "type": "finish",
      "x": 1590,
      "y": 250,
      "properties": {
        "type": "finish",
        "preId": "16bc45d3-523e-4720-9df1-544618f74a98"
      },
      "text": {
        "x": 1590,
        "y": 250,
        "value": "结束"
      }
    }
  ],
  "edges": [
    {
      "id": "e70522ee-80a0-492e-a813-e5b011f1128e",
      "type": "polyline",
      "sourceNodeId": "6ba9c59c-2b33-42b6-a91c-1243a9240178",
      "targetNodeId": "47b255a7-1334-4a27-81f4-943640477d54",
      "startPoint": {
        "x": -80,
        "y": 250
      },
      "endPoint": {
        "x": 90,
        "y": 250
      },
      "properties": {},
      "pointsList": [
        {
          "x": -80,
          "y": 250
        },
        {
          "x": 90,
          "y": 250
        }
      ]
    },
    {
      "id": "fa058276-6b27-4cad-90c8-8f6628916a29",
      "type": "polyline",
      "sourceNodeId": "47b255a7-1334-4a27-81f4-943640477d54",
      "targetNodeId": "193e2ebe-306e-43b8-8655-6804e9db6011",
      "startPoint": {
        "x": 190,
        "y": 250
      },
      "endPoint": {
        "x": 255,
        "y": 250
      },
      "properties": {},
      "pointsList": [
        {
          "x": 190,
          "y": 250
        },
        {
          "x": 255,
          "y": 250
        }
      ]
    },
    {
      "id": "1c6526c2-2c9d-46c3-85c3-c06a1e080492",
      "type": "polyline",
      "sourceNodeId": "193e2ebe-306e-43b8-8655-6804e9db6011",
      "targetNodeId": "265e697f-3381-4e89-9a6f-76fbcad7e9ce",
      "startPoint": {
        "x": 325,
        "y": 250
      },
      "endPoint": {
        "x": 500,
        "y": 170
      },
      "properties": {
        "type": "custom",
        "nextType": "taskNode",
        "nextId": "265e697f-3381-4e89-9a6f-76fbcad7e9ce",
        "preId": "193e2ebe-306e-43b8-8655-6804e9db6011",
        "lineDesc": "满足条件",
        "action": "and",
        "inputs": [
          {
            "inputType": "bool",
            "action": "eq",
            "inputFlag": "accept",
            "inputValue": "true"
          }
        ]
      },
      "text": {
        "x": 437.5,
        "y": 170,
        "value": "满足条件"
      },
      "pointsList": [
        {
          "x": 325,
          "y": 250
        },
        {
          "x": 355,
          "y": 250
        },
        {
          "x": 355,
          "y": 170
        },
        {
          "x": 500,
          "y": 170
        }
      ]
    },
    {
      "id": "4f72fec5-a9a8-4e89-a3ac-36b69c1b84f8",
      "type": "polyline",
      "sourceNodeId": "193e2ebe-306e-43b8-8655-6804e9db6011",
      "targetNodeId": "7238f0b4-49f7-442f-94de-9b25dfbd729e",
      "startPoint": {
        "x": 290,
        "y": 285
      },
      "endPoint": {
        "x": 500,
        "y": 372.5
      },
      "properties": {
        "type": "custom",
        "nextType": "parallelGateway",
        "nextId": "7238f0b4-49f7-442f-94de-9b25dfbd729e",
        "preId": "193e2ebe-306e-43b8-8655-6804e9db6011",
        "lineDesc": "不满足条件",
        "action": "and",
        "inputs": [
          {
            "inputType": "bool",
            "action": "eq",
            "inputFlag": "accept",
            "inputValue": "false"
          }
        ]
      },
      "text": {
        "x": 395,
        "y": 372.5,
        "value": "不满足条件"
      },
      "pointsList": [
        {
          "x": 290,
          "y": 285
        },
        {
          "x": 290,
          "y": 372.5
        },
        {
          "x": 500,
          "y": 372.5
        }
      ]
    },
    {
      "id": "8666ea28-dd25-41a2-961d-e6a6c395d2b4",
      "type": "polyline",
      "sourceNodeId": "7238f0b4-49f7-442f-94de-9b25dfbd729e",
      "targetNodeId": "78031669-b12c-4770-81d8-5b8b19380995",
      "startPoint": {
        "x": 580,
        "y": 332.5
      },
      "endPoint": {
        "x": 700,
        "y": 300
      },
      "properties": {
        "type": "custom",
        "nextType": "taskNode",
        "nextId": "78031669-b12c-4770-81d8-5b8b19380995",
        "preId": "7238f0b4-49f7-442f-94de-9b25dfbd729e",
        "lineDesc": "满足条件",
        "action": "and",
        "inputs": [
          {
            "inputType": "bool",
            "action": "eq",
            "inputFlag": "accept",
            "inputValue": "true"
          }
        ]
      },
      "text": {
        "x": 607.5,
        "y": 332.5,
        "value": "满足条件"
      },
      "pointsList": [
        {
          "x": 580,
          "y": 332.5
        },
        {
          "x": 640,
          "y": 332.5
        },
        {
          "x": 640,
          "y": 300
        },
        {
          "x": 700,
          "y": 300
        }
      ]
    },
    {
      "id": "8ff0188e-417d-4a07-bf76-8ec64fc4689c",
      "type": "polyline",
      "sourceNodeId": "7238f0b4-49f7-442f-94de-9b25dfbd729e",
      "targetNodeId": "3ac5b29d-2b64-49cf-b933-e2f83aee8dd5",
      "startPoint": {
        "x": 580,
        "y": 372.5
      },
      "endPoint": {
        "x": 700,
        "y": 450
      },
      "properties": {
        "type": "custom",
        "nextType": "taskNode",
        "nextId": "3ac5b29d-2b64-49cf-b933-e2f83aee8dd5",
        "preId": "7238f0b4-49f7-442f-94de-9b25dfbd729e",
        "lineDesc": "满足条件",
        "action": "and",
        "inputs": [
          {
            "inputType": "bool",
            "action": "eq",
            "inputFlag": "accept",
            "inputValue": "true"
          }
        ]
      },
      "text": {
        "x": 670,
        "y": 411.25,
        "value": "满足条件"
      },
      "pointsList": [
        {
          "x": 580,
          "y": 372.5
        },
        {
          "x": 670,
          "y": 372.5
        },
        {
          "x": 670,
          "y": 450
        },
        {
          "x": 700,
          "y": 450
        }
      ]
    },
    {
      "id": "96dc6048-8835-453a-b909-bbde0ed4bd54",
      "type": "polyline",
      "sourceNodeId": "265e697f-3381-4e89-9a6f-76fbcad7e9ce",
      "targetNodeId": "79eea628-a2bc-4215-b3cb-4039d89e45ce",
      "startPoint": {
        "x": 600,
        "y": 170
      },
      "endPoint": {
        "x": 720,
        "y": 170
      },
      "properties": {},
      "pointsList": [
        {
          "x": 600,
          "y": 170
        },
        {
          "x": 720,
          "y": 170
        }
      ]
    },
    {
      "id": "35f2c834-015d-4f32-9dc4-5f5e243f24a8",
      "type": "polyline",
      "sourceNodeId": "79eea628-a2bc-4215-b3cb-4039d89e45ce",
      "targetNodeId": "cac1933c-da50-4a67-a852-981bfe517845",
      "startPoint": {
        "x": 820,
        "y": 170
      },
      "endPoint": {
        "x": 920,
        "y": 170
      },
      "properties": {
        "type": "system",
        "nextType": "approval",
        "nextId": "cac1933c-da50-4a67-a852-981bfe517845",
        "preId": "79eea628-a2bc-4215-b3cb-4039d89e45ce",
        "lineDesc": "审批通过",
        "action": "and",
        "inputs": [
          {
            "inputType": "bool",
            "action": "eq",
            "inputFlag": "accept",
            "inputValue": "true"
          }
        ]
      },
      "text": {
        "x": 870,
        "y": 170,
        "value": "审批通过"
      },
      "pointsList": [
        {
          "x": 820,
          "y": 170
        },
        {
          "x": 920,
          "y": 170
        }
      ]
    },
    {
      "id": "6307b349-55d9-4d72-ab4a-57fb1f28d085",
      "type": "polyline",
      "sourceNodeId": "cac1933c-da50-4a67-a852-981bfe517845",
      "targetNodeId": "7d94c065-ef94-4791-b906-0badf4fa158a",
      "startPoint": {
        "x": 1020,
        "y": 170
      },
      "endPoint": {
        "x": 1120,
        "y": 170
      },
      "properties": {
        "type": "system",
        "nextType": "taskNode",
        "nextId": "7d94c065-ef94-4791-b906-0badf4fa158a",
        "preId": "cac1933c-da50-4a67-a852-981bfe517845",
        "lineDesc": "审批通过",
        "action": "and",
        "inputs": [
          {
            "inputType": "bool",
            "action": "eq",
            "inputFlag": "accept",
            "inputValue": "true"
          }
        ]
      },
      "text": {
        "x": 1060,
        "y": 170,
        "value": "审批通过"
      },
      "pointsList": [
        {
          "x": 1020,
          "y": 170
        },
        {
          "x": 1120,
          "y": 170
        }
      ]
    },
    {
      "id": "3e725dfa-2d60-426b-88b2-b21b4f3ec8ea",
      "type": "polyline",
      "sourceNodeId": "50d75a7a-2f63-481b-89f6-f018ad0ad86c",
      "targetNodeId": "16bc45d3-523e-4720-9df1-544618f74a98",
      "startPoint": {
        "x": 1000,
        "y": 322.5
      },
      "endPoint": {
        "x": 1390,
        "y": 290
      },
      "properties": {},
      "pointsList": [
        {
          "x": 1000,
          "y": 322.5
        },
        {
          "x": 1390,
          "y": 322.5
        },
        {
          "x": 1390,
          "y": 290
        }
      ]
    },
    {
      "id": "c04d14c0-25f1-4888-b8ad-dbdf6c750ecf",
      "type": "polyline",
      "sourceNodeId": "7d94c065-ef94-4791-b906-0badf4fa158a",
      "targetNodeId": "16bc45d3-523e-4720-9df1-544618f74a98",
      "startPoint": {
        "x": 1220,
        "y": 170
      },
      "endPoint": {
        "x": 1340,
        "y": 250
      },
      "properties": {},
      "pointsList": [
        {
          "x": 1220,
          "y": 170
        },
        {
          "x": 1310,
          "y": 170
        },
        {
          "x": 1310,
          "y": 250
        },
        {
          "x": 1340,
          "y": 250
        }
      ]
    },
    {
      "id": "7ea16237-92c9-4b79-889c-c02f895e86ea",
      "type": "polyline",
      "sourceNodeId": "79eea628-a2bc-4215-b3cb-4039d89e45ce",
      "targetNodeId": "16bc45d3-523e-4720-9df1-544618f74a98",
      "startPoint": {
        "x": 770,
        "y": 130
      },
      "endPoint": {
        "x": 1390,
        "y": 210
      },
      "properties": {
        "type": "system",
        "nextType": "taskNode",
        "nextId": "16bc45d3-523e-4720-9df1-544618f74a98",
        "preId": "79eea628-a2bc-4215-b3cb-4039d89e45ce",
        "lineDesc": "审批拒绝",
        "action": "and",
        "inputs": [
          {
            "inputType": "bool",
            "action": "eq",
            "inputFlag": "accept",
            "inputValue": "false"
          }
        ]
      },
      "text": {
        "x": 1080,
        "y": 38,
        "value": "审批拒绝"
      },
      "pointsList": [
        {
          "x": 770,
          "y": 130
        },
        {
          "x": 770,
          "y": 38
        },
        {
          "x": 1390,
          "y": 38
        },
        {
          "x": 1390,
          "y": 210
        }
      ]
    },
    {
      "id": "ffab1268-09ff-4245-a104-d9157f03cbdf",
      "type": "polyline",
      "sourceNodeId": "cac1933c-da50-4a67-a852-981bfe517845",
      "targetNodeId": "16bc45d3-523e-4720-9df1-544618f74a98",
      "startPoint": {
        "x": 970,
        "y": 130
      },
      "endPoint": {
        "x": 1390,
        "y": 210
      },
      "properties": {
        "type": "system",
        "nextType": "taskNode",
        "nextId": "16bc45d3-523e-4720-9df1-544618f74a98",
        "preId": "cac1933c-da50-4a67-a852-981bfe517845",
        "lineDesc": "审批拒绝",
        "action": "and",
        "inputs": [
          {
            "inputType": "bool",
            "action": "eq",
            "inputFlag": "accept",
            "inputValue": "false"
          }
        ]
      },
      "text": {
        "x": 1180,
        "y": 100,
        "value": "审批拒绝"
      },
      "pointsList": [
        {
          "x": 970,
          "y": 130
        },
        {
          "x": 970,
          "y": 100
        },
        {
          "x": 1390,
          "y": 100
        },
        {
          "x": 1390,
          "y": 210
        }
      ]
    },
    {
      "id": "619bae8b-c079-45ec-941a-24de004de402",
      "type": "polyline",
      "sourceNodeId": "16bc45d3-523e-4720-9df1-544618f74a98",
      "targetNodeId": "93321011-3b72-456e-81e6-c20aa9f087cc",
      "startPoint": {
        "x": 1440,
        "y": 250
      },
      "endPoint": {
        "x": 1540,
        "y": 250
      },
      "properties": {},
      "pointsList": [
        {
          "x": 1440,
          "y": 250
        },
        {
          "x": 1540,
          "y": 250
        }
      ]
    },
    {
      "id": "01946e05-a394-476c-aa54-b96c6a8a8c35",
      "type": "polyline",
      "sourceNodeId": "3ac5b29d-2b64-49cf-b933-e2f83aee8dd5",
      "targetNodeId": "50d75a7a-2f63-481b-89f6-f018ad0ad86c",
      "startPoint": {
        "x": 800,
        "y": 450
      },
      "endPoint": {
        "x": 920,
        "y": 362.5
      },
      "properties": {},
      "pointsList": [
        {
          "x": 800,
          "y": 450
        },
        {
          "x": 890,
          "y": 450
        },
        {
          "x": 890,
          "y": 362.5
        },
        {
          "x": 920,
          "y": 362.5
        }
      ]
    },
    {
      "id": "d53c5f5d-3dd3-4f7e-a1cd-9698622911ac",
      "type": "polyline",
      "sourceNodeId": "78031669-b12c-4770-81d8-5b8b19380995",
      "targetNodeId": "50d75a7a-2f63-481b-89f6-f018ad0ad86c",
      "startPoint": {
        "x": 800,
        "y": 300
      },
      "endPoint": {
        "x": 920,
        "y": 322.5
      },
      "properties": {},
      "pointsList": [
        {
          "x": 800,
          "y": 300
        },
        {
          "x": 860,
          "y": 300
        },
        {
          "x": 860,
          "y": 322.5
        },
        {
          "x": 920,
          "y": 322.5
        }
      ]
    }
  ]
}