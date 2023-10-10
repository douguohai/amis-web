import React, { useEffect } from 'react';
import { approveUser, workNodeType } from '../config';
import { IApproveUser, WorkNodeType } from '../type';
import { Descriptions, Drawer, Select, Form, Input } from 'antd';
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


  const getTaskNode = () => {

    const result =
      <div>
        <Descriptions column={1}>
          <Descriptions.Item label="解释">
            业务节点，三种类型设定， apply(发起审批类型) ｜ webhook(系统服务类型) |  finished (审批结束类型)
          </Descriptions.Item>
          <Descriptions.Item label="唯一标识">{nodeData.id}</Descriptions.Item>
          <Descriptions.Item label="携带参数">{JSON.stringify(nodeData.properties)}</Descriptions.Item>
          <Descriptions.Item label="下级节点">{nodeData.properties.action}</Descriptions.Item>
          <Descriptions.Item label="下级节点">{nodeData.properties.next}</Descriptions.Item>
          <Descriptions.Item label="下级类型">{nodeData.properties.nextType}</Descriptions.Item>
        </Descriptions>
        <Form.Item label="节点类型">
          <Select getPopupContainer={triggerNode => triggerNode.parentNode}
            options={workNodeType}
            defaultValue={nodeData.properties.action}
            onChange={(value) => {
              updateProperty(nodeData.id, {
                ...nodeData,
                properties: {
                  ...nodeData.properties,
                  action: value
                }
              });
            }}
          />
        </Form.Item>
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

  console.log("nodeData", nodeData)

  return (
    nodeData == "" ? <div /> :
      <Drawer
        title="属性面板"
        key="123"
        placement={'right'}
        width={620}
        onClose={onClose}
        zIndex={100000}
        open={open}
      >
        <Form
          layout="horizontal"
        >
          {nodeData.properties?.type === "start" ? getStart() : ''}
          {nodeData.type === "taskNode" ? getTaskNode() : ''}
          {nodeData.type === "parallelGateway" ? getParallelGatewayNode() : ''}
          {nodeData.type === "approver" ? getApproveList() : ''}
          {nodeData.type === "jugement" ? getApiUrl() : ''}
          {nodeData.type === "finsh" ? getFinshNode() : ''}
        </Form>
      </Drawer>
  )
}