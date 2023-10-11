import React, { useEffect } from 'react';
import { approveUser, workNodeType } from '../config';
import { IApproveUser, WorkNodeType } from '../type';
import { Descriptions, Drawer, Select, Form, Input, Cascader, } from 'antd';
const { Option } = Select;


// @ts-ignore
export default function PropertyPanel({ nodeData, updateProperty, onClose, open }) {

  const getApproveList = () => {
    const approveUserOption: JSX.Element[] = []
    approveUser.forEach((item: IApproveUser) => {
      approveUserOption.push(<Select.Option value={item.value}>{item.label}</Select.Option>);
    });
    const approveSelect =
      <div>
        <Descriptions column={1}>
          <Descriptions.Item label="解释">
            引擎开始节点，无任何业务意义，标识逻辑开始
          </Descriptions.Item>
          <Descriptions.Item label="唯一标识">{nodeData.id}</Descriptions.Item>
          <Descriptions.Item label="节点类型">{nodeData.properties.type}(申请节点)</Descriptions.Item>
          <Descriptions.Item label="携带参数">{JSON.stringify(nodeData.properties)}</Descriptions.Item>
          <Descriptions.Item label="下级节点">{nodeData.properties.next}</Descriptions.Item>
          <Descriptions.Item label="下级类型">{nodeData.properties.nextType}</Descriptions.Item>
        </Descriptions>
        <Form.Item label="审核节点类型" name="approveType">
          <Select defaultValue={nodeData.properties.action}>
            {approveUserOption}
          </Select>
        </Form.Item>
        {JSON.stringify(nodeData.properties)}
      </div>

    return approveSelect;
  }

  const getApiUrl = () => {
    const Api = <div>
      <Descriptions column={1}>
        <Descriptions.Item label="解释">
          引擎开始节点，无任何业务意义，标识逻辑开始
        </Descriptions.Item>
        <Descriptions.Item label="唯一标识">{nodeData.id}</Descriptions.Item>
        <Descriptions.Item label="节点类型">{nodeData.properties.type}(申请节点)</Descriptions.Item>
        <Descriptions.Item label="携带参数">{JSON.stringify(nodeData.properties)}</Descriptions.Item>
        <Descriptions.Item label="下级节点">{nodeData.properties.next}</Descriptions.Item>
        <Descriptions.Item label="下级类型">{nodeData.properties.nextType}</Descriptions.Item>
      </Descriptions>
      <Form.Item label="API" name="api">
        <Input />
      </Form.Item>
    </div>

    return Api;
  }

  const getStart = () => {
    const result = <Descriptions column={1}>
      <Descriptions.Item label="解释">
        引擎开始节点，无任何业务意义，标识逻辑开始
      </Descriptions.Item>
      <Descriptions.Item label="唯一标识">{nodeData.id}</Descriptions.Item>
      <Descriptions.Item label="节点类型">{nodeData.properties.type}(申请节点)</Descriptions.Item>
      <Descriptions.Item label="携带参数">{JSON.stringify(nodeData.properties)}</Descriptions.Item>
      <Descriptions.Item label="下级节点">{nodeData.properties.next}</Descriptions.Item>
      <Descriptions.Item label="下级类型">{nodeData.properties.nextType}</Descriptions.Item>
    </Descriptions>;

    return result;
  }


  const onActionChange = (value: string) => {
    switch (value) {
      case 'apply':
      case 'finish':
        form.resetFields(['webhook'])
    }
    updateProperty(nodeData.id, {
      ...nodeData,
      properties: {
        ...nodeData.properties,
        action: value,
        webhook: ""
      }
    });
  };

  const getTaskNode = () => {
    const result =
      <div style={{ height: 500 }}>
        <Descriptions column={1}>
          <Descriptions.Item label="解释">
            业务节点，三种类型设定， apply(发起审批类型) ｜ webhook(系统服务类型) |  finished (审批结束类型)
          </Descriptions.Item>
          <Descriptions.Item label="唯一标识">{nodeData.id}</Descriptions.Item>
          <Descriptions.Item label="携带参数">{JSON.stringify(nodeData.properties)}</Descriptions.Item>
          <Descriptions.Item label="上级节点">{nodeData.properties.pre}</Descriptions.Item>
          <Descriptions.Item label="下级节点">{nodeData.properties.next}</Descriptions.Item>
          <Descriptions.Item label="下级类型">{nodeData.properties.nextType}</Descriptions.Item>
        </Descriptions>
        <Form.Item name="action" label="节点类型">
          <Select getPopupContainer={triggerNode => triggerNode.parentNode}
            options={workNodeType}
            defaultValue={nodeData.properties.action}
            onChange={onActionChange}
          />
        </Form.Item>
        {
          nodeData.properties.action == "webhook" ?
            <Form.Item name="webhook" label="webhook" >
              <Input placeholder="http://www.api.com/api/notice"
                value={nodeData.properties.webhook}
                onBlur={(e) => {
                  updateProperty(nodeData.id, {
                    ...nodeData,
                    properties: {
                      ...nodeData.properties,
                      webhook: e.target.value
                    }
                  });
                }}
              />
            </Form.Item> : <div />
        }
      </div>
    return result;
  }

  const getParallelGatewayNode = () => {

    if (nodeData.properties.action == "parallelGateway-start") {
      return (
        <div>
          <Descriptions column={1}>
            <Descriptions.Item label="解释">
              并行网关开始节点，和结束节点必须成对出现
            </Descriptions.Item>
            <Descriptions.Item label="唯一标识">{nodeData.id}</Descriptions.Item>
            <Descriptions.Item label="携带参数">{JSON.stringify(nodeData.properties)}</Descriptions.Item>
            <Descriptions.Item label="下级节点">{nodeData.properties.action}</Descriptions.Item>
            <Descriptions.Item label="下级节点">{nodeData.properties.next}</Descriptions.Item>
            <Descriptions.Item label="下级类型">{nodeData.properties.nextType}</Descriptions.Item>
          </Descriptions>
        </div>
      )
    } else {
      return (
        <div>
          <Descriptions column={1}>
            <Descriptions.Item label="解释">
              并行网关结束节点，和开始节点必须成对出现
            </Descriptions.Item>
            <Descriptions.Item label="唯一标识">{nodeData.id}</Descriptions.Item>
            <Descriptions.Item label="携带参数">{JSON.stringify(nodeData.properties)}</Descriptions.Item>
            <Descriptions.Item label="下级节点">{nodeData.properties.action}</Descriptions.Item>
            <Descriptions.Item label="下级节点">{nodeData.properties.next}</Descriptions.Item>
            <Descriptions.Item label="下级类型">{nodeData.properties.nextType}</Descriptions.Item>
          </Descriptions>
        </div>
      )
    }
  }

  const getConditionGateWayNode = () => {
    const result = <div>
      <Descriptions column={1}>
        <Descriptions.Item label="解释">
          单行网关，条件判断，执行第一个符合条件的后续节点。<br />
          请在后续设置多节点，在连线处设置条件
        </Descriptions.Item>
        <Descriptions.Item label="唯一标识">{nodeData.id}</Descriptions.Item>
        <Descriptions.Item label="节点类型">{nodeData.properties.type}</Descriptions.Item>
        <Descriptions.Item label="携带参数">{JSON.stringify(nodeData.properties)}</Descriptions.Item>
        <Descriptions.Item label="上级节点">{nodeData.properties.pre}</Descriptions.Item>
        <Descriptions.Item label="下级节点">{nodeData.properties.next}</Descriptions.Item>
        <Descriptions.Item label="下级类型">{nodeData.properties.nextType}</Descriptions.Item>
      </Descriptions>
    </div>
    return result;
  }

  const getFinshNode = () => {
    const result = <Descriptions column={1}>
      <Descriptions.Item label="解释">
        引擎结束节点，无任何业务意义，标识逻辑结束
      </Descriptions.Item>
      <Descriptions.Item label="唯一标识">{nodeData.id}</Descriptions.Item>
      <Descriptions.Item label="节点类型">{nodeData.properties.type}(结束节点)</Descriptions.Item>
      <Descriptions.Item label="携带参数">{JSON.stringify(nodeData.properties)}</Descriptions.Item>
    </Descriptions>;

    return result;
  }

  const getPolylineNode = () => {
    const result =
      <div>
        <Descriptions column={1}>
          <Descriptions.Item label="解释">
            普通节点间连线
          </Descriptions.Item>
          <Descriptions.Item label="唯一标识">{nodeData.id}</Descriptions.Item>
          <Descriptions.Item label="发起点标识">{nodeData.sourceNodeId}</Descriptions.Item>
          <Descriptions.Item label="目的地标识">{nodeData.targetNodeId}</Descriptions.Item>
        </Descriptions>
        <Form.Item name="desc2" label="文字描述" >
          <Input
            defaultValue={nodeData.text?.value}
            onBlur={(e) => {
              console.log(nodeData)
              updateProperty(nodeData.id, {
                ...nodeData,
                text: {
                  ...nodeData.text,
                  value: e.target.value
                }
              });
            }}
          />
        </Form.Item>
      </div>
      ;

    return result;
  }

  console.log("nodeData", nodeData)

  const [form] = Form.useForm();

  return (
    nodeData == "" ? <div /> :
      <Drawer
        title="属性面板"
        placement={'right'}
        width={620}
        onClose={onClose}
        zIndex={100000}
        open={open}
      >
        <Form
          layout="horizontal" form={form}
        >
          {nodeData.properties?.type === "start" ? getStart() : ''}
          {nodeData.type === "taskNode" ? getTaskNode() : ''}
          {nodeData.type === "parallelGateway" ? getParallelGatewayNode() : ''}
          {nodeData.type === "conditionGateWay" ? getConditionGateWayNode() : ''}
          {nodeData.type === "approver" ? getApproveList() : ''}
          {nodeData.type === "finsh" ? getFinshNode() : ''}
          {nodeData.type === "polyline" ? getPolylineNode() : ''}
        </Form>
      </Drawer>
  )
}