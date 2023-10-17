import React, { useEffect, useState } from 'react';
import { Drawer, Select, Form, Input, Button, Radio, Space, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined, } from '@ant-design/icons';
import ReactJson from 'react-json-view'
import { request } from '@/utils/requestInterceptor';
import { code } from '../config'

const { Search } = Input;


// @ts-ignore
export default function PropertyPanel({ nodeData, updateProperty, onClose, open }) {

  const [form] = Form.useForm();

  const [messageApi, contextHolder] = message.useMessage();

  const [approveUser, setApproveUser] = useState(JSON.parse("{\"status\":0,\"data\":[{\"label\":\"T3领导-系统填充\",\"value\":\"t3Leader\"},{\"label\":\"T2领导-系统填充\",\"value\":\"t2Leader\"},{\"label\":\"T1领导-系统填充\",\"value\":\"t1Leader\"}]}"));

  useEffect(() => {
    console.log(nodeData)
    if (nodeData != "") {
      if (nodeData.properties?.type == "custom") {
        form.setFieldsValue({
          "inputs": nodeData.properties?.inputs == undefined ? [] : nodeData.properties?.inputs,
          "action": nodeData.properties?.action == undefined ? "or" : nodeData.properties?.action
        })
      }
      if (nodeData.properties?.type == "system") {
        form.setFieldsValue({
          "inputs": JSON.parse("[{\"inputType\":\"bool\",\"action\":\"eq\",\"inputFlag\":\"accept\",\"inputValue\":\"true\"}]"),
          "action": code.AND
        })
      }
      if (nodeData?.type == code.TaskNode) {
        form.setFieldsValue({
          "webhook": nodeData.properties?.webhook == undefined ? "" : nodeData.properties?.webhook,
          "action": nodeData.properties?.action == undefined ? "" : nodeData.properties?.action
        })
      }

      if (nodeData?.type == code.Polyline) {
        form.setFieldsValue({
          "lineDesc": nodeData.text?.value == undefined ? "" : nodeData.text?.value,
        })
      }

      if (nodeData?.type == code.ApprovalNode) {
        const roleApi = nodeData.properties?.roleApi == undefined ? "/api/roles" : nodeData.properties?.roleApi
        form.setFieldsValue({
          "roleApi": roleApi,
          "approveType": nodeData.properties?.approveType == undefined ? "" : nodeData.properties?.approveType,
        })
        request({
          method: "get",
          url: roleApi,
        }).then((res: any) => {
          console.log("res:", res);
          if (res.data.status != 0) {
            messageApi.open({
              type: 'error',
              content: '加载角色信息失败，请核查接口返回信息是否符合标准，目前采用系统模拟角色',
              duration: 2,
              style: {
                marginTop: '20vh',
              },
            });
          } else {
            messageApi.open({
              type: 'success',
              content: '加载角色信息成功',
              duration: 2,
              style: {
                marginTop: '20vh',
              },
            });
            setApproveUser(res.data)
          }
        }).catch((error: any) => {
          console.log("error:", error);
        });

      }
    }
  }, [nodeData])


  const getApproveList = () => {
    const approveSelect =
      <Form
        layout="horizontal" form={form} labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
      >
        <Form.Item label="解释">
          <span className="ant-form-text">  审批节点，加载第三方系统角色进行审批<br />
            请在角色获取配置获取第三方角色接口地址，<br />
            http://www.api.com/api/roles<br />
            要求get方式请求，返回角色列表如下：<br />
            <ReactJson src={approveUser} collapsed={true} theme="monokai" />
          </span>
        </Form.Item>
        <Form.Item label="唯一标识">
          <span className="ant-form-text">{nodeData.id}</span>
        </Form.Item>
        <Form.Item label="节点类型">
          <span className="ant-form-text">{nodeData.properties.type}(审批节点)</span>
        </Form.Item>
        <Form.Item label="角色获取" name="roleApi" initialValue={"/api/roles"} rules={[{ required: true, message: '请输入角色获取地址' }, { pattern: /(^\S)((.)*\S)?(\S*$)/, message: '前后不能有空格' }]}>
          <Search
            placeholder="请输入获取角色列表地址"
            allowClear
            enterButton="加载"
            size="large"
            onSearch={(e, v) => {
              console.log(e, v)
              request({
                method: "get",
                url: e,
              }).then((res: any) => {
                console.log("res:", res);
                if (res.data.status != 0) {
                  messageApi.open({
                    type: 'error',
                    content: '加载角色信息失败，请核查接口返回信息是否符合标准',
                    duration: 2,
                    style: {
                      marginTop: '20vh',
                    },
                  });
                } else {
                  messageApi.open({
                    type: 'success',
                    content: '加载角色信息成功',
                    duration: 2,
                    style: {
                      marginTop: '20vh',
                    },
                  });
                  setApproveUser(res.data)
                }
              }).catch((error: any) => {
                console.log("error:", error);
                messageApi.open({
                  type: 'error',
                  content: '加载角色信息失败，请核查地址是否正常',
                  duration: 4,
                  style: {
                    marginTop: '20vh',
                  },
                });
              });
            }}
          />
        </Form.Item>
        <Form.Item label="审核节点类型" name="approveType" initialValue={nodeData.properties.action} rules={[{ required: true, message: '请选择审批角色' }]}>
          <Select getPopupContainer={triggerNode => triggerNode.parentNode} notFoundContent={'请配置角色获取地址，并进行访问'} options={approveUser.data}>
          </Select>
        </Form.Item>
        <Form.Item label="携带参数">
          <ReactJson src={nodeData.properties} theme="monokai" />
        </Form.Item>
      </Form>

    return approveSelect;
  }

  const getStart = () => {
    const result =
      <Form
        layout="horizontal" form={form} labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
      >
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
          <span className="ant-form-text">{nodeData.properties.nextId}</span>
        </Form.Item>
        <Form.Item label="下级类型">
          <span className="ant-form-text">{nodeData.properties.nextType}</span>
        </Form.Item>
        <Form.Item label="携带参数">
          <ReactJson src={nodeData.properties} theme="monokai" />
        </Form.Item>
      </Form>
      ;

    return result;
  }

  const getTaskNode = () => {

    const result =
      <Form
        layout="horizontal" form={form} labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
      >
        <Form.Item label="解释">
          <span className="ant-form-text"> 业务节点，三种类型设定， apply(发起审批类型) ｜ webhook(系统服务类型) |  finish (审批结束类型)</span>
        </Form.Item>
        <Form.Item label="唯一标识">
          <span className="ant-form-text">{nodeData.id}</span>
        </Form.Item>
        <Form.Item label="上级节点">
          <span className="ant-form-text">{nodeData.properties.preId}</span>
        </Form.Item>
        <Form.Item label="下级节点">
          <span className="ant-form-text">{nodeData.properties.nextId}</span>
        </Form.Item>
        <Form.Item label="下级类型">
          <span className="ant-form-text">{nodeData.properties.nextType}</span>
        </Form.Item>
        <Form.Item name="action" label="节点类型" initialValue={'apply'}>
          <Select getPopupContainer={triggerNode => triggerNode.parentNode}
            options={[
              {
                label: '发起审批',
                value: code.TaskApply
              },
              {
                label: '系统服务',
                value: code.TaskWebhook
              },
              {
                label: '审批结束',
                value: code.TaskFinished
              },
            ]}
          />
        </Form.Item>
        <Form.Item name="webhook" label="webhook" rules={[{ required: true, message: '请输入回调地址' }, { pattern: /(^\S)((.)*\S)?(\S*$)/, message: '前后不能有空格' }]}>
          <Input placeholder="http://www.api.com/api/notice"
            value={nodeData.properties.webhook}
          />
        </Form.Item>
        <Form.Item label="携带参数">
          <ReactJson src={nodeData.properties} theme="monokai" />
        </Form.Item>
      </Form>;
    return result;
  }

  const getParallelGatewayNode = () => {

    if (nodeData.properties.action == "parallelGateway-start") {
      return (
        <Form
          layout="horizontal" form={form} labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
        >
          <Form.Item label="解释">
            <span className="ant-form-text"> 并行网关开始节点，和结束节点必须成对出现</span>
          </Form.Item>
          <Form.Item label="唯一标识">
            <span className="ant-form-text">{nodeData.id}</span>
          </Form.Item>
          <Form.Item label="上级节点">
            <span className="ant-form-text">{nodeData.properties.preId}</span>
          </Form.Item>
          <Form.Item label="伙伴节点">
            <span className="ant-form-text">{nodeData.properties.friend}</span>
          </Form.Item>
          <Form.Item label="携带参数">
            <ReactJson src={nodeData.properties} theme="monokai" />
          </Form.Item>
        </Form>
      )
    } else {
      return (
        <Form
          layout="horizontal" form={form} labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
        >
          <Form.Item label="解释">
            <span className="ant-form-text">  并行网关结束节点，和开始节点必须成对出现</span>
          </Form.Item>
          <Form.Item label="唯一标识">
            <span className="ant-form-text">{nodeData.id}</span>
          </Form.Item>
          <Form.Item label="上级节点">
            <span className="ant-form-text">{nodeData.properties.preId}</span>
          </Form.Item>
          <Form.Item label="下级节点">
            <span className="ant-form-text">{nodeData.properties.nextId}</span>
          </Form.Item>
          <Form.Item label="下级类型">
            <span className="ant-form-text">{nodeData.properties.nextType}</span>
          </Form.Item>
          <Form.Item label="伙伴节点">
            <span className="ant-form-text">{nodeData.properties.friend}</span>
          </Form.Item>
          <Form.Item label="携带参数">
            <ReactJson src={nodeData.properties} theme="monokai" />
          </Form.Item>
        </Form>
      )
    }
  }

  const getConditionGateWayNode = () => {
    const result = <Form
      layout="horizontal" form={form} labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
    >
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
      <Form.Item label="上级节点">
        <span className="ant-form-text">{nodeData.properties.preId}</span>
      </Form.Item>
      <Form.Item label="携带参数">
        <ReactJson src={nodeData.properties} theme="monokai" />
      </Form.Item>
    </Form>
    return result;
  }

  const getFinshNode = () => {
    const result =
      <Form
        layout="horizontal" form={form} labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
      >
        <Form.Item label="解释">
          <span className="ant-form-text"> 引擎结束节点，无任何业务意义，标识逻辑结束</span>
        </Form.Item>
        <Form.Item label="唯一标识">
          <span className="ant-form-text">{nodeData.id}</span>
        </Form.Item>
        <Form.Item label="节点类型">
          <span className="ant-form-text">{nodeData.properties.type}(结束节点)</span>
        </Form.Item>
        <Form.Item label="携带参数">
          <ReactJson src={nodeData.properties} theme="monokai" />
        </Form.Item>
      </Form>

    return result;
  }

  const getPolylineNode = () => {
    const result =
      <Form
        layout="horizontal" form={form} labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
      >
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
        {
          !nodeData.properties?.type ?
            <Form.Item label="文字描述" name="lineDesc" rules={[{ max: 20, message: '最大长度20个字符' }]}>
              <Input style={{ width: 250 }} />
            </Form.Item>
            :
            nodeData.properties?.type && (
              nodeData.properties?.type == "custom" ? <div>
                <Form.Item label="文字描述" name="lineDesc" rules={[{ max: 20, message: '最大长度20个字符' }]} >
                  <Input style={{ width: 250 }} />
                </Form.Item>
                <Form.Item label="关系条件" name="action" initialValue={{ 'action': nodeData.properties.action }}>
                  <Radio.Group >
                    <Radio.Button value={code.AND}>且</Radio.Button>
                    <Radio.Button value={code.OR}>或</Radio.Button>
                  </Radio.Group>
                </Form.Item>
                <Form.Item label="条件" rules={[{ required: true }]}>
                  <Form.List
                    name="inputs"
                    rules={[
                      {
                        validator: async (index, inputs) => {
                          // console.log(index, inputs)
                          if (!inputs || inputs.length < 1) {
                            return Promise.reject(new Error('至少设置1个条件'));
                          }
                        },
                      },
                    ]}
                  >
                    {(fields, { add, remove }, { errors }) => (
                      <>
                        {fields.map((field, _) => (
                          <Space key={field.key} style={{ marginBottom: 1 }}>
                            <Form.Item name={[field.name, 'inputFlag']} validateTrigger="onBlur" rules={[{ required: true, message: '请输入变量' }, { pattern: /(^\S)((.)*\S)?(\S*$)/, message: '前后不能有空格' }]}>
                              <Input style={{ width: 120 }} placeholder="变量" />
                            </Form.Item>
                            <Form.Item name={[field.name, 'inputType']} rules={[{ required: true }]} initialValue={'string'}>
                              <Select style={{ width: 90 }} getPopupContainer={triggerNode => triggerNode.parentNode}
                                options={[
                                  { label: code.VarFloat64, value: code.VarFloat64 },
                                  { label: code.VarBool, value: code.VarBool },
                                  { label: code.VarString, value: code.VarString },
                                  { label: code.VarStringArray, value: code.VarStringArray },
                                ]}
                              >
                              </Select>
                            </Form.Item>
                            <Form.Item name={[field.name, 'action']} rules={[{ required: true }]} initialValue={'eq'}>
                              <Select style={{ width: 85 }} getPopupContainer={triggerNode => triggerNode.parentNode}
                                options={[
                                  { label: '等于', value: code.EQ },
                                  { label: '不等于', value: code.NE },
                                  { label: '大于', value: code.GT },
                                  { label: '小于', value: code.LT },
                                  { label: '包含', value: code.IN },
                                  { label: '不包含', value: code.NOTIN },
                                ]}
                              >
                              </Select>
                            </Form.Item>
                            <Form.Item name={[field.name, 'inputValue']} rules={[{ required: true, message: '请输入比较值' }, { pattern: /(^\S)((.)*\S)?(\S*$)/, message: '前后不能有空格' }]}>
                              <Input style={{ width: 140 }} placeholder="比较值" />
                            </Form.Item>
                            <Form.Item >
                              <MinusCircleOutlined
                                onClick={() => {
                                  remove(field.name);
                                }} rev={undefined} />
                            </Form.Item>
                          </Space>
                        ))}
                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => add()}
                            style={{ width: '25%' }}
                            icon={<PlusOutlined rev={undefined} />}
                          >
                            添加条件
                          </Button>
                          <Form.ErrorList errors={errors} />
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </Form.Item>
              </div> : <div>
                <Form.Item label="文字描述" name="lineDesc" initialValue={"审批拒绝"} rules={[{ required: true, message: '请输入变量' }, { max: 20, message: '最大长度20个字符' }]} >
                  <Radio.Group
                    onChange={(e) => {
                      if (e.target.value == "审批通过") {
                        form.setFieldValue("inputs", JSON.parse("[{\"inputType\":\"bool\",\"action\":\"eq\",\"inputFlag\":\"accept\",\"inputValue\":\"true\"}]"))
                      } else {
                        form.setFieldValue("inputs", JSON.parse("[{\"inputType\":\"bool\",\"action\":\"eq\",\"inputFlag\":\"accept\",\"inputValue\":\"false\"}]"))
                      }
                    }}>
                    <Radio value="审批通过">审批通过</Radio>
                    <Radio value="审批拒绝">审批拒绝</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item label="关系条件" name="action" initialValue={{ 'action': code.AND }} hidden>
                  <Radio.Group >
                    <Radio.Button value={code.AND}>且</Radio.Button>
                    <Radio.Button value={code.OR}>或</Radio.Button>
                  </Radio.Group>
                </Form.Item>
                <Form.Item label="条件" hidden name="inputs">
                  <Input />
                </Form.Item>
              </div>)
        }

        <Form.Item label="携带参数">
          <ReactJson src={nodeData.properties} theme="monokai" />
        </Form.Item>
      </Form>
      ;

    return result;
  }

  console.log("nodeData", nodeData)



  return (
    nodeData in ["", undefined] ? <div /> :
      <Drawer forceRender={true}
        // destroyOnClose={true}
        title="属性面板"
        placement={'right'}
        width={650}
        onClose={onClose}
        zIndex={100000}
        open={open}
        extra={
          <Space>
            <Button type="primary" onClick={(e) => {
              console.log(e)
              form.validateFields().then(value => {
                // 验证通过后进入 
                console.log(value, "success", nodeData);
                if (nodeData.type == code.Polyline) {
                  updateProperty(nodeData.id, {
                    ...nodeData,
                    properties: {
                      ...nodeData.properties,
                      ...value,
                      type: nodeData.properties?.type,
                    },
                    text: {
                      value: value.lineDesc
                    }
                  });
                } else {
                  updateProperty(nodeData.id, {
                    ...nodeData,
                    properties: {
                      ...nodeData.properties,
                      ...value,
                    },
                    text: {
                      ...nodeData.text,
                    }
                  });
                }

              }).catch(err => { // 验证不通过时进入
                console.log("error,核验失败", err);
              });
            }}>更新</Button>
          </Space>
        }
      >
        {contextHolder}
        {nodeData.properties?.type === code.START ? getStart() : ''}
        {nodeData.type === code.TaskNode ? getTaskNode() : ''}
        {nodeData.type === code.ParallelGateway ? getParallelGatewayNode() : ''}
        {nodeData.type === code.ConditionGateway ? getConditionGateWayNode() : ''}
        {nodeData.type === code.ApprovalNode ? getApproveList() : ''}
        {nodeData.type === code.EndNode ? getFinshNode() : ''}
        {nodeData.type === code.Polyline ? getPolylineNode() : ''}
      </Drawer>
  )
}