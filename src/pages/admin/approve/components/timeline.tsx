import React, { ReactNode } from 'react';
import { RendererProps, Renderer } from 'amis';
import { Timeline, Descriptions, message } from 'antd';
import type { DescriptionsProps, TimelineItemProps } from 'antd';
import { request } from '@/utils/requestInterceptor';

class TimelineStateType {
    items: TimelineItemProps[]
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
                var elements: TimelineItemProps[] = [];
                for (const item of items) {
                    console.log("item:", item)
                    let temp: TimelineItemProps = {
                        key: item.nodeId,
                        children: [<Descriptions title={item.time + "-" + item.customNodeName} key={item.time + "-" + item.customNodeName}>
                            <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
                            <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
                            <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
                            <Descriptions.Item label="Remark">empty</Descriptions.Item>
                            <Descriptions.Item label="Address">
                                No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
                            </Descriptions.Item>
                        </Descriptions>]
                    }
                    elements.push(temp)
                }
                this.setState({ items: elements })
            }
        }).catch((error) => {
            console.log("error:", error);
        });
    }


    componentWillUnmount() {

    }


    render() {
        const { marginTop, body, type } = this.props;
        return (<div style={{ marginTop: marginTop }}>
            <Timeline
                pending="Recording..."
                mode={'left'}
                items={this.state.items}
            />
        </div>);
    }
}

