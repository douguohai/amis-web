import React, { ReactNode } from 'react';
import { RendererProps, Renderer } from 'amis';
import { Timeline, Descriptions, message, Watermark } from 'antd';
import type { TimelineItemProps } from 'antd';
import { request } from '@/utils/requestInterceptor';
import { code } from "../config"

class TimelineStateType {
    items: TimelineItemProps[]
    approvalStatus: number
    status: number
    reason: string
}

interface Props extends RendererProps {
    src: string
    marginTop: number
    instanceId: number
}


@Renderer({
    type: 'antd-timeline',
    autoVar: true
})
class AntdTimeline extends React.Component<Props, TimelineStateType> {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            approvalStatus: 0,
            status: 0,
            reason: ""
        };
    }

    componentDidMount() {
        const { instanceId } = this.props;
        request({
            method: "get",
            url: "http://localhost:8080/v1/sys/recode/instance/" + instanceId,
        }).then((res: any) => {
            console.log("res:", res);
            if (res.data.errorCode != 0) {
                message.open({
                    type: 'error',
                    content: res.data.msg,
                    duration: 4,
                    style: {
                        marginTop: '15vh',
                    },
                });
            } else {
                const items = res.data.data.items;
                const payload = res.data.data.payload;
                var elements: TimelineItemProps[] = [];
                for (const item of items) {
                    console.log("item:", item)
                    switch (item.nodeType) {
                        case code.START:
                            elements.push({
                                key: item.nodeId,
                                children: [<Descriptions title={item.time + "-" + item.customNodeName} key={item.time + "-" + item.customNodeName}>
                                    <Descriptions.Item label="节点类型">逻辑开始</Descriptions.Item>
                                    <Descriptions.Item label="实例编号">
                                        {payload.instanceId}
                                    </Descriptions.Item>
                                    <Descriptions.Item span={3} label="负载消息体">
                                        {payload.payload}
                                    </Descriptions.Item>
                                </Descriptions>]
                            })
                            break;
                        case code.TaskNode:
                            switch (item.action) {
                                case code.TaskApply:
                                    elements.push({
                                        key: item.nodeId,
                                        children: [<Descriptions title={item.time + "-" + item.customNodeName} key={item.time + "-" + item.customNodeName}>
                                            <Descriptions.Item label="节点类型">业务节点-流程开始</Descriptions.Item>
                                            <Descriptions.Item label="发起人账户">{payload.operatorName}</Descriptions.Item>
                                            <Descriptions.Item label="发起人标识">{payload.operatorId}</Descriptions.Item>
                                            <Descriptions.Item label="参与计算属性">
                                                {payload.attribute}
                                            </Descriptions.Item>
                                        </Descriptions>]
                                    })
                                    break;
                                case code.TaskWebhook:
                                    var responseElements: ReactNode[] = [];
                                    let hook = item.hook;
                                    if (hook != null) {
                                        responseElements.push(
                                            <><Descriptions.Item label="回调地址">{hook.hookUrl}</Descriptions.Item><Descriptions.Item label="回调状态">{hook.status == 0 ? "对方未确认收到" : "对方以已确认收到"}</Descriptions.Item><Descriptions.Item label="最新执行时间">{hook.lastTryAt}</Descriptions.Item><Descriptions.Item span={3} label="有效负载">{hook.payload}</Descriptions.Item></>
                                        )

                                    }
                                    elements.push({
                                        key: item.nodeId,
                                        children: [<Descriptions title={item.time + "-" + item.customNodeName} key={item.time + "-" + item.customNodeName}>
                                            <Descriptions.Item label="节点类型">业务节点-回调</Descriptions.Item>
                                            {...responseElements}
                                        </Descriptions>]
                                    })
                                    break;
                                case code.TaskFinished:
                                    elements.push({
                                        key: item.nodeId,
                                        children: [<Descriptions title={item.time + "-" + item.customNodeName} key={item.time + "-" + item.customNodeName}>
                                            <Descriptions.Item label="节点类型">业务节点-流程结束</Descriptions.Item>
                                        </Descriptions>]
                                    })
                                    break;

                            }
                            break;
                        case code.ApprovalNode:

                            var responseElements: ReactNode[] = [];
                            let responses = item.approvals?.response
                            if (responses != undefined) {
                                for (let index = 0; index < responses.length; index++) {
                                    const element = responses[index];
                                    responseElements.push(
                                        <><Descriptions.Item label="回复">{element.createAt}-{element.operatorName}({element.operatorId})</Descriptions.Item><Descriptions.Item label="审批结果">{element.result ? "通过" : "拒绝"}({element.effective == 0 ? "判定有效" : "判定无效"})</Descriptions.Item><Descriptions.Item label="审批备注">{element.option}</Descriptions.Item><Descriptions.Item span={3} label="完整信息">{element.attribute}</Descriptions.Item></>
                                    )
                                }
                            }

                            elements.push({
                                key: item.nodeId,
                                children: [<Descriptions title={item.time + "-" + item.customNodeName} key={item.time + "-" + item.customNodeName}>
                                    <Descriptions.Item label="节点类型">审批节点</Descriptions.Item>
                                    <Descriptions.Item label="审批类型">{item.approvals?.request?.CurrentNodeType}</Descriptions.Item>
                                    <Descriptions.Item label="是否存在回复">{item.approvals?.request?.status == 0 ? "等待回复" : "已回复"}</Descriptions.Item>
                                    {...responseElements}
                                </Descriptions>]
                            })
                            break;
                        case code.ConditionGateway:
                            elements.push({
                                key: item.nodeId,
                                children: [<Descriptions title={item.time + "-" + item.customNodeName} key={item.time + "-" + item.customNodeName}>
                                    <Descriptions.Item label="节点类型" span={1}>单行网关</Descriptions.Item>
                                    <Descriptions.Item label="运行状态" span={2}>{0 == item.status ? "执行中" : "执行完"}</Descriptions.Item>
                                    <Descriptions.Item label="参与计算表达式" span={3}>{item.conditions}</Descriptions.Item>
                                </Descriptions>]
                            })
                            break;
                        case code.ParallelGateway:
                            elements.push({
                                key: item.nodeId,
                                children: [<Descriptions title={item.time + "-" + item.customNodeName} key={item.time + "-" + item.customNodeName}>
                                    <Descriptions.Item label="节点类型">并行网关</Descriptions.Item>
                                    <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
                                    <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
                                    <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
                                    <Descriptions.Item label="Remark">empty</Descriptions.Item>
                                    <Descriptions.Item label="Address">
                                        No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
                                    </Descriptions.Item>
                                </Descriptions>]
                            })
                            break;
                        case code.EndNode:
                            elements.push({
                                key: item.nodeId,
                                children: [<Descriptions title={item.time + "-" + item.customNodeName} key={item.time + "-" + item.customNodeName}>
                                    <Descriptions.Item label="节点类型">逻辑结束</Descriptions.Item>
                                </Descriptions>]
                            })
                            break;
                    }


                }
                this.setState({
                    items: elements,
                    approvalStatus: payload.approvalStatus,
                    status: payload.status,
                    reason: payload.reason
                })
            }
        }).catch((error) => {
            console.log("error:", error);
        });
    }


    componentWillUnmount() {

    }


    render() {
        const { marginTop } = this.props;

        let approvalStatus = "未知";
        if (1 == this.state.approvalStatus) {
            approvalStatus = "审批通过"
        } else if (2 == this.state.approvalStatus) {
            approvalStatus = "审批驳回"
        } else if (3 == this.state.approvalStatus) {
            approvalStatus = "审批中"
        }


        let status = "运行中";
        if (1 == this.state.status) {
            status = "已结束"
        } else if (2 == this.state.status) {
            approvalStatus = this.state.reason
            status = "异常截断"
        }

        let color = "green";
        if (1 == this.state.status) {
            color = ""
        } else if (2 == this.state.status) {
            color = "red"
        }

        return (<div style={{ marginTop: marginTop }}>
            <Watermark content={[status, approvalStatus]} gap={[150, 250]} font={{ color: color }}>
                <Timeline
                    mode={'left'}
                    items={this.state.items}
                />
            </Watermark>
        </div>);
    }
}

