import React, { useEffect } from 'react';
import { approveUser, workNodeType } from '../config';
import { IApproveUser } from '../type';
import { Drawer, Select, Form, Input, Button, Radio, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined, } from '@ant-design/icons';


// @ts-ignore
export default function PropertyPanel({ nodeData, updateProperty, onClose, open }) {

  const getApproveList = () => {
    const approveUserOption: JSX.Element[] = []
    approveUser.forEach((item: IApproveUser) => {
      approveUserOption.push(<Select.Option value={item.value}>{item.label}</Select.Option>);
    });
    const approveSelect =
      <div>
        <Form.Item label="解释">
          <span className="ant-form-text">  引擎开始节点，无任何业务意义，标识逻辑开始</span>
        </Form.Item>
        <Form.Item label="唯一标识">
          <span className="ant-form-text">{nodeData.id}</span>
        </Form.Item>
        <Form.Item label="节点类型">
          <span className="ant-form-text">{nodeData.properties.type}(申请节点)</span>
        </Form.Item>
        <Form.Item label="携带参数">
          <span className="ant-form-text">{JSON.stringify(nodeData.properties)}</span>
        </Form.Item>
        <Form.Item label="下级节点">
          <span className="ant-form-text">{nodeData.properties.next}</span>
        </Form.Item>
        <Form.Item label="下级类型">
          <span className="ant-form-text">{nodeData.properties.nextType}</span>
        </Form.Item>
        <Form.Item label="审核节点类型" name="approveType">
          <Select defaultValue={nodeData.properties.action}>
            {approveUserOption}
          </Select>
        </Form.Item>
      </div>

    return approveSelect;
  }

  const getStart = () => {
    const result =
      <div>
        <Form.Item label="解释">
          <span className="ant-form-text">  引擎开始节点，无任何业务意义，标识逻辑开始</span>
        </Form.Item>
        <Form.Item label="唯一标识">
          <span className="ant-form-text">{nodeData.id}</span>
        </Form.Item>
        <Form.Item label="节点类型">
          <span className="ant-form-text">{nodeData.properties.type}(申请节点)</span>
        </Form.Item>
        <Form.Item label="携带参数">
          <span className="ant-form-text">{JSON.stringify(nodeData.properties)}</span>
        </Form.Item>
        <Form.Item label="下级节点">
          <span className="ant-form-text">{nodeData.properties.next}</span>
        </Form.Item>
        <Form.Item label="下级类型">
          <span className="ant-form-text">{nodeData.properties.nextType}</span>
        </Form.Item>
      </div>
      ;

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
        <Form.Item label="解释">
          <span className="ant-form-text"> 业务节点，三种类型设定， apply(发起审批类型) ｜ webhook(系统服务类型) |  finished (审批结束类型)</span>
        </Form.Item>
        <Form.Item label="唯一标识">
          <span className="ant-form-text">{nodeData.id}</span>
        </Form.Item>
        <Form.Item label="携带参数">
          <span className="ant-form-text">{JSON.stringify(nodeData.properties)}</span>
        </Form.Item>
        <Form.Item label="上级节点">
          <span className="ant-form-text">{nodeData.properties.pre}</span>
        </Form.Item>
        <Form.Item label="下级节点">
          <span className="ant-form-text">{nodeData.properties.next}</span>
        </Form.Item>
        <Form.Item label="下级类型">
          <span className="ant-form-text">{nodeData.properties.nextType}</span>
        </Form.Item>
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
          <Form.Item label="解释">
            <span className="ant-form-text"> 并行网关开始节点，和结束节点必须成对出现</span>
          </Form.Item>
          <Form.Item label="唯一标识">
            <span className="ant-form-text">{nodeData.id}</span>
          </Form.Item>
          <Form.Item label="携带参数">
            <span className="ant-form-text">{JSON.stringify(nodeData.properties)}</span>
          </Form.Item>
          <Form.Item label="上级节点">
            <span className="ant-form-text">{nodeData.properties.pre}</span>
          </Form.Item>
          <Form.Item label="下级节点">
            <span className="ant-form-text">{nodeData.properties.next}</span>
          </Form.Item>
          <Form.Item label="下级类型">
            <span className="ant-form-text">{nodeData.properties.nextType}</span>
          </Form.Item>
        </div>
      )
    } else {
      return (
        <div>
          <Form.Item label="解释">
            <span className="ant-form-text">  并行网关结束节点，和开始节点必须成对出现</span>
          </Form.Item>
          <Form.Item label="唯一标识">
            <span className="ant-form-text">{nodeData.id}</span>
          </Form.Item>
          <Form.Item label="携带参数">
            <span className="ant-form-text">{JSON.stringify(nodeData.properties)}</span>
          </Form.Item>
          <Form.Item label="上级节点">
            <span className="ant-form-text">{nodeData.properties.pre}</span>
          </Form.Item>
          <Form.Item label="下级节点">
            <span className="ant-form-text">{nodeData.properties.next}</span>
          </Form.Item>
          <Form.Item label="下级类型">
            <span className="ant-form-text">{nodeData.properties.nextType}</span>
          </Form.Item>
        </div>
      )
    }
  }

  const getConditionGateWayNode = () => {
    const result = <div>
      <Form.Item label="解释">
        <span className="ant-form-text">单行网关，条件判断，执行第一个符合条件的后续节点。<br />
          请在后续设置多节点，在连线处设置条件</span>
      </Form.Item>
      <Form.Item label="唯一标识">
        <span className="ant-form-text">{nodeData.id}</span>
      </Form.Item>
      <Form.Item label="节点类型">
        <span className="ant-form-text">{nodeData.properties.type}</span>
      </Form.Item>
      <Form.Item label="携带参数">
        <span className="ant-form-text">{JSON.stringify(nodeData.properties)}</span>
      </Form.Item>
      <Form.Item label="上级节点">
        <span className="ant-form-text">{nodeData.properties.pre}</span>
      </Form.Item>
      <Form.Item label="下级节点">
        <span className="ant-form-text">{nodeData.properties.next}</span>
      </Form.Item>
      <Form.Item label="下级类型">
        <span className="ant-form-text">{nodeData.properties.nextType}</span>
      </Form.Item>
    </div>
    return result;
  }

  const getFinshNode = () => {
    const result =
      <div>
        <Form.Item label="解释">
          <span className="ant-form-text"> 引擎结束节点，无任何业务意义，标识逻辑结束</span>
        </Form.Item>
        <Form.Item label="唯一标识">
          <span className="ant-form-text">{nodeData.id}</span>
        </Form.Item>
        <Form.Item label="节点类型">
          <span className="ant-form-text">{nodeData.properties.type}(结束节点)</span>
        </Form.Item>
      </div>;

    return result;
  }

  const getPolylineNode = () => {
    const result =
      <div>
        <Form.Item label="解释">
          <span className="ant-form-text">普通节点间连线</span>
        </Form.Item>
        <Form.Item label="唯一标识">
          <span className="ant-form-text">{nodeData.id}</span>
        </Form.Item>
        <Form.Item label="发起点标识">
          <span className="ant-form-text">{nodeData.sourceNodeId}</span>
        </Form.Item>
        <Form.Item label="目的地标识">
          <span className="ant-form-text">{nodeData.targetNodeId}</span>
        </Form.Item>
        <Form.Item name="desc" label="文字描述" >
          <Input
            defaultValue={nodeData.text?.value == undefined ? "" : nodeData.text?.value}
            onBlur={(e) => {
              console.log(nodeData)
              updateProperty(nodeData.id, {
                ...nodeData,
                text: {
                  ...nodeData.text,
                  value: e.target.value
                }
              });
              form.resetFields(['desc'])
            }}
          />
        </Form.Item>
        <Form.Item label="关系条件" name="requiredMarkValue" initialValue={'and'}>
          <Radio.Group>
            <Radio.Button value='and'>且</Radio.Button>
            <Radio.Button value="or">或</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="条件" rules={[{ required: true }]}>
          <Form.List
            name="conditions"
            rules={[
              {
                validator: async (index, conditions) => {
                  console.log(index, conditions)
                  if (!conditions || conditions.length < 1) {
                    return Promise.reject(new Error('至少设置1个判断条件'));
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, _) => (
                  <Space key={field.key} style={{ marginBottom: 16 }}>
                    <Form.Item noStyle name={[field.name, 'inputFlag']} validateTrigger="onBlur" rules={[{ required: true }]}>
                      <Input style={{ width: 120 }} placeholder="变量" />
                    </Form.Item>
                    <Form.Item noStyle name={[field.name, 'inputType']} rules={[{ required: true }]} initialValue={'string'}>
                      <Select style={{ width: 85 }} getPopupContainer={triggerNode => triggerNode.parentNode}
                        options={[
                          { label: 'float64', value: 'float64' },
                          { label: 'bool', value: 'bool' },
                          { label: 'string', value: 'string' },
                          { label: '[]string', value: '[]string' },
                        ]}
                      >
                      </Select>
                    </Form.Item>
                    <Form.Item noStyle name={[field.name, 'action']} rules={[{ required: true }]} initialValue={'eq'}>
                      <Select style={{ width: 85 }} getPopupContainer={triggerNode => triggerNode.parentNode}
                        options={[
                          { label: '等于', value: 'eq' },
                          { label: '不等于', value: 'ne' },
                          { label: '大于', value: 'gt' },
                          { label: '小于', value: 'lt' },
                          { label: '包含', value: 'in' },
                          { label: '不包含', value: 'notLn' },
                        ]}
                      >
                      </Select>
                    </Form.Item>
                    <Form.Item noStyle name={[field.name, 'inputValue']} rules={[{ required: true }]}>
                      <Input style={{ width: 140 }} placeholder="比较值" />
                    </Form.Item>
                    <MinusCircleOutlined
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                    <MinusCircleOutlined
                      onClick={() => {
                        form.validateFields(['conditions'])
                        // form.validateFields([
                        //   ['conditions', 0, 'inputFlag'],
                        // ])
                        // console.log(form.getFieldValue("conditions"))
                      }}
                    />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    style={{ width: '25%' }}
                    icon={<PlusOutlined />}
                  >
                    添加条件
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>
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
        destroyOnClose={true}
        title="属性面板"
        placement={'right'}
        width={650}
        onClose={onClose}
        zIndex={100000}
        open={open}
      >
        <Form
          layout="horizontal" form={form} labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
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